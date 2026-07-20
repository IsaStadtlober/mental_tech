import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

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
  goBack: (step: WizardStepType) => void;
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

  const setStep = useCallback((step: WizardStepType) => {
    setState((current) => ({ ...current, step }));
  }, []);

  const setSchoolData = useCallback((payload: Partial<SchoolOnboardingData>) => {
    setState((current) => ({
      ...current,
      school: {
        ...current.school,
        ...payload,
      },
    }));
  }, []);

  const setClassDetails = useCallback((classDetails: ClassData) => {
    setState((current) => ({ ...current, classDetails, step: 2 }));
  }, []);

  const setTeacherData = useCallback((teacher: TeacherData) => {
    setState((current) => ({ ...current, teacher, step: 3 }));
  }, []);

  const setStudents = useCallback((students: StudentData[]) => {
    setState((current) => ({ ...current, students, step: 4 }));
  }, []);

  const goBack = useCallback((step: WizardStepType) => {
    setStep(step);
  }, [setStep]);

  const resetWizard = useCallback(() => setState(initialState), []);

  const value = useMemo(
    () => ({
      state,
      setStep,
      setSchoolData,
      setClassDetails,
      setTeacherData,
      setStudents,
      goBack,
      resetWizard,
    }),
    [state, setStep, setSchoolData, setClassDetails, setTeacherData, setStudents, goBack, resetWizard],
  );

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