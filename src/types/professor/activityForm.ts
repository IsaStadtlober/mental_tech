import type { Activity, ActivityStatus, EducatorStudentOption, FileType, RewardType } from '@/types/professor';

export interface ActivityFormData {
    title: string;
    instruction: string;
    className: string;
    studentNames: string[];
    dueDate?: string;
    attachmentName: string;
    attachmentType: FileType;
    rewardName: string;
    rewardType: RewardType;
    status: ActivityStatus;
}

export interface ActivityFormScreenProps {
    availableStudents: EducatorStudentOption[];
    activity?: Activity | null;
    initialStudentName?: string | null;
    onBack: () => void;
    onSave: (data: ActivityFormData) => void;
}

export type ActivityFormAudience = '5º Ano A' | '5º Ano B' | 'Alunos específicos';