import type { ActivityAttachment } from './activities';
import type { SubmissionStatus } from './common';

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

export interface RecentSubmission {
    id: string;
    initials: string;
    studentName: string;
    activityTitle: string;
    className: string;
    waitingTime: string;
}