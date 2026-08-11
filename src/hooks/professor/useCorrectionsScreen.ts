import { useMemo, useState } from 'react';

import { CORRECTION_MESSAGES } from '@/constants/professor/corrections';
import type { Submission } from '@/types/professor';
import type { CorrectionFilter, StatusFilter } from '@/types/professor/corrections';
import { getFilteredSubmissions, getPendingSubmissionsLabel } from '@/utils/professor/corrections';

export function useCorrectionsScreen(submissions: Submission[] = []) {
    const [query, setQuery] = useState('');
    const [classFilter, setClassFilter] = useState<CorrectionFilter>('all');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    // Monta a lista de filtros dinamicamente com base nas turmas das submissões
    const classFilters = useMemo(() => {
        const uniqueClasses = Array.from(
            new Set(submissions.map((s) => s.className).filter(Boolean))
        );

        return [
            { label: 'Todas as turmas', value: 'all' as CorrectionFilter },
            ...uniqueClasses.map((className) => ({
                label: className,
                value: className as CorrectionFilter,
            })),
        ];
    }, [submissions]);

    // Filtra as submissões com base em busca, turma selecionada e status.
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
        classFilters, // Retorna os filtros gerados
        filteredSubmissions,
        resultsLabel: getPendingSubmissionsLabel(
            filteredSubmissions.length,
            statusFilter,
        ),
        messages: CORRECTION_MESSAGES,
    };
} 