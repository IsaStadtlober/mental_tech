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
  | {
      type: 'correctionQueue';
    }
  | {
      type: 'studentProfile';
      studentId: string;
    }
  | {
      type: 'activityDetail';
      activityId: string;
}
  | {
      type: 'reports';
    }
  | {
      type: 'none';
    };

export interface EducatorNotification {
  id: string;

  title: string;
  description: string;
  createdAtLabel: string;

  category: NotificationCategory;

  read: boolean;

  destination: NotificationDestination;
}