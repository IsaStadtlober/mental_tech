// Tipos para autenticação de estudante
export type StudentLoginData = {
    classCode: string;
    pin: string;
};

export type WelcomeDoneSearchParams = {
    explorerName: string;
};

// Tipos para autenticação de educador
export type SchoolSignupSearchParams = {
    schoolName: string;
};

export type WizardSearchParams = {
    schoolName: string;
};

export type EducatorActivationData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type { WizardStepType } from './wizard';

