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