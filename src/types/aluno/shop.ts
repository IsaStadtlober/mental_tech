export type ShopCategory = 'head' | 'body' | 'legs' | 'accessories';

export interface ShopItem {
  id: string; // UUID vindo do banco
  name: string;
  category: ShopCategory;
  price: number;
  image_url: string; // Caminho no bucket (ex: 'head/CABELO_CURTO_PRETO.png')
  missionOnly: boolean;
}

export type EquippedItems = Partial<Record<ShopCategory, string>>; // ex: { head: "uuid-do-item", body: "uuid-do-item" }