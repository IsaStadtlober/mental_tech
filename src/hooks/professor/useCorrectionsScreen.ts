import { useMemo, useState } from "react";

import { CORRECTION_MESSAGES } from "@/constants/professor/corrections";
import type { Submission } from "@/types/professor";
import type {
  CorrectionFilter,
  StatusFilter,
} from "@/types/professor/corrections";
import {
  getFilteredSubmissions,
  getPendingSubmissionsLabel,
} from "@/utils/professor/corrections";

export function useCorrectionsScreen(submissions: Submission[] = []) {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState<CorrectionFilter>("all");
  
  // 💡 Por padrão, inicia mostrando as submissões 'pending' na fila de correção
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending");

  // Lista de filtros de turma
  const classFilters = useMemo(() => {
    const uniqueClasses = Array.from(
      new Set(submissions.map((s) => s.className).filter(Boolean)),
    );

    return [
      { label: "Todas as turmas", value: "all" as CorrectionFilter },
      ...uniqueClasses.map((className) => ({
        label: className,
        value: className as CorrectionFilter,
      })),
    ];
  }, [submissions]);

  // Lista filtrada em tempo real
  const filteredSubmissions = useMemo(() => {
    return getFilteredSubmissions({
      submissions,
      query,
      classFilter,
      statusFilter,
    });
  }, [submissions, query, classFilter, statusFilter]);

  return {
    query,
    setQuery,
    classFilter,
    setClassFilter,
    statusFilter,
    setStatusFilter,
    classFilters,
    filteredSubmissions,
    resultsLabel: getPendingSubmissionsLabel(
      filteredSubmissions.length,
      statusFilter,
    ),
    messages: CORRECTION_MESSAGES,
  };
}