import type { RecentSubmission, Student } from '@/types/professor';

// Dados de alunos simulados.
export const MOCK_STUDENTS: Student[] = [
    {
        id: 'student-1',
        name: 'Carlos Lima',
        initials: 'CL',
        className: '5º Ano A',
        engagementStatus: 'attention',
        completedActivities: 7,
        pendingActivities: 3,
        revisionActivities: 1,
        pendingCorrections: 2,
        lastActivityAt: 'há 4 dias',
        trailPosition: 7,
    },
    {
        id: 'student-2',
        name: 'Maria Souza',
        initials: 'MS',
        className: '5º Ano B',
        engagementStatus: 'inactive',
        completedActivities: 3,
        pendingActivities: 5,
        revisionActivities: 0,
        pendingCorrections: 0,
        lastActivityAt: 'há 9 dias',
        trailPosition: 3,
    },
    {
        id: 'student-3',
        name: 'Ravi Martins',
        initials: 'RM',
        className: '5º Ano A',
        engagementStatus: 'attention',
        completedActivities: 8,
        pendingActivities: 2,
        revisionActivities: 1,
        pendingCorrections: 1,
        lastActivityAt: 'há 3 dias',
        trailPosition: 8,
    },
];

export const RECENT_SUBMISSIONS: RecentSubmission[] = [
    {
        id: 'submission-1',
        initials: 'AC',
        studentName: 'Ana Clara',
        activityTitle: 'Descobrindo os biomas brasileiros',
        className: '5º Ano A',
        waitingTime: 'Enviado há 1 hora',
    },
    {
        id: 'submission-2',
        initials: 'LM',
        studentName: 'Lucas Mendes',
        activityTitle: 'Frações no dia a dia',
        className: '5º Ano A',
        waitingTime: 'Enviado há 2 horas',
    },
    {
        id: 'submission-3',
        initials: 'RM',
        studentName: 'Ravi Martins',
        activityTitle: 'Descobrindo os biomas brasileiros',
        className: '5º Ano A',
        waitingTime: 'Enviado há 4 horas',
    },
];