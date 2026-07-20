import type { StatusChipTone } from '@/components/professor/StatusChip';
import type { ActivityStatus } from '@/types/professor';

export type ActivityFilter = 'all' | ActivityStatus;

export const ACTIVITY_FILTERS: { value: ActivityFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'published', label: 'Publicadas' },
    { value: 'draft', label: 'Rascunhos' },
    { value: 'closed', label: 'Encerradas' },
];

export const ACTIVITY_STATUS_CONFIG: Record<
    ActivityStatus,
    { label: string; tone: StatusChipTone }
> = {
    published: { label: 'Publicada', tone: 'success' },
    draft: { label: 'Rascunho', tone: 'warning' },
    closed: { label: 'Encerrada', tone: 'neutral' },
};

export const ACTIVITY_MESSAGES = {
    header: {
        title: 'Atividades',
        subtitle: 'Crie, publique e acompanhe as missões das suas turmas.',
        backButton: 'Dashboard',
        newActivityButton: 'Nova missão',
        editButton: 'Editar atividade',
        detailsBackLabel: 'Atividades',
    },
    search: {
        label: 'Pesquisar atividade',
        placeholder: 'Digite o título ou a turma',
    },
    filters: {
        label: 'Filtrar por status',
    },
    emptyState: {
        title: 'Nenhuma atividade encontrada',
        description: 'Ajuste a pesquisa ou os filtros para visualizar outras missões.',
        descriptionFallback: 'Crie uma missão para começar a acompanhar as atividades da turma.',
        actionLabel: 'Criar missão',
    },
    count: {
        one: 'atividade encontrada',
        many: 'atividades encontradas',
    },
    actions: {
        details: 'Detalhes',
        edit: 'Editar',
        delete: 'Excluir',
        download: 'Baixar arquivo',
        openCorrections: 'Ver correções pendentes',
    },
    detail: {
        instructionTitle: 'Instrução da missão',
        instructionSubtitle: 'Orientação visível para os alunos.',
        materialTitle: 'Material publicado',
        materialSubtitle: 'Arquivo disponibilizado para download.',
        downloads: 'Baixar arquivo',
        notFound: 'Atividade não encontrada.',
        deliveryLabel: 'Entregas',
        correctedLabel: 'Corrigidas',
        pendingLabel: 'Aguardando correção',
        deliveryHelper: 'Respostas já avaliadas',
        pendingHelper: 'Envios que precisam de ação',
        participationHelper: '% da turma',
        configurationTitle: 'Configuração',
        configurationSubtitle: 'Resumo da publicação.',
        recipientsLabel: 'Destinatários',
        rewardLabel: 'Recompensa ao aprovar',
        createdAtLabel: 'Criada em',
        publishedAtLabel: 'Publicada em',
        deadlinePrefix: 'Entrega em',
        noDeadline: 'Sem prazo definido',
    },
    deleteDialog: {
        title: 'Excluir esta atividade?',
        description: 'A atividade “{title}” será removida do protótipo.',
        cancel: 'Cancelar',
        confirm: 'Confirmar exclusão',
    },
};