export type ShopCategory = 'head' | 'body' | 'legs' | 'accessories';
export type ShopItemIcon = 'sparkles' | 'gift' | 'bag';

export interface ShopItem {
  id: string;
  name: string;
  category: ShopCategory;
  price: number;
  icon: ShopItemIcon;
  missionOnly?: boolean;
}