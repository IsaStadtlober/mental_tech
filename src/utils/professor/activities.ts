import { ACTIVITY_MESSAGES } from "@/constants/professor/activities";
import { supabase } from "@/service/supabase";
import type {
  Activity,
  ActivityConfigurationRow,
  ActivityFilter,
  ActivityMetricCardData,
} from "@/types/professor";

// ==========================================
// 🪙 REGRAS DE RECOMPENSA (MODELO 3: BASE + BÔNUS POR NOTA)
// ==========================================

interface CalculateEarnedCoinsParams {
  rewardMode: string;
  baseCoins: number;
  bonusCoins: number;
  grade?: number | null; // Nota do aluno (0.00 a 10.00)
}

/**
 * Calcula a quantidade de moedas ganhas pelo aluno.
 * Fórmula: Base + Round(Bônus Máximo * (Nota / 10))
 */
export function calculateEarnedCoins({
  rewardMode,
  baseCoins,
  bonusCoins,
  grade,
}: CalculateEarnedCoinsParams): number {
  if (rewardMode !== "performance" || grade === undefined || grade === null) {
    return baseCoins;
  }

  const normalizedGrade = Math.min(Math.max(Number(grade), 0), 10);
  const earnedBonus = Math.round(bonusCoins * (normalizedGrade / 10));

  return baseCoins + earnedBonus;
}

/**
 * Registra a correção do professor, grava nota/feedback e credita moedas ao aluno
 */
export async function submitTeacherCorrection({
  submissionId,
  studentId,
  grade,
  feedback,
  activity,
}: {
  submissionId: string;
  studentId: string;
  grade: number;
  feedback?: string;
  activity: {
    reward_mode: string;
    reward_base_coins: number;
    reward_bonus_coins: number;
  };
}) {
  // 1. Calcula o total de moedas com base na nota
  const totalEarnedCoins = calculateEarnedCoins({
    rewardMode: activity.reward_mode,
    baseCoins: activity.reward_base_coins,
    bonusCoins: activity.reward_bonus_coins,
    grade,
  });

  // 2. Atualiza a submissão no banco
  const { error: subError } = await supabase
    .from("submissions")
    .update({
      status: "corrected",
      grade,
      teacher_feedback: feedback || null,
      corrected_at: new Date().toISOString(),
    })
    .eq("id", submissionId);

  if (subError) throw new Error("Erro ao salvar a correção do professor.");

  // 3. Busca o saldo atual do aluno e soma o valor calculado
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

  if (coinsError) throw new Error("Erro ao creditar as moedas do aluno.");

  return { totalEarnedCoins };
}

// ==========================================
// CÁLCULOS E HELPER FUNCTIONS EXISTENTES
// ==========================================

export function getPendingCorrectionsCount(activity: Activity): number {
  return Math.max(activity.submissionsCount - activity.correctedCount, 0);
}

export function getActivityParticipation(activity: Activity): number {
  if (activity.studentsCount <= 0) {
    return 0;
  }

  return Math.round((activity.submissionsCount / activity.studentsCount) * 100);
}

export function getActivityMetrics(
  activity: Activity,
  pendingCorrections: number,
  participation: number,
): ActivityMetricCardData[] {
  const detailMessages = ACTIVITY_MESSAGES.detail;

  return [
    {
      label: detailMessages.deliveryLabel,
      value: `${activity.submissionsCount}/${activity.studentsCount}`,
      helper: `${participation}${detailMessages.participationHelper}`,
      tone: "info",
    },
    {
      label: detailMessages.correctedLabel,
      value: activity.correctedCount,
      helper: detailMessages.deliveryHelper,
      tone: "success",
    },
    {
      label: detailMessages.pendingLabel,
      value: pendingCorrections,
      helper: detailMessages.pendingHelper,
      tone: "warning",
    },
  ];
}

export function getActivityConfigurationRows(
  activity: Activity,
): ActivityConfigurationRow[] {
  const detailMessages = ACTIVITY_MESSAGES.detail;

  return [
    {
      label: detailMessages.recipientsLabel,
      value: activity.className,
    },
    {
      label: detailMessages.rewardLabel,
      value: activity.reward.name,
    },
    {
      label: detailMessages.createdAtLabel,
      value: activity.createdAt,
    },
    ...(activity.publishedAt
      ? [
          {
            label: detailMessages.publishedAtLabel,
            value: activity.publishedAt,
          },
        ]
      : []),
  ];
}

export function getActivityHeaderMeta(activity: Activity): string {
  return activity.dueDate
    ? `${ACTIVITY_MESSAGES.detail.deadlinePrefix} ${activity.dueDate}`
    : ACTIVITY_MESSAGES.detail.noDeadline;
}

export function getAttachmentTypeLabel(activity: Activity): string {
  return activity.attachment.type.toUpperCase();
}

export function getDownloadMessage(activity: Activity): string {
  return `Download simulado: ${activity.attachment.name}`;
}

export function getFilteredActivities({
  activities,
  query,
  filter,
}: {
  activities: Activity[];
  query: string;
  filter: ActivityFilter;
}): Activity[] {
  const normalizedQuery = query.trim().toLowerCase();

  return activities.filter((activity) => {
    const matchesFilter = filter === "all" || activity.status === filter;
    const matchesQuery =
      !normalizedQuery ||
      activity.title.toLowerCase().includes(normalizedQuery) ||
      activity.className.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesQuery;
  });
}

export function getActivityCountLabel(count: number): string {
  return count === 1
    ? ACTIVITY_MESSAGES.count.one
    : ACTIVITY_MESSAGES.count.many;
}

export function getActivityEmptyStateConfig(
  query: string,
  filter: ActivityFilter,
) {
  const hasQuery = Boolean(query.trim());
  const isDefaultFilter = filter === "all";

  return {
    title: ACTIVITY_MESSAGES.emptyState.title,
    description:
      hasQuery || !isDefaultFilter
        ? ACTIVITY_MESSAGES.emptyState.description
        : ACTIVITY_MESSAGES.emptyState.descriptionFallback,
    actionLabel:
      !hasQuery && isDefaultFilter
        ? ACTIVITY_MESSAGES.emptyState.actionLabel
        : undefined,
  };
}