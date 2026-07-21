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