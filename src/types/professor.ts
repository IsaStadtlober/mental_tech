export type EducatorScreen =
  | 'dashboard'
  | 'activities'
  | 'activityForm'
  | 'activityDetail'
  | 'correctionQueue'
  | 'correction'
  | 'studentProfile'
  | 'reports'
  | 'activation'
  | 'notifications'
  | 'educatorProfile';


export type StudentEngagementStatus =
  | 'engaged'
  | 'attention'
  | 'inactive';

export type ActivityStatus =
  | 'draft'
  | 'published'
  | 'closed';

export type SubmissionStatus =
  | 'pending'
  | 'approved'
  | 'revision';

export type FileType =
  | 'pdf'
  | 'doc'
  | 'image';

export type RewardType =
  | 'item'
  | 'medal'
  | 'xp';

export interface EducatorMetric {
  id: string;
  label: string;
  value: number | string;
  helper?: string;

  tone?:
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
}

export interface EducatorStudentOption {
  id: string;
  name: string;
  className: string;
}

export interface Student {
  id: string;
  name: string;
  className: string;
  initials?: string;

  engagementStatus: StudentEngagementStatus;

  completedActivities: number;
  pendingActivities: number;
  revisionActivities: number;

  lastActivityAt?: string;
  pendingCorrections?: number;
  trailPosition?: number;
}

export interface ActivityAttachment {
  id: string;
  name: string;
  type: FileType;
  sizeLabel?: string;
  uri?: string;
}

export interface Reward {
  id: string;
  name: string;
  type: RewardType;
}

export interface Activity {
  id: string;
  title: string;
  instruction: string;
  className: string;
  studentNames?: string[];

  status: ActivityStatus;

  dueDate?: string;
  createdAt: string;
  publishedAt?: string;

  attachment: ActivityAttachment;
  reward: Reward;

  submissionsCount: number;
  studentsCount: number;
  correctedCount: number;
}

export interface ActivityMetricCardData {
  label: string;
  value: number | string;
  helper: string;
  tone: 'info' | 'success' | 'warning';
}

export interface ActivityConfigurationRow {
  label: string;
  value: string;
}

export interface ActivityDetailScreenProps {
  activity: Activity;
  onBack: () => void;
  onEdit: () => void;
  onOpenCorrectionQueue: () => void;
}

export type StudentProfileStatus = 'engaged' | 'attention' | 'inactive';

export interface StudentProfile {
  id: string;
  name: string;
  initials: string;
  className: string;
  status: StudentProfileStatus;
  completedActivities: number;
  pendingActivities: number;
  revisionActivities: number;
  participation: string;
  trailPosition: number;
  lastActivityAt: string;
}

export interface StudentHistoryItem {
  id: string;
  title: string;
  status: 'approved' | 'pending' | 'revision';
  dateLabel: string;
  grade?: string;
}

export interface StudentProfileScreenProps {
  studentId: string;
  onBack: () => void;
  onCreateActivity: (studentName: string) => void;
  onOpenCorrectionQueue: () => void;
}

export interface StudentProfileMetricCardData {
  label: string;
  value: number | string;
  helper: string;
  tone: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export interface StudentHistoryStatusConfig {
  label: string;
  tone: 'success' | 'warning' | 'info';
}

export interface Submission {
  id: string;

  studentId: string;
  studentName: string;
  studentInitials?: string;

  activityId: string;
  activityTitle: string;
  className: string;

  status: SubmissionStatus;

  submittedAt: string;
  waitingTimeLabel: string;

  attachment: ActivityAttachment;

  grade?: string;
  comment?: string;
  revisionFeedback?: string;
}

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

export interface EducatorProfileData {
  name: string;
  email: string;
}

export type ReportMode = 'class' | 'individual';
export type ReportPeriod = '7' | '30' | '90';

export interface ReportClassItem {
  label: string;
  value: number;
  color: string;
}

export interface ReportAttentionStudent {
  name: string;
  participation: number;
  tone: 'danger' | 'warning';
}

export interface ReportStudentSummary {
  id: string;
  name: string;
  participation: number;
  completed: number;
  pending: number;
  average: string;
}

export interface ReportSummary {
  participation: string;
  completedActivities: number;
  revisionCount: number;
  publishedActivities: number;
  pendingActivities: number;
  average: string;
  classParticipation: ReportClassItem[];
  attentionStudents: ReportAttentionStudent[];
  students: ReportStudentSummary[];
}

export interface ReportsScreenProps {
  onBack: () => void;
}

export interface EducatorProfileScreenProps {
  name: string;
  email: string;
  onBack: () => void;
  onSave: (data: EducatorProfileData) => void;
}

export interface PreferenceRowProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  largeText: boolean;
}

export interface RecentSubmission {
  id: string;
  initials: string;
  studentName: string;
  activityTitle: string;
  className: string;
  waitingTime: string;
}