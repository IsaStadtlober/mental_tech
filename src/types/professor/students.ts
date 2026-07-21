import type { StudentEngagementStatus } from './common';

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