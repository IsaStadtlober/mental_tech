import { REPORT_STUDENTS } from '@/constants/professor/professor';
import { theme } from '@/constants/theme';
import type {
    Activity,
    ReportAttentionStudent,
    ReportClassItem,
    ReportPeriod,
    ReportStudentSummary,
    ReportSummary,
    Submission,
} from '@/types/professor';

// Períodos de relatório com dados simulados para o protótipo.
const classParticipationByPeriod: Record<ReportPeriod, ReportClassItem[]> = {
    '7': [
        { label: '5º Ano A', value: 82, color: theme.primary },
        { label: '5º Ano B', value: 70, color: theme.warning },
    ],
    '30': [
        { label: '5º Ano A', value: 88, color: theme.primary },
        { label: '5º Ano B', value: 76, color: theme.warning },
    ],
    '90': [
        { label: '5º Ano A', value: 91, color: theme.primary },
        { label: '5º Ano B', value: 79, color: theme.warning },
    ],
};

const attentionStudentsByPeriod: Record<ReportPeriod, ReportAttentionStudent[]> = {
    '7': [
        { name: 'Maria Souza', participation: 48, tone: 'danger' },
        { name: 'Carlos Lima', participation: 72, tone: 'warning' },
    ],
    '30': [
        { name: 'Maria Souza', participation: 48, tone: 'danger' },
        { name: 'Carlos Lima', participation: 72, tone: 'warning' },
    ],
    '90': [
        { name: 'Maria Souza', participation: 60, tone: 'warning' },
        { name: 'Carlos Lima', participation: 74, tone: 'warning' },
    ],
};

// Funções auxiliares para o protótipo.
export function getReportPeriodLabel(period: ReportPeriod) {
    return `${period} dias`;
}

export function getReportSummary(
    activities: Activity[],
    submissions: Submission[],
    period: ReportPeriod = '30',
): ReportSummary {
    const publishedActivitiesCount = activities.filter((activity) => activity.status === 'published').length;
    const completedActivitiesCount = activities.reduce((total, activity) => total + activity.correctedCount, 0);
    const revisionCount = submissions.filter((submission) => submission.status === 'revision').length;
    const pendingCount = submissions.filter((submission) => submission.status === 'pending').length;

    const participation = `${Math.min(95, 78 + publishedActivitiesCount + Math.round(revisionCount / 2))}%`;
    const average = (7.2 + publishedActivitiesCount * 0.1).toFixed(1).replace('.', ',');

    return {
        participation,
        completedActivities: completedActivitiesCount + 2,
        revisionCount,
        publishedActivities: publishedActivitiesCount,
        pendingActivities: pendingCount + 1,
        average,
        classParticipation: classParticipationByPeriod[period],
        attentionStudents: attentionStudentsByPeriod[period],
        students: REPORT_STUDENTS.map((student) => ({
            ...student,
        })) as ReportStudentSummary[],
    };
}
