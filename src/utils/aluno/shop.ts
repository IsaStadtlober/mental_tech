import type { ShopItem } from '../../types/aluno/shop';

export const canAcquire = (item: ShopItem, coins: number, owned: boolean) =>
  owned || (!item.missionOnly && coins >= item.price);