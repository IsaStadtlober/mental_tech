import { useMemo, useState } from "react";

import type {
    ClassData,
    StudentData,
    WizardFlowState,
    WizardStepType,
} from "../types/wizard";

const initialState: WizardFlowState = {
  step: 1,
  classDetails: null,
  teacher: null,
  students: [],
};

export function useWizardFlow() {
  const [state, setState] = useState<WizardFlowState>(initialState);

  const goToStep = (step: WizardStepType) => {
    setState((current) => ({ ...current, step }));
  };

  const saveClassDetails = (classDetails: ClassData) => {
    setState((current) => ({ ...current, classDetails, step: 2 }));
  };

  const saveTeacherData = (teacher: TeacherData) => {
    setState((current) => ({ ...current, teacher, step: 3 }));
  };

  const saveStudents = (students: StudentData[]) => {
    setState((current) => ({ ...current, students, step: 4 }));
  };

  const goBack = (step: WizardStepType) => {
    setState((current) => ({ ...current, step }));
  };

  const summary = useMemo(
    () => ({
      step: state.step,
      classDetails: state.classDetails,
      teacher: state.teacher,
      students: state.students,
    }),
    [state.classDetails, state.step, state.students, state.teacher],
  );

  return {
    state: summary,
    goToStep,
    saveClassDetails,
    saveTeacherData,
    saveStudents,
    goBack,
  };
}
