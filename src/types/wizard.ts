export type WizardStepType = 1 | 2 | 3 | 4;

export interface ClassData {
    name: string;
    grade: string;
    period: string;
}

export interface StudentData {
    name: string;
    contact: string;
}

export interface WizardFlowState {
    step: WizardStepType;
    classDetails: ClassData | null;
    teacherEmail: string;
    students: StudentData[];
}

export interface WizardScreenProps {
    onBack: () => void;
}
