export const PROFESSOR_DASHBOARD_MESSAGES = {
    overview: {
        eyebrow: 'Visão geral',
        title: 'Acompanhe suas turmas',
        description: (pendingCount: number) =>
            `Você possui ${pendingCount} ${pendingCount === 1
                ? 'envio aguardando correção'
                : 'envios aguardando correção'
            } e pode acompanhar as prioridades abaixo.`,
        newMissionButton: 'Nova missão',
        newMissionAccessibilityHint: 'Abre o formulário para criar uma nova atividade',
    },
    priorities: {
        eyebrow: 'Prioridades',
        title: 'O que precisa de atenção',
        subtitle: 'Indicadores principais das suas turmas.',
        metrics: {
            waitingCorrection: {
                label: 'Aguardando correção',
                helper: (count: number) =>
                    count === 0
                        ? 'Nenhum envio exige ação agora'
                        : 'Priorize os envios mais antigos',
            },
            noActivity: {
                label: 'Sem atividade há +7 dias',
                helper: 'Alunos que podem precisar de apoio',
            },
            publishedActivities: {
                label: 'Atividades publicadas',
                helper: (count: number) =>
                    count === 1
                        ? '1 missão disponível para os alunos'
                        : `${count} missões disponíveis para os alunos`,
            },
            participation: {
                label: 'Participação da turma',
                value: '84%',
                helper: 'Aumento de 6% nos últimos 30 dias',
            },
        },
    },
    studentsInFocus: {
        title: 'Alunos em foco',
        subtitle: 'Alunos que necessitam de intervenção ou feedback.',
        seeReportsButton: 'Ver relatórios',
    },
    quickActions: {
        title: 'Ações rápidas',
        subtitle: 'Acesse as tarefas mais frequentes.',
        openCorrectionQueue: 'Abrir fila de correção',
        manageActivities: 'Gerenciar atividades',
        consultReports: 'Consultar relatórios',
    },
    classSummary: {
        title: 'Resumo das turmas',
        subtitle: 'Participação nos últimos 30 dias.',
    },
    recentSubmissions: {
        title: 'Últimas entregas',
        subtitle: 'Trabalhos enviados recentemente que precisam de avaliação.',
        seeFullQueueButton: 'Ver fila completa',
        correctButton: 'Corrigir',
    },
};