import { useMemo, useState } from 'react';

import { ACTIVITY_MESSAGES, ACTIVITY_STATUS_CONFIG } from '@/constants/professor/activities';
import type { Activity, ActivityFilter } from '@/types/professor';
import {
    getActivityCountLabel,
    getActivityEmptyStateConfig,
    getPendingCorrectionsCount as getActivityPendingCorrectionsCount,
    getFilteredActivities,
} from '@/utils/activities';

export function useActivitiesScreen(activities: Activity[]) {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<ActivityFilter>('all');
    const [activityPendingDeletion, setActivityPendingDeletion] = useState<Activity | null>(null);

    const filteredActivities = useMemo(() => {
        return getFilteredActivities({ activities, query, filter });
    }, [activities, filter, query]);

    function requestActivityDeletion(activity: Activity) {
        setActivityPendingDeletion(activity);
    }

    function cancelActivityDeletion() {
        setActivityPendingDeletion(null);
    }

    function confirmActivityDeletion(onDeleteActivity: (activityId: string) => void) {
        if (!activityPendingDeletion) {
            return;
        }

        const activityId = activityPendingDeletion.id;
        setActivityPendingDeletion(null);
        onDeleteActivity(activityId);
    }

    function getPendingCorrectionsCount(activity: Activity): number {
        return getActivityPendingCorrectionsCount(activity);
    }

    return {
        query,
        setQuery,
        filter,
        setFilter,
        activityPendingDeletion,
        requestActivityDeletion,
        cancelActivityDeletion,
        confirmActivityDeletion,
        filteredActivities,
        countLabel: getActivityCountLabel(filteredActivities.length),
        emptyStateConfig: getActivityEmptyStateConfig(query, filter),
        messages: ACTIVITY_MESSAGES,
        statusConfig: ACTIVITY_STATUS_CONFIG,
        getPendingCorrectionsCount,
    };
}

export type { ActivityFilter };

