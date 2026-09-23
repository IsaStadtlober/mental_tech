import { supabase } from '@/service/supabase';
import type { EquippedItems, ShopItem } from '@/types/aluno/shop';

/**
 * Busca todos os itens disponíveis na loja
 */
export async function fetchShopItems(): Promise<ShopItem[]> {
  const { data, error } = await supabase
    .from('shop_items')
    .select('*')
    .order('price', { ascending: true });

  if (error) {
    console.error('Erro ao buscar itens do shop:', error);
    throw error;
  }

  return data || [];
}

/**
 * Busca os IDs dos itens que o aluno possui no inventário
 */
export async function fetchStudentInventory(studentId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('student_inventories')
    .select('item_id')
    .eq('student_id', studentId);

  if (error) {
    console.error('Erro ao buscar inventário do aluno:', error);
    throw error;
  }

  return data.map((item) => item.item_id);
}

/**
 * Busca os itens atualmente equipados no avatar do aluno
 */
export async function fetchEquippedAvatar(studentId: string): Promise<EquippedItems> {
  const { data, error } = await supabase
    .from('avatars')
    .select('equipped_items')
    .eq('student_id', studentId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = NENHUM REGISTRO ENCONTRADO
    console.error('Erro ao buscar avatar do aluno:', error);
    throw error;
  }

  return data?.equipped_items || {};
}

/**
 * Salva a nova combinação de itens equipados no avatar do aluno
 */
export async function saveEquippedAvatar(
  studentId: string,
  equippedItems: EquippedItems
): Promise<void> {
  const { error } = await supabase.from('avatars').upsert({
    student_id: studentId,
    equipped_items: equippedItems,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Erro ao salvar avatar:', error);
    throw error;
  }
}