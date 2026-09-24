export type ShopCategory = 'head' | 'body' | 'legs' | 'accessories';

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: ShopCategory;
  missionOnly?: boolean;
  mission_only?: boolean;
  
  icon?: 'gift' | 'bag' | 'sparkles' | string;
  imageUrl?: string;
  image_url?: string;
}

export type EquippedItems = Partial<Record<ShopCategory, string>>; // ex: { head: "uuid-do-item", body: "uuid-do-item" }