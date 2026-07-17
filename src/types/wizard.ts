export type WizardStepType = 1 | 2 | 3 | 4;

export interface SchoolOnboardingData {
  email: string;
  password: string;
  legal_name: string;
  trade_name: string;
  cnpj: string;
  inep_code?: string;
  phone?: string;
  zip_code?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export interface ClassData {
  name: string;
  grade: string;
  period: string;
}

export interface TeacherData {
  email: string;
}

export interface StudentData {
  name: string;
  contact: string;
  enrollmentNumber?: string;
}

export interface WizardFlowState {
  step: WizardStepType;
  school: SchoolOnboardingData;
  classDetails: ClassData | null;
  teacher: TeacherData | null;
  students: StudentData[];
}

export interface WizardScreenProps {
  onBack: () => void;
}
