import { EMPTY_STATE_LAYOUT } from '@/constants/professor/emptyState';

// Configuração do layout do estado de vazio.
export function getEmptyStateLayout(compact: boolean) {
    return compact ? EMPTY_STATE_LAYOUT.compact : EMPTY_STATE_LAYOUT.default;
}