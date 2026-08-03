import type { HistoryFilter, RecentActivity } from '../../types/aluno';
import type { StudentMission } from '../../types/aluno/mission';

export const buildHistoryEntries = (
    mission: StudentMission,
    recentActivities: RecentActivity[]
): RecentActivity[] => [
        {
            id: 'current',
            title: mission.title,
            status: mission.status,
            dateLabel: 'Hoje',
        },
        ...recentActivities,
    ];

export const filterActivitiesByStatus = (
    activities: RecentActivity[],
    filter: HistoryFilter
): RecentActivity[] =>
    filter === 'all'
        ? activities
        : activities.filter((activity) => activity.status === filter);

export const getActivityStatusLabel = (
    status: RecentActivity['status'],
    grade?: number
): string => {
    switch (status) {
        case 'approved':
            return `Aprovada${grade ? ` · Nota ${grade}` : ''}`;
        case 'revision':
            return 'Revisão solicitada';
        case 'awaitingReview':
            return 'Aguardando correção';
        default:
            return 'Em andamento';
    }
};