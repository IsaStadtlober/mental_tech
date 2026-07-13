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

export type WizardStepType = 1 | 2 | 3 | 4;