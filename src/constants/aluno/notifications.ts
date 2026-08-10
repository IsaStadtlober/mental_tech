import type { StudentNotification } from '../../types/aluno';

export const NOTIFICATION_SCREEN_COPY = {
    title: 'Notificações',
    subtitle: 'Novidades e lembretes da sua jornada.',
} as const;

export const NOTIFICATION_EMPTY_STATE = {
    title: 'Tudo tranquilo por aqui',
    description: 'Quando uma novidade chegar, ela aparecerá aqui.',
} as const;

export const NOTIFICATION_CATEGORY_LABELS: Record<
    StudentNotification['category'],
    string
> = {
    mission: 'MISSÃO',
    reward: 'RECOMPENSA',
    revision: 'REVISÃO',
    system: 'SISTEMA',
};