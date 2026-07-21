import { STUDENT_PROFILE_MESSAGES } from '@/constants/professor/students';
import type { StudentHistoryStatusConfig, StudentProfile, StudentProfileMetricCardData, StudentProfileStatus } from '@/types/professor';

// Funções auxiliares para gerar dados do cartão de estudante.
export function getStudentTrailPercentage(trailPosition: number): number {
    return Math.min(trailPosition * 10, 100);
}

// Funções auxiliares para gerar dados do cartão de estudante.
export function getStudentMetrics(
    student: StudentProfile,
    messages = STUDENT_PROFILE_MESSAGES,
): StudentProfileMetricCardData[] {
    return [
        {
            label: messages.metrics.completed,
            value: student.completedActivities,
            helper: messages.metrics.completedHelper,
            tone: 'success',
        },
        {
            label: messages.metrics.pending,
            value: student.pendingActivities,
            helper: messages.metrics.pendingHelper,
            tone: 'warning',
        },
        {
            label: messages.metrics.revision,
            value: student.revisionActivities,
            helper: messages.metrics.revisionHelper,
            tone: 'info',
        },
        {
            label: messages.metrics.participation,
            value: student.participation,
            helper: messages.metrics.participationHelper,
            tone: student.status === 'inactive' ? 'danger' : 'primary',
        },
    ];
}

export function getStudentHistoryStatusConfig(
    messages = STUDENT_PROFILE_MESSAGES,
): Record<'approved' | 'pending' | 'revision', StudentHistoryStatusConfig> {
    return {
        approved: { label: messages.historyStatus.approved, tone: 'success' },
        pending: { label: messages.historyStatus.pending, tone: 'warning' },
        revision: { label: messages.historyStatus.revision, tone: 'info' },
    };
}

export function getStudentPedagogyMessage(
    studentStatus: StudentProfileStatus,
    messages = STUDENT_PROFILE_MESSAGES,
): string {
    return studentStatus === 'inactive'
        ? messages.pedagogy.inactive
        : messages.pedagogy.active;
}

export function getStudentHeroMeta(
    student: StudentProfile,
    messages = STUDENT_PROFILE_MESSAGES,
): string {
    return `${messages.hero.lastActivityPrefix} ${student.lastActivityAt}`;
}