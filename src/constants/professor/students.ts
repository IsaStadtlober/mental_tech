export type StudentProfileStatus = 'engaged' | 'attention' | 'inactive';

export const STUDENT_PROFILE_STATUS_CONFIG: Record<
    StudentProfileStatus,
    { label: string; tone: 'success' | 'warning' | 'danger' }
> = {
    engaged: { label: 'Em dia', tone: 'success' },
    attention: { label: 'Precisa de atenção', tone: 'warning' },
    inactive: { label: 'Sem atividade há +7 dias', tone: 'danger' },
};

export const STUDENT_PROFILE_MESSAGES = {
    header: {
        title: 'Perfil do aluno',
        backButton: 'Dashboard',
        createActivityButton: 'Enviar missão',
        createActivityButtonCompact: 'Enviar missão',
    },
    metrics: {
        completed: 'Concluídas',
        pending: 'Pendentes',
        revision: 'Em revisão',
        participation: 'Participação',
    },
    sections: {
        history: {
            title: 'Histórico recente',
            subtitle: 'Atividades e avaliações mais recentes.',
        },
        trail: {
            title: 'Posição na trilha',
            subtitle: 'Progresso atual do explorador.',
        },
        pedagogy: {
            title: 'Leitura pedagógica',
            subtitle: 'Resumo simulado dos últimos 30 dias.',
        },
    },
    actions: {
        openCorrections: 'Ver correções pendentes',
    },
    status: {
        engaged: 'Em dia',
        attention: 'Precisa de atenção',
        inactive: 'Sem atividade há +7 dias',
    },
    historyStatus: {
        approved: 'Aprovada',
        pending: 'Aguardando correção',
        revision: 'Em revisão',
    },
};