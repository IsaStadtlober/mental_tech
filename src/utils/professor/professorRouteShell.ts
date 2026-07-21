import { PROFESSOR_ROUTES } from '@/router/professor.routes';
import type { HeaderDestination } from '@/types/professor/educatorHeader';

// tipo de propriedades para o shell de rota do professor.
export function getProfessorRoutePath(destination: HeaderDestination) {
    switch (destination) {
        case 'activities':
            return PROFESSOR_ROUTES.ACTIVITIES;
        case 'correctionQueue':
            return PROFESSOR_ROUTES.CORRECTIONS;
        case 'reports':
            return PROFESSOR_ROUTES.REPORTS;
        case 'educatorProfile':
            return PROFESSOR_ROUTES.PROFILE;
        case 'notifications':
            return PROFESSOR_ROUTES.NOTIFICATIONS;
        default:
            return PROFESSOR_ROUTES.DASHBOARD;
    }
}