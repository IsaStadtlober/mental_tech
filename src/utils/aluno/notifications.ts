import { ALUNO_ROUTES } from '../../router/aluno.routes';
import type { StudentNotification, StudentRoute } from '../../types/aluno';

export const resolveNotificationRoute = (
    notification: StudentNotification
): StudentRoute => {
    switch (notification.destination) {
        case 'mission':
            return ALUNO_ROUTES.MISSION;
        case 'reward':
            return ALUNO_ROUTES.REWARD;
        default:
            return ALUNO_ROUTES.HISTORY;
    }
};