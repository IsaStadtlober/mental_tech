import type { ShopCategory } from '../../types/aluno/shop';

export const INITIAL_OWNED_ITEMS = ['green-cap'];
export const SHOP_CATEGORIES: { id: ShopCategory; label: string }[] = [
  { id: 'head', label: 'Cabeça' },
  { id: 'body', label: 'Corpo' },
  { id: 'legs', label: 'Pernas' },
  { id: 'accessories', label: 'Acessórios' },
];
