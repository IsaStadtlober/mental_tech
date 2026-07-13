import { useMemo, useState } from 'react';

import type { ClassData, StudentData, WizardFlowState, WizardStepType } from '../types/wizard';

const initialState: WizardFlowState = {
    step: 1,
    classDetails: null,
    teacherEmail: '',
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

    const saveTeacherEmail = (teacherEmail: string) => {
        setState((current) => ({ ...current, teacherEmail, step: 3 }));
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
            teacherEmail: state.teacherEmail,
            students: state.students,
        }),
        [state.classDetails, state.step, state.students, state.teacherEmail],
    );

    return {
        state: summary,
        goToStep,
        saveClassDetails,
        saveTeacherEmail,
        saveStudents,
        goBack,
    };
}
