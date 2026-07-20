import { BookOpen, CheckSquare2, GraduationCap, Settings2 } from 'lucide-react-native';
import { createElement, type ReactNode } from 'react';

import type { NotificationFilter } from '@/constants/professor/notifications';
import type { EducatorNotification, NotificationCategory } from '@/types/professor';

type NotificationMessages = typeof import('@/constants/professor/professor').PROFESSOR_NOTIFICATIONS_MESSAGES;

export function filterNotifications(
    notifications: EducatorNotification[],
    filter: NotificationFilter,
) {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter((item) => !item.read);
    return notifications.filter((item) => item.category === filter);
}

export function getNotificationActionLabel(
    notification: EducatorNotification,
    messages: NotificationMessages,
) {
    switch (notification.destination.type) {
        case 'correctionQueue':
            return messages.item.actions.correctionQueue;
        case 'studentProfile':
            return messages.item.actions.studentProfile;
        case 'activityDetail':
            return messages.item.actions.activityDetail;
        case 'reports':
            return messages.item.actions.reports;
        default:
            return notification.read
                ? messages.item.actions.read
                : messages.item.actions.markAsRead;
    }
}

export function getNotificationCategoryIcon(
    category: NotificationCategory,
    foregroundColor?: string,
): ReactNode {
    const resolvedColor = foregroundColor ?? 'currentColor';

    switch (category) {
        case 'correction':
            return createElement(CheckSquare2, { size: 20, color: resolvedColor });
        case 'activity':
            return createElement(BookOpen, { size: 20, color: resolvedColor });
        case 'student':
            return createElement(GraduationCap, { size: 20, color: resolvedColor });
        default:
            return createElement(Settings2, { size: 20, color: resolvedColor });
    }
}
