import { ACTIVITY_MESSAGES } from '@/constants/professor/activities';
import type { Activity, ActivityConfigurationRow, ActivityMetricCardData } from '@/types/professor';

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