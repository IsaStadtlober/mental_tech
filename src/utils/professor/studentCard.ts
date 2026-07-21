import { STUDENT_CARD_MESSAGES } from '@/constants/professor/studentCard';
import type { StatusChipTone } from '@/types/professor/statusChip';
import type { StudentCardStatusConfig } from '@/types/professor/studentCard';
import type { Student } from '@/types/professor/students';

export function getStudentCardStatusConfig(student: Student): StudentCardStatusConfig {
    const statusConfig: Record<Student['engagementStatus'], { label: string; tone: StatusChipTone }> = {
        engaged: {
            label: 'Em dia',
            tone: 'success',
        },
        attention: {
            label: 'Precisa de atenção',
            tone: 'warning',
        },
        inactive: {
            label: 'Sem atividade há +7 dias',
            tone: 'danger',
        },
    };

    return statusConfig[student.engagementStatus];
}

export function getStudentCardCorrectionsLabel(pendingCorrections: number) {
    return pendingCorrections === 1
        ? STUDENT_CARD_MESSAGES.correctionsLabelSingular
        : STUDENT_CARD_MESSAGES.correctionsLabelPlural(pendingCorrections);
}