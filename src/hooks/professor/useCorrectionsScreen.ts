import { useMemo, useState } from 'react';

import { CORRECTION_MESSAGES } from '@/constants/professor/corrections';
import type { CorrectionFilter } from '@/types/professor/corrections';
import type { Submission } from '@/types/professor';
import { getFilteredPendingSubmissions, getPendingSubmissionsLabel } from '@/utils/corrections';

export function useCorrectionsScreen(submissions: Submission[]) {
    const [query, setQuery] = useState('');
    const [classFilter, setClassFilter] = useState<CorrectionFilter>('all');

    const pendingSubmissions = useMemo(() => {
        return getFilteredPendingSubmissions({ submissions, query, filter: classFilter });
    }, [submissions, query, classFilter]);

    return {
        query,
        setQuery,
        classFilter,
        setClassFilter,
        pendingSubmissions,
        pendingLabel: getPendingSubmissionsLabel(pendingSubmissions.length),
        messages: CORRECTION_MESSAGES,
    };
}