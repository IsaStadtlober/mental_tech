import { WIZARD_EMAIL_REGEX } from '../constants/auth';
import type { ClassData, StudentData } from '../types/wizard';

export function createEmptyClassData(): ClassData {
    return {
        name: '',
        grade: '',
        period: '',
    };
}

export function createEmptyStudent(): StudentData {
    return {
        name: '',
        contact: '',
    };
}

export function isClassDataValid(classData: ClassData): boolean {
    return (
        classData.name.trim().length > 0 &&
        classData.grade.trim().length > 0 &&
        classData.period.trim().length > 0
    );
}

export function isTeacherEmailValid(email: string): boolean {
    return WIZARD_EMAIL_REGEX.test(email.trim());
}

export function getFilledStudents(students: StudentData[]): StudentData[] {
    return students.filter((student) => student.name.trim().length > 0);
}

export function getStepCaption(step: number, schoolName?: string): string {
    if (step === 1 && schoolName) {
        return `${schoolName} · Passo 1 de 3`;
    }

    return `Passo ${step} de 3`;
}

export function getStudentsCountLabel(count: number): string {
    return count === 1 ? 'aluno cadastrado' : 'alunos cadastrados';
}
