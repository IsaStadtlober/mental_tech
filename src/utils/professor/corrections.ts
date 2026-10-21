import { CORRECTION_MESSAGES } from "@/constants/professor/corrections";
import { supabase } from "@/service/supabase";
import type { Submission } from "@/types/professor";
import type {
  CorrectionFilter,
  CorrectionResult,
  StatusFilter,
} from "@/types/professor/corrections";
import { calculateEarnedCoins } from "./activities";

// 1. Filtra as submissões com base em busca, turma e status.
export function getFilteredSubmissions({
  submissions = [],
  query = "",
  classFilter = "all",
  statusFilter = "all",
}: {
  submissions?: Submission[];
  query?: string;
  classFilter?: CorrectionFilter;
  statusFilter?: StatusFilter;
}): Submission[] {
  if (!Array.isArray(submissions)) return [];

  const normalizedQuery = (query ?? "").trim().toLowerCase();

  return submissions.filter((submission) => {
    if (!submission) return false;

    // Filtro por Status
    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;

    // Filtro por Turma
    const matchesClass =
      classFilter === "all" || submission.className === classFilter;

    // Filtro por Busca
    const studentName = (submission.studentName ?? "").toLowerCase();
    const activityTitle = (submission.activityTitle ?? "").toLowerCase();

    const matchesQuery =
      !normalizedQuery ||
      studentName.includes(normalizedQuery) ||
      activityTitle.includes(normalizedQuery);

    return matchesStatus && matchesClass && matchesQuery;
  });
}

// 2. Rótulo legível da contagem
export function getPendingSubmissionsLabel(
  count: number,
  statusFilter: StatusFilter = "pending",
): string {
  if (statusFilter === "pending") {
    return count === 1
      ? CORRECTION_MESSAGES.count.one
      : CORRECTION_MESSAGES.count.many;
  }

  return count === 1 ? "resultado encontrado" : "resultados encontrados";
}

// 3. Rótulo de tipo de anexo
export function getAttachmentTypeLabel(
  type: Submission["attachment"]["type"],
): string {
  return type === "image" ? "Imagem" : type === "doc" ? "Word" : "PDF";
}

// 4. 🚀 FUNÇÃO PRINCIPAL: Processa a decisão do professor no banco de dados
export async function processSubmissionCorrection({
  submissionId,
  studentId,
  result,
  activity,
}: {
  submissionId: string;
  studentId: string;
  result: CorrectionResult;
  activity: {
    reward_mode?: string;
    reward_base_coins?: number;
    reward_bonus_coins?: number;
  };
}) {
  const isApproved = result.decision === "approved";
  const newStatus = isApproved ? "corrected" : "revision";
  const feedback = isApproved ? result.comment : result.revisionFeedback;
  const numericGrade = result.grade ?? 0;

  // A. Atualiza a submissão no Supabase com trava de segurança (.select().single())
  const { data: updatedSub, error: subError } = await supabase
    .from("submissions")
    .update({
      status: newStatus,
      grade: isApproved ? numericGrade : null,
      teacher_feedback: feedback || null,
      corrected_at: new Date().toISOString(),
    })
    .eq("id", submissionId)
    .select()
    .single();

  if (subError || !updatedSub) {
    console.error("Erro ao atualizar submissão:", subError);
    throw new Error(
      "Não foi possível salvar a correção. Verifique as permissões (RLS) no Supabase."
    );
  }

  // B. Se a decisão for 'approved', calcula e credita as moedas do aluno
  if (isApproved) {
    const totalEarnedCoins = calculateEarnedCoins({
      rewardMode: activity.reward_mode || "performance",
      baseCoins: activity.reward_base_coins ?? 10,
      bonusCoins: activity.reward_bonus_coins ?? 40,
      grade: numericGrade,
    });

    const { data: studentData } = await supabase
      .from("students")
      .select("coins")
      .eq("id", studentId)
      .single();

    const currentCoins = studentData?.coins ?? 0;

    const { error: coinsError } = await supabase
      .from("students")
      .update({ coins: currentCoins + totalEarnedCoins })
      .eq("id", studentId);

    if (coinsError) {
      console.error("Erro ao creditar moedas:", coinsError);
      throw new Error("Correção salva, mas ocorreu uma falha ao creditar as moedas.");
    }
  }

  return { success: true };
}