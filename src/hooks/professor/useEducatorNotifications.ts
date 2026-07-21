import { useMemo, useState } from 'react';

import { PROFESSOR_NOTIFICATIONS_MESSAGES } from '@/constants/professor/professor';
import type { EducatorNotification, EducatorNotificationsHandlers, NotificationCategory } from '@/types/professor';
import type { NotificationFilter } from '@/types/professor/notifications';
import {
    filterNotifications,
    getNotificationActionLabel,
    getNotificationCategoryIcon,
} from '@/utils/professor/notifications';

export function useEducatorNotifications(notifications: EducatorNotification[]) {
    const [filter, setFilter] = useState<NotificationFilter>('all');

    const unreadCount = notifications.filter((item) => !item.read).length;
    const readCount = notifications.filter((item) => item.read).length;

    const filteredNotifications = useMemo(() => {
        return filterNotifications(notifications, filter);
    }, [filter, notifications]);

    function getActionLabel(notification: EducatorNotification) {
        return getNotificationActionLabel(notification, PROFESSOR_NOTIFICATIONS_MESSAGES);
    }

    function getCategoryIcon(category: NotificationCategory, foregroundColor?: string) {
        return getNotificationCategoryIcon(category, foregroundColor);
    }

    function openNotification(
        notification: EducatorNotification,
        handlers: EducatorNotificationsHandlers,
    ) {
        if (!notification.read) {
            handlers.onMarkAsRead(notification.id);
        }

        const destination = notification.destination;
        switch (destination.type) {
            case 'correctionQueue':
                handlers.onOpenCorrectionQueue();
                return;
            case 'studentProfile':
                handlers.onOpenStudent(destination.studentId);
                return;
            case 'activityDetail':
                handlers.onOpenActivity(destination.activityId);
                return;
            case 'reports':
                handlers.onOpenReports();
                return;
            default:
                return;
        }
    }

    return {
        filter,
        setFilter,
        unreadCount,
        readCount,
        filteredNotifications,
        getActionLabel,
        getCategoryIcon,
        openNotification,
    };
}