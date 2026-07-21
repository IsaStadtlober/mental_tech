import type { StatusChipTone } from '@/components/professor/StatusChip';
import { theme } from '@/constants/theme';
import type { NotificationCategory } from '@/types/professor';

export type NotificationFilter = 'all' | 'unread' | NotificationCategory;

export const NOTIFICATION_FILTERS: { value: NotificationFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'unread', label: 'Não lidas' },
    { value: 'correction', label: 'Correções' },
    { value: 'activity', label: 'Atividades' },
    { value: 'student', label: 'Alunos' },
    { value: 'system', label: 'Sistema' },
];

export const NOTIFICATION_CATEGORY_CONFIG: Record<
    NotificationCategory,
    {
        label: string;
        tone: StatusChipTone;
        backgroundColor: string;
        foregroundColor: string;
    }
> = {
    correction: {
        label: 'Correção',
        tone: 'warning',
        backgroundColor: theme.warningSoft,
        foregroundColor: theme.warning,
    },
    activity: {
        label: 'Atividade',
        tone: 'info',
        backgroundColor: theme.infoSoft,
        foregroundColor: theme.info,
    },
    student: {
        label: 'Aluno',
        tone: 'danger',
        backgroundColor: theme.dangerSoft,
        foregroundColor: theme.danger,
    },
    system: {
        label: 'Sistema',
        tone: 'neutral',
        backgroundColor: theme.bgSoft,
        foregroundColor: theme.primary,
    },
};