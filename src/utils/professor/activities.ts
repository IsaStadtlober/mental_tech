import { ACTIVITY_MESSAGES } from '@/constants/professor/activities';
import type { Activity, ActivityConfigurationRow, ActivityFilter, ActivityMetricCardData } from '@/types/professor';

// Cálculos derivativos de métricas a partir da atividade.
export function getPendingCorrectionsCount(activity: Activity): number {
    return Math.max(activity.submissionsCount - activity.correctedCount, 0);
}

export function getActivityParticipation(activity: Activity): number {
    if (activity.studentsCount <= 0) {
        return 0;
    }

    return Math.round((activity.submissionsCount / activity.studentsCount) * 100);
}

// Métricas da atividade.
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
            tone: 'info',
        },
        {
            label: detailMessages.correctedLabel,
            value: activity.correctedCount,
            helper: detailMessages.deliveryHelper,
            tone: 'success',
        },
        {
            label: detailMessages.pendingLabel,
            value: pendingCorrections,
            helper: detailMessages.pendingHelper,
            tone: 'warning',
        },
    ];
}

// Linhas de configuração da atividade.
export function getActivityConfigurationRows(activity: Activity): ActivityConfigurationRow[] {
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
            ? [{
                label: detailMessages.publishedAtLabel,
                value: activity.publishedAt,
            }]
            : []),
    ];
}

// Metadados do cabeçalho da atividade.
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

// Filtros da lista de atividades.
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
        const matchesFilter = filter === 'all' || activity.status === filter;
        const matchesQuery =
            !normalizedQuery ||
            activity.title.toLowerCase().includes(normalizedQuery) ||
            activity.className.toLowerCase().includes(normalizedQuery);

        return matchesFilter && matchesQuery;
    });
}

// Contagem de atividades.
export function getActivityCountLabel(count: number): string {
    return count === 1 ? ACTIVITY_MESSAGES.count.one : ACTIVITY_MESSAGES.count.many;
}

// Configuração do estado de vazio da lista de atividades.
export function getActivityEmptyStateConfig(query: string, filter: ActivityFilter) {
    const hasQuery = Boolean(query.trim());
    const isDefaultFilter = filter === 'all';

    return {
        title: ACTIVITY_MESSAGES.emptyState.title,
        description: hasQuery || !isDefaultFilter
            ? ACTIVITY_MESSAGES.emptyState.description
            : ACTIVITY_MESSAGES.emptyState.descriptionFallback,
        actionLabel: !hasQuery && isDefaultFilter ? ACTIVITY_MESSAGES.emptyState.actionLabel : undefined,
    };
}