import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import type {
  ClassData,
  SchoolOnboardingData,
  StudentData,
  TeacherData,
  WizardFlowState,
  WizardStepType,
} from "../types/wizard";

interface WizardFlowContextValue {
  state: WizardFlowState;
  setStep: (step: WizardStepType) => void;
  setSchoolData: (payload: Partial<SchoolOnboardingData>) => void;
  setClassDetails: (classDetails: ClassData) => void;
  setTeacherData: (teacher: TeacherData) => void;
  setStudents: (students: StudentData[]) => void;
  resetWizard: () => void;
}

const WizardFlowContext = createContext<WizardFlowContextValue | undefined>(undefined);

const initialSchoolData: SchoolOnboardingData = {
  email: "",
  password: "",
  legal_name: "",
  trade_name: "",
  cnpj: "",
  inep_code: "",
  phone: "",
  zip_code: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
};

const initialState: WizardFlowState = {
  step: 1,
  school: initialSchoolData,
  classDetails: null,
  teacher: null,
  students: [],
};

export function WizardFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardFlowState>(initialState);

  const setStep = (step: WizardStepType) => {
    setState((current) => ({ ...current, step }));
  };

  const setSchoolData = (payload: Partial<SchoolOnboardingData>) => {
    setState((current) => ({
      ...current,
      school: {
        ...current.school,
        ...payload,
      },
    }));
  };

  const setClassDetails = (classDetails: ClassData) => {
    setState((current) => ({ ...current, classDetails, step: 2 }));
  };

  const setTeacherData = (teacher: TeacherData) => {
    setState((current) => ({ ...current, teacher, step: 3 }));
  };

  const setStudents = (students: StudentData[]) => {
    setState((current) => ({ ...current, students, step: 4 }));
  };

  const resetWizard = () => setState(initialState);

  const value = useMemo(
    () => ({
      state,
      setStep,
      setSchoolData,
      setClassDetails,
      setTeacherData,
      setStudents,
      resetWizard,
    }),
    [state],
  );

// Correto: Usando a anotação de ponto para acessar o Provider do seu Contexto
return (
  <WizardFlowContext.Provider value={value}>
    {children}
  </WizardFlowContext.Provider>
);
}

export function useWizardFlow() {
  const context = useContext(WizardFlowContext);

  if (!context) {
    throw new Error("useWizardFlow must be used within a WizardFlowProvider.");
  }

  return context;
}
