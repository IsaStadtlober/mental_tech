import type { ActivityStatus, FileType, RewardType } from './common';

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