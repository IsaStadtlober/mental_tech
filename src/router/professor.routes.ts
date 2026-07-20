export const PROFESSOR_ROUTES = {
    DASHBOARD: '/(professor)/dashboard',
    ACTIVITIES: '/(professor)/atividades',
    CREATE_ACTIVITY: '/(professor)/atividades/nova',
    CORRECTIONS: '/(professor)/correcoes',
    REPORTS: '/(professor)/relatorios',
    STUDENT_PROFILE: (studentId: string) => ({
        pathname: '/(professor)/alunos/[studentId]',
        params: { studentId },
    }),
} as const;