import type { Activity, Class, DashboardMetricConfig, DashboardMetricInput, Student, Submission } from '@/types/professor';

// Contagem de submissões pendentes.
export function getPendingCorrectionsCount(submissions: Submission[]): number {
    return (submissions || []).filter((item) => item.status === 'pending').length;
}

// Contagem de atividades publicadas.
export function getPublishedActivitiesCount(activities: Activity[]): number {
    return (activities || []).filter((item) => item.status === 'published').length;
}

// Contagem de alunos sem atividade há mais de 7 dias.
export function getInactiveStudentsCount(students: Student[]): number {
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    return (students || []).filter((student) => {
        if (!student.last_activity_at) return true;
        const lastActivity = new Date(student.last_activity_at).getTime();
        return now - lastActivity > SEVEN_DAYS_MS;
    }).length;
}

// Estrutura do resumo por turma
export function getClassSummaries(classes: Class[] = []) {
    return classes.map((cls) => ({
        id: cls.id,
        name: cls.name,
        participation: cls.participation_rate ?? 0,
    }));
}

// Configuração das métricas do dashboard.
export function getDashboardMetricConfig({
    pendingCorrectionsCount,
    publishedActivitiesCount,
    inactiveStudentsCount = 0,
    overallParticipation = 0,
}: DashboardMetricInput): DashboardMetricConfig {
    return {
        waitingCorrectionLabel: 'Aguardando correção',
        waitingCorrectionHelper:
            pendingCorrectionsCount === 0
                ? 'Nenhum envio exige ação agora'
                : 'Priorize os envios mais antigos',
        publishedActivitiesLabel: 'Atividades publicadas',
        publishedActivitiesHelper:
            publishedActivitiesCount === 1
                ? '1 missão disponível para os alunos'
                : `${publishedActivitiesCount} missões disponíveis para os alunos`,
        noActivityLabel: 'Sem atividade há +7 dias',
        noActivityHelper: 'Alunos que podem precisar de apoio',
        participationLabel: 'Participação da turma',
        participationValue: `${overallParticipation}%`,
        participationHelper: 'Média geral de engajamento',
    };
}