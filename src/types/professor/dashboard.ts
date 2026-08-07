export interface EducatorDashboardScreenProps {
  onOpenActivities: () => void;
  onCreateActivity: () => void;
  onOpenCorrectionQueue: () => void;
  onOpenStudent: (studentId: string) => void;
  onOpenReports: () => void;
  pendingCorrectionsCount: number;
  publishedActivitiesCount: number;
  students: any[];
  submissions: any[];
  inactiveStudentsCount: number;
  overallParticipation: number;
  classSummaries: ClassSummaryItem[];
  metrics: DashboardMetricConfig;
  messages: any;
}

export interface DashboardMetricConfig {
  waitingCorrectionLabel: string;
  waitingCorrectionHelper: string;
  publishedActivitiesLabel: string;
  publishedActivitiesHelper: string;
  participationLabel: string;
  participationValue: string;
  participationHelper: string;
  noActivityLabel: string;
  noActivityHelper: string;
}

export interface DashboardMetricInput {
  pendingCorrectionsCount: number;
  publishedActivitiesCount: number;
  inactiveStudentsCount?: number;
  overallParticipation?: number;
}
export interface ClassSummaryItem {
  id: string;
  name: string;
  participation: number;
}
