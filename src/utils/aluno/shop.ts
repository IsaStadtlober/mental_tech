// utils/aluno/shop.ts
import type { ShopItem } from "../../types/aluno/shop";

/**
 * Verifica se o aluno pode adquirir o item da loja.
 * Retorna true se ele já possui o item ou se tem moedas suficientes (e o item não for exclusivo de missão).
 */
export const canAcquire = (item: ShopItem, coins: number, owned: boolean): boolean => {
  if (owned) return true;
  if (item.missionOnly) return false;
  
  return coins >= item.price;
};