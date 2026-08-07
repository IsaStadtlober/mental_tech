import { useMemo } from 'react';

import { PROFESSOR_DASHBOARD_MESSAGES } from '@/constants/professor/professor';
import type { Activity, Class, Student, Submission } from '@/types/professor';
import {
    getClassSummaries,
    getDashboardMetricConfig,
    getInactiveStudentsCount,
    getPendingCorrectionsCount,
    getPublishedActivitiesCount,
} from '@/utils/professor/dashboard';

export function useEducatorDashboard(
    activities: Activity[] = [],
    submissions: Submission[] = [],
    students: Student[] = [],
    classes: Class[] = []
) {
    const pendingCorrectionsCount = useMemo(
        () => getPendingCorrectionsCount(submissions),
        [submissions],
    );

    const publishedActivitiesCount = useMemo(
        () => getPublishedActivitiesCount(activities),
        [activities],
    );

    const inactiveStudentsCount = useMemo(
        () => getInactiveStudentsCount(students),
        [students],
    );

    const classSummaries = useMemo(
        () => getClassSummaries(classes),
        [classes],
    );

    const overallParticipation = useMemo(() => {
        if (!classSummaries.length) return 0;
        const total = classSummaries.reduce((acc, curr) => acc + curr.participation, 0);
        return Math.round(total / classSummaries.length);
    }, [classSummaries]);

    const metrics = useMemo(
        () =>
            getDashboardMetricConfig({
                pendingCorrectionsCount,
                publishedActivitiesCount,
                inactiveStudentsCount,
                overallParticipation,
            }),
        [
            pendingCorrectionsCount,
            publishedActivitiesCount,
            inactiveStudentsCount,
            overallParticipation,
        ],
    );

    const messages = PROFESSOR_DASHBOARD_MESSAGES;

    return {
        pendingCorrectionsCount,
        publishedActivitiesCount,
        inactiveStudentsCount,
        overallParticipation,
        classSummaries,
        metrics,
        messages,
    };
}