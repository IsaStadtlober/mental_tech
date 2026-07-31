import { useRouter } from 'expo-router';
import { Coins, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ExplorerAvatar } from '../../../components/aluno/ExplorerAvatar';
import { ShopCategoryBar } from '../../../components/aluno/ShopCategoryBar';
import { ShopItemCard } from '../../../components/aluno/ShopItemCard';
import { ShopTabs, type ShopTab } from '../../../components/aluno/ShopTabs';
import { StudentBottomSheet } from '../../../components/aluno/StudentBottomSheet';
import { StudentScreenShell } from '../../../components/aluno/StudentScreenShell';
import { SimpleCenteredHeader } from '../../../components/Headers';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { SHOP_ITEMS } from '../../../constants/aluno/shop';
import { theme } from '../../../constants/theme';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { alunoStyles as s } from '../../../styles/aluno';
import type { ShopCategory, ShopItem } from '../../../types/aluno';
import { canAcquire } from '../../../utils/aluno/shop';

export default function CustomizeRoute() {
  const router = useRouter();
  const onBack = () => router.back();
  const { session, ownedItemIds, equippedBySlot, acquireOrEquip } =
    useStudentPrototype();
  const [tab, setTab] = useState<ShopTab>('inventory');
  const [cat, setCat] = useState<ShopCategory>('head');
  const [pending, setPending] = useState<ShopItem | null>(null);
  const items = useMemo(
    () =>
      SHOP_ITEMS.filter((i) =>
        tab === 'inventory' ? ownedItemIds.includes(i.id) : i.category === cat
      ),
    [cat, ownedItemIds, tab]
  );
  const choose = (item: ShopItem) => {
    const owned = ownedItemIds.includes(item.id);
    if (owned) {
      acquireOrEquip(item);
      return;
    }
    if (item.missionOnly) return;
    setPending(item);
  };
  const confirm = () => {
    if (pending) {
      acquireOrEquip(pending);
      setPending(null);
      setTab('inventory');
    }
  };
  return (
    <>
      <StudentScreenShell
        onBack={onBack}
        footer={
          <PrimaryButton onPress={onBack} icon={false}>
            Salvar visual
          </PrimaryButton>
        }
      >
        <SimpleCenteredHeader
          title="Personalize seu explorador"
          subtitle="Use suas moedas ou equipe recompensas conquistadas."
        />
        <ExplorerAvatar
          equippedBySlot={equippedBySlot}
          name={session.explorerName}
        />
        <View style={s.shopBalanceLarge}>
          <Coins size={17} color="#D6961D" />
          <Text style={s.shopBalanceLargeText}>{session.coins} moedas</Text>
        </View>
        <ShopTabs value={tab} onChange={setTab} />
        {tab === 'shop' && (
          <>
            <ShopCategoryBar value={cat} onChange={setCat} />
            <Text style={s.shopHelper}>
              Itens roxos são exclusivos de missão e não podem ser comprados.
            </Text>
          </>
        )}
        {tab === 'inventory' && items.length === 0 ? (
          <View style={s.inventoryEmpty}>
            <SparklesEmpty />
            <Text style={s.inventoryEmptyTitle}>
              Seu inventário está começando
            </Text>
            <Text style={s.inventoryEmptyText}>
              Complete missões e use moedas para conquistar novos itens.
            </Text>
            <TouchableOpacity onPress={() => setTab('shop')}>
              <Text style={s.inventoryEmptyLink}>Explorar a loja</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={s.shopGrid}>
            {items.map((item) => {
              const owned = ownedItemIds.includes(item.id);
              const available = canAcquire(item, session.coins, owned);
              return (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  owned={owned}
                  equipped={equippedBySlot[item.category] === item.id}
                  available={available}
                  onPress={() => choose(item)}
                />
              );
            })}
          </View>
        )}
      </StudentScreenShell>
      {!!pending && (
        <StudentBottomSheet onClose={() => setPending(null)}>
          <View style={s.confirmSheet}>
            <TouchableOpacity
              onPress={() => setPending(null)}
              style={s.modalClose}
            >
              <X size={20} color={theme.textMuted} />
            </TouchableOpacity>
            <Text style={s.confirmTitle}>Comprar {pending?.name}?</Text>
            <Text style={s.confirmText}>
              O item entrará no seu inventário e poderá ser equipado quando
              quiser.
            </Text>
            <View style={s.purchaseSummary}>
              <Text style={s.purchaseLabel}>Preço</Text>
              <Text style={s.purchaseValue}>{pending?.price} moedas</Text>
              <Text style={s.purchaseLabel}>Saldo depois</Text>
              <Text style={s.purchaseValue}>
                {Math.max(0, session.coins - (pending?.price || 0))} moedas
              </Text>
            </View>
            <PrimaryButton
              disabled={!pending || session.coins < pending.price}
              onPress={confirm}
              icon={false}
            >
              Comprar e equipar
            </PrimaryButton>
            <TouchableOpacity
              onPress={() => setPending(null)}
              style={s.secondaryAction}
            >
              <Text style={s.secondaryActionText}>
                {pending && session.coins < pending.price
                  ? `Faltam ${pending.price - session.coins} moedas`
                  : 'Agora não'}
              </Text>
            </TouchableOpacity>
          </View>
        </StudentBottomSheet>
      )}
    </>
  );
}
function SparklesEmpty() {
  return (
    <View style={s.inventoryEmptyIcon}>
      <Text style={s.inventoryEmptyEmoji}>✦</Text>
    </View>
  );
}
