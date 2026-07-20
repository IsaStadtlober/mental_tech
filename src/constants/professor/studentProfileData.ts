import type { StudentHistoryItem, StudentProfile } from '@/types/professor';

export const STUDENT_PROFILE_DATA: StudentProfile[] = [
    {
        id: 'student-1',
        name: 'Carlos Lima',
        initials: 'CL',
        className: '5º Ano A',
        status: 'attention',
        completedActivities: 7,
        pendingActivities: 3,
        revisionActivities: 1,
        participation: '72%',
        trailPosition: 7,
        lastActivityAt: 'há 4 dias',
    },
    {
        id: 'student-2',
        name: 'Maria Souza',
        initials: 'MS',
        className: '5º Ano B',
        status: 'inactive',
        completedActivities: 3,
        pendingActivities: 5,
        revisionActivities: 0,
        participation: '48%',
        trailPosition: 3,
        lastActivityAt: 'há 9 dias',
    },
    {
        id: 'student-3',
        name: 'Ravi Martins',
        initials: 'RM',
        className: '5º Ano A',
        status: 'attention',
        completedActivities: 8,
        pendingActivities: 2,
        revisionActivities: 1,
        participation: '81%',
        trailPosition: 8,
        lastActivityAt: 'há 3 dias',
    },
];

export const STUDENT_HISTORY_BY_ID: Record<string, StudentHistoryItem[]> = {
    'student-1': [
        {
            id: 'history-4',
            title: 'Mapa afetivo do bairro',
            status: 'pending',
            dateLabel: 'Enviada em 13/07/2026',
        },
        {
            id: 'history-2',
            title: 'Frações no dia a dia',
            status: 'revision',
            dateLabel: 'Revisão solicitada em 12/07/2026',
            grade: '6,5',
        },
        {
            id: 'history-3',
            title: 'Leitura e interpretação',
            status: 'approved',
            dateLabel: 'Concluída em 08/07/2026',
            grade: '8,0',
        },
    ],
    'student-2': [
        {
            id: 'history-4',
            title: 'Descobrindo os biomas brasileiros',
            status: 'pending',
            dateLabel: 'Enviada em 13/07/2026',
        },
        {
            id: 'history-5',
            title: 'Leitura e interpretação',
            status: 'approved',
            dateLabel: 'Concluída em 05/07/2026',
            grade: '7,0',
        },
    ],
    'student-3': [
        {
            id: 'history-6',
            title: 'Descobrindo os biomas brasileiros',
            status: 'pending',
            dateLabel: 'Enviada em 14/07/2026',
        },
        {
            id: 'history-7',
            title: 'Frações no dia a dia',
            status: 'approved',
            dateLabel: 'Concluída em 10/07/2026',
            grade: '9,0',
        },
        {
            id: 'history-8',
            title: 'Leitura e interpretação',
            status: 'revision',
            dateLabel: 'Revisão solicitada em 09/07/2026',
            grade: '7,5',
        },
    ],
};
