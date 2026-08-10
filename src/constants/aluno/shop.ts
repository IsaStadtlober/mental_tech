import type { ShopCategory, ShopItem } from '../../types/aluno/shop';
import { MISSION_REWARD_ITEM_ID } from './mission';

export const INITIAL_OWNED_ITEMS = ['green-cap'];
export const SHOP_CATEGORIES: { id: ShopCategory; label: string }[] = [
  { id: 'head', label: 'Cabeça' },
  { id: 'body', label: 'Corpo' },
  { id: 'legs', label: 'Pernas' },
  { id: 'accessories', label: 'Acessórios' },
];
export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'green-cap',
    name: 'Boné Verde',
    category: 'head',
    price: 0,
    icon: 'sparkles',
  },
  {
    id: 'cosmic-helmet',
    name: 'Capacete Cósmico',
    category: 'head',
    price: 80,
    icon: 'sparkles',
  },
  {
    id: 'solar-cape',
    name: 'Capa Solar',
    category: 'body',
    price: 60,
    icon: 'gift',
  },
  {
    id: 'forest-jacket',
    name: 'Jaqueta da Floresta',
    category: 'body',
    price: 100,
    icon: 'gift',
  },
  {
    id: 'stellar-shoes',
    name: 'Tênis Estelar',
    category: 'legs',
    price: 45,
    icon: 'sparkles',
  },
  {
    id: 'moon-boots',
    name: 'Botas Lunares',
    category: 'legs',
    price: 120,
    icon: 'sparkles',
  },
  {
    id: MISSION_REWARD_ITEM_ID,
    name: 'Mochila Cósmica',
    category: 'accessories',
    price: 0,
    icon: 'bag',
    missionOnly: true,
  },
  {
    id: 'explorer-glasses',
    name: 'Óculos de Explorador',
    category: 'accessories',
    price: 70,
    icon: 'sparkles',
  },
];