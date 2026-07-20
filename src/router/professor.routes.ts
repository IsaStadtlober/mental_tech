export const PROFESSOR_ROUTES = {
    DASHBOARD: '/(professor)/dashboard',
    ACTIVITIES: '/(professor)/atividades',
    CREATE_ACTIVITY: '/(professor)/atividades/nova',
    CORRECTIONS: '/(professor)/correcoes',
    REPORTS: '/(professor)/relatorios',
    NOTIFICATIONS: '/(professor)/notificacoes',
    PROFILE: '/(professor)/perfil',
    STUDENT_PROFILE: (studentId: string) => ({
        pathname: '/(professor)/alunos/[studentId]',
        params: { studentId },
    }),
    ACTIVITY_DETAIL: (activityId: string) => ({
        pathname: '/(professor)/atividades/[activityId]',
        params: { activityId },
    }),
} as const;