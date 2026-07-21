import { useMemo } from 'react';
import { STUDENT_PROFILE_MESSAGES } from '@/constants/professor/students';
import type { StudentProfile, StudentProfileStatus } from '@/types/professor';
import {
    getStudentHeroMeta,
    getStudentHistoryStatusConfig,
    getStudentMetrics,
    getStudentPedagogyMessage,
    getStudentTrailPercentage,
} from '@/utils/professor/students';

// Funções auxiliares para gerar dados do cartão de estudante.
export function useStudentProfile(student: StudentProfile) {
    const metrics = useMemo(() => getStudentMetrics(student), [student]);
    const historyStatusConfig = useMemo(() => getStudentHistoryStatusConfig(), []);
    const pedagogyMessage = useMemo(() => getStudentPedagogyMessage(student.status), [student.status]);
    const heroMeta = useMemo(() => getStudentHeroMeta(student), [student]);
    const trailPercentage = useMemo(() => getStudentTrailPercentage(student.trailPosition), [student.trailPosition]);

    return {
        metrics,
        historyStatusConfig,
        pedagogyMessage,
        heroMeta,
        trailPercentage,
        messages: STUDENT_PROFILE_MESSAGES,
    };
}

// Funções auxiliares para gerar dados do relatório.
export function getStudentProfileStatusTone(status: StudentProfileStatus): 'success' | 'warning' | 'danger' {
    switch (status) {
        case 'engaged':
            return 'success';
        case 'attention':
            return 'warning';
        default:
            return 'danger';
    }
}