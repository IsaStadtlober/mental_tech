import type { ReactNode } from 'react';

export type HeaderDestination =
    | 'dashboard'
    | 'activities'
    | 'correctionQueue'
    | 'reports'
    | 'educatorProfile'
    | 'notifications';

export interface HeaderNotificationPreview {
    id: string;
    title: string;
    description: string;
    read?: boolean;
}

export interface EducatorHeaderProps {
    educatorName: string;
    subtitle?: string;
    currentDestination?: HeaderDestination;
    unreadNotificationsCount?: number;
    notificationPreview?: HeaderNotificationPreview[];
    onOpenDashboard: () => void;
    onOpenActivities: () => void;
    onOpenCorrectionQueue: () => void;
    onOpenReports: () => void;
    onOpenProfile: () => void;
    onOpenAllNotifications?: () => void;
}

export interface HeaderMenuItem {
    id: Exclude<HeaderDestination, 'notifications'>;
    label: string;
    icon: ReactNode;
    onPress: () => void;
}