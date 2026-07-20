// Constantes do dashboard
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

// Constantes das notificações
export const PROFESSOR_NOTIFICATIONS_MESSAGES = {
    header: {
        title: 'Notificações',
        subtitle: 'Acompanhe envios, correções, atividades e alunos que precisam de atenção.',
        backButton: 'Dashboard',
        clearReadButton: (isCompact: boolean) =>
            isCompact ? 'Limpar lidas' : 'Limpar notificações lidas',
        markAllReadButton: (isCompact: boolean) =>
            isCompact ? 'Marcar todas' : 'Marcar todas como lidas',
    },
    summary: {
        unreadCount: (count: number) => (count === 1 ? '1 não lida' : `${count} não lidas`),
        helperText: 'Da mais recente para a mais antiga',
    },
    filter: {
        title: 'Filtrar notificações',
    },
    count: {
        total: (count: number) => `${count} ${count === 1 ? 'notificação' : 'notificações'}`,
    },
    emptyState: {
        title: 'Nenhuma notificação encontrada',
        descriptionUnread: 'Você já leu todas as notificações.',
        descriptionEmpty: 'Você não possui notificações no momento.',
        descriptionFilter: 'Nenhum evento corresponde ao filtro selecionado.',
    },
    item: {
        newTag: 'Nova',
        deleteButton: 'Excluir',
        actions: {
            correctionQueue: 'Abrir fila',
            studentProfile: 'Ver aluno',
            activityDetail: 'Ver atividade',
            reports: 'Ver relatórios',
            read: 'Lida',
            markAsRead: 'Marcar como lida',
        },
    },
};

// Constantes do perfil
export const PROFESSOR_PROFILE_MESSAGES = {
    header: {
        backButton: 'Dashboard',
        title: 'Meu perfil',
        subtitle: 'Gerencie suas informações pessoais, segurança e preferências do sistema.',
    },
    personalInfo: {
        title: 'Informações pessoais',
        subtitle: 'Atualize seu nome e e-mail de acesso.',
        displayNameLabel: 'Nome de exibição',
        displayNamePlaceholder: 'Nome do professor',
        nameLabel: 'Nome completo',
        namePlaceholder: 'Digite seu nome completo',
        emailLabel: 'E-mail',
        emailPlaceholder: 'Digite seu e-mail',
        displayEmailPlaceholder: 'seu@email.com',
        schoolLabel: 'Escola',
        schoolValue: 'Escola Caminho do Saber',
        validationError: 'Revise o nome e o e-mail antes de salvar.',
        successMessage: 'Alterações do perfil salvas.',
    },
    notifications: {
        title: 'Preferências de notificação',
        subtitle: 'Escolha como deseja receber os avisos do sistema.',
        newSubmissions: {
            title: 'Novos envios',
            description: 'Avisar quando um aluno enviar uma resposta.',
        },
        delayedCorrections: {
            title: 'Correções pendentes',
            description: 'Lembrar quando um envio aguardar por mais de 48 horas.',
        },
        approachingDeadlines: {
            title: 'Prazos próximos',
            description: 'Avisar sobre atividades próximas da data de entrega.',
        },
        weeklySummary: {
            title: 'Resumo semanal',
            description: 'Receber um resumo da participação das turmas.',
        },
    },
    accessibility: {
        title: 'Acessibilidade',
        subtitle: 'Preferências demonstrativas do protótipo.',
        largeText: {
            title: 'Fonte ampliada',
            description: 'Aumenta os textos dos campos desta tela.',
        },
        highContrast: {
            title: 'Alto contraste',
            description: 'Aumenta o contraste do fundo desta tela.',
        },
        reduceAnimations: {
            title: 'Reduzir animações',
            description: 'Preferência registrada somente nesta demonstração.',
        },
        note: 'No produto oficial, estas preferências deverão ser aplicadas globalmente e persistidas na conta do professor.',
    },
    security: {
        title: 'Segurança',
        subtitle: 'Atualização simulada da senha de acesso.',
        currentPasswordLabel: 'Senha atual',
        currentPasswordPlaceholder: 'Digite a senha atual',
        newPasswordLabel: 'Nova senha',
        newPasswordPlaceholder: 'Mínimo 6 caracteres',
        confirmPasswordLabel: 'Confirmar nova senha',
        confirmPasswordPlaceholder: 'Digite novamente',
        validationError: 'Preencha as senhas corretamente. A nova senha deve ter pelo menos 6 caracteres e a confirmação deve ser igual.',
        successMessage: 'Senha atualizada no protótipo.',
    },
    actions: {
        save: 'Salvar alterações',
        updatePassword: 'Atualizar senha',
        dashboard: 'Dashboard',
    },
};