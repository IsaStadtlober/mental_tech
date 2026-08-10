import type { HistoryFilter, RecentActivity } from '../../types/aluno';
import { PROTOTYPE_HISTORY } from './fixtures';

export const HISTORY_LABELS: Record<HistoryFilter, string> = {
    all: 'Todas',
    inProgress: 'Em andamento',
    awaitingReview: 'Aguardando',
    revision: 'Revisar',
    approved: 'Concluídas',
    pending: 'Nova',
};

export const HISTORY_FILTERS: [HistoryFilter, string][] = [
    ['all', 'Todas'],
    ['inProgress', 'Em andamento'],
    ['awaitingReview', 'Aguardando'],
    ['revision', 'Revisar'],
    ['approved', 'Concluídas'],
];

export const HISTORY_EMPTY_COPY: Record<
    HistoryFilter,
    { title: string; description: string }
> = {
    all: {
        title: 'Sua jornada está começando',
        description: 'Quando você participar de uma missão, ela aparecerá aqui.',
    },
    pending: {
        title: 'Nenhuma missão nova',
        description: 'Quando uma nova aventura chegar, ela aparecerá aqui.',
    },
    inProgress: {
        title: 'Nenhuma missão em andamento',
        description: 'Você terminou tudo por enquanto. Muito bem!',
    },
    awaitingReview: {
        title: 'Nada aguardando correção',
        description: 'Quando você enviar uma resposta, poderá acompanhar por aqui.',
    },
    revision: {
        title: 'Tudo certo por aqui!',
        description: 'Você não tem nenhuma correção pendente.',
    },
    approved: {
        title: 'Nenhuma missão concluída ainda',
        description: 'Sua primeira conquista vai aparecer aqui em breve.',
    },
};

export const SAMPLE_RECENT_ACTIVITIES: RecentActivity[] = PROTOTYPE_HISTORY;