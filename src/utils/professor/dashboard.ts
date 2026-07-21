import type { Activity, DashboardMetricConfig, DashboardMetricInput, Submission } from '@/types/professor';

export function getPendingCorrectionsCount(submissions: Submission[]): number {
    return submissions.filter((item) => item.status === 'pending').length;
}

export function getPublishedActivitiesCount(activities: Activity[]): number {
    return activities.filter((item) => item.status === 'published').length;
}

export function getDashboardMetricConfig({
    pendingCorrectionsCount,
    publishedActivitiesCount,
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
        participationLabel: 'Participação da turma',
        participationValue: '84%',
        participationHelper: 'Aumento de 6% nos últimos 30 dias',
    };
}