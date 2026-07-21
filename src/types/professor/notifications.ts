export type NotificationCategory =
    | 'correction'
    | 'activity'
    | 'student'
    | 'system';

export type NotificationDestination =
    | { type: 'correctionQueue' }
    | { type: 'studentProfile'; studentId: string }
    | { type: 'activityDetail'; activityId: string }
    | { type: 'reports' }
    | { type: 'none' };

export interface EducatorNotification {
    id: string;
    title: string;
    description: string;
    createdAtLabel: string;
    category: NotificationCategory;
    read: boolean;
    destination: NotificationDestination;
}

export interface EducatorNotificationsHandlers {
    onMarkAsRead: (notificationId: string) => void;
    onOpenCorrectionQueue: () => void;
    onOpenStudent: (studentId: string) => void;
    onOpenActivity: (activityId: string) => void;
    onOpenReports: () => void;
}