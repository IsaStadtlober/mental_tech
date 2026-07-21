import { SECTION_HEADER_LAYOUT } from '@/constants/professor/sectionHeader';

export function getSectionHeaderLayout(compact: boolean) {
    return compact ? SECTION_HEADER_LAYOUT.compact : SECTION_HEADER_LAYOUT.default;
}