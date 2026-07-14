export type WizardStepType = 1 | 2 | 3 | 4;

export interface ClassData {
  name: string;
  grade: string;
  period: string;
}

export interface TeacherData {
  name: string;
  email: string;
  position: string;
  registrationNumber: string;
}

export interface StudentData {
  name: string;
  contact: string;
  enrollmentNumber: string;
}

export interface WizardFlowState {
  step: WizardStepType;
  classDetails: ClassData | null;
  teacher: TeacherData | null;
  students: StudentData[];
}

export interface WizardScreenProps {
  onBack: () => void;
}
