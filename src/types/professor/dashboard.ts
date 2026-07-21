export interface EducatorDashboardScreenProps {
    onOpenActivities: () => void;
    onCreateActivity: () => void;
    onOpenCorrectionQueue: () => void;
    onOpenStudent: (studentId: string) => void;
    onOpenReports: () => void;
    pendingCorrectionsCount: number;
    publishedActivitiesCount: number;
}

export interface DashboardMetricConfig {
    waitingCorrectionLabel: string;
    waitingCorrectionHelper: string;
    publishedActivitiesLabel: string;
    publishedActivitiesHelper: string;
    participationLabel: string;
    participationValue: string;
    participationHelper: string;
}

export interface DashboardMetricInput {
    pendingCorrectionsCount: number;
    publishedActivitiesCount: number;
}