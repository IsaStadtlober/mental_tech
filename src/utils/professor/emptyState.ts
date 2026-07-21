import { EMPTY_STATE_LAYOUT } from '@/constants/professor/emptyState';

export function getEmptyStateLayout(compact: boolean) {
    return compact ? EMPTY_STATE_LAYOUT.compact : EMPTY_STATE_LAYOUT.default;
}