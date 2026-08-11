import { CORRECTION_MESSAGES } from "@/constants/professor/corrections";
import type { CorrectionFilter, StatusFilter } from "@/types/professor/corrections";
import type { Submission } from "@/types/professor";

// Filtra as submissões pendentes com base em busca e turma selecionada.
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

    // 1. Filtro por Status
    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;

    // 2. Filtro por Turma
    const matchesClass =
      classFilter === "all" || submission.className === classFilter;

    // 3. Filtro por Busca
    const studentName = (submission.studentName ?? "").toLowerCase();
    const activityTitle = (submission.activityTitle ?? "").toLowerCase();

    const matchesQuery =
      !normalizedQuery ||
      studentName.includes(normalizedQuery) ||
      activityTitle.includes(normalizedQuery);

    return matchesStatus && matchesClass && matchesQuery;
  });
}

// Contagem de submissões pendentes.
export function getPendingSubmissionsLabel(
  count: number,
  statusFilter: StatusFilter = 'pending',
): string {
  if (statusFilter === 'pending') {
    return count === 1
      ? CORRECTION_MESSAGES.count.one
      : CORRECTION_MESSAGES.count.many;
  }

  return count === 1
    ? 'resultado encontrado'
    : 'resultados encontrados';
}

// Contagem de submissões corrigidas.
export function getAttachmentTypeLabel(
  type: Submission["attachment"]["type"],
): string {
  return type === "image" ? "Imagem" : type === "doc" ? "Word" : "PDF";
}
