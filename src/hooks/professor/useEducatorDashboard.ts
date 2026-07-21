import { useMemo } from 'react';

import { PROFESSOR_DASHBOARD_MESSAGES } from '@/constants/professor/professor';
import type { Activity, Submission } from '@/types/professor';
import {
    getDashboardMetricConfig,
    getPendingCorrectionsCount,
    getPublishedActivitiesCount,
} from '@/utils/professor/dashboard';

export function useEducatorDashboard(activities: Activity[], submissions: Submission[]) {
    const pendingCorrectionsCount = useMemo(
        () => getPendingCorrectionsCount(submissions),
        [submissions],
    );

    const publishedActivitiesCount = useMemo(
        () => getPublishedActivitiesCount(activities),
        [activities],
    );

    const metrics = useMemo(() => getDashboardMetricConfig({
        pendingCorrectionsCount,
        publishedActivitiesCount,
    }), [pendingCorrectionsCount, publishedActivitiesCount]);

    const messages = PROFESSOR_DASHBOARD_MESSAGES;

    return {
        pendingCorrectionsCount,
        publishedActivitiesCount,
        metrics,
        messages,
    };
}