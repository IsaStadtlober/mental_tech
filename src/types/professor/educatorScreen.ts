import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { HeaderDestination, HeaderNotificationPreview } from './educatorHeader';

export interface EducatorScreenProps {
    children: ReactNode;
    educatorName: string;
    headerSubtitle?: string;
    currentDestination?: HeaderDestination;
    unreadNotificationsCount?: number;
    notificationPreview?: HeaderNotificationPreview[];
    onOpenDashboard: () => void;
    onOpenActivities: () => void;
    onOpenCorrectionQueue: () => void;
    onOpenReports: () => void;
    onOpenProfile: () => void;
    onOpenAllNotifications?: () => void;
    style?: StyleProp<ViewStyle>;
}