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
        pathname: '/(professor)/[activityId]',
        params: { activityId },
    }),
    SUBMISSION_DETAIL: (submissionId: string) => ({
        pathname: '/(professor)/correcoes/[submissionId]',
        params: { submissionId },
    }),
    EDIT_ACTIVITY: (activityId: string) => ({
        pathname: '/(professor)/[activityId]/editar',
        params: { activityId },
    }),
} as const;