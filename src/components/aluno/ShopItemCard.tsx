import {
  CheckCircle, Coins, Gift, LockKeyhole,
  ShoppingBag, Sparkles, Trophy
} from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno';
import type { ShopItem } from '../../types/aluno';

export function ShopItemCard({
  item,
  owned,
  equipped,
  available,
  onPress,
}: {
  item: ShopItem;
  owned: boolean;
  equipped: boolean;
  available: boolean;
  onPress(): void;
}) {
  const Icon =
    item.icon === 'gift' ? Gift : item.icon === 'bag' ? ShoppingBag : Sparkles;
  const lacking = Math.max(0, item.price);
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`${item.name}. ${item.missionOnly
          ? 'Exclusivo de missão'
          : owned
            ? 'Item adquirido'
            : `${item.price} moedas`
        }`}
      onPress={onPress}
      style={[
        s.shopItemCard,
        item.missionOnly && s.shopItemExclusive,
        !available && !item.missionOnly && s.shopItemCardLocked,
        equipped && s.shopItemCardEquipped,
      ]}
    >
      <View
        style={[
          s.shopItemIcon,
          item.missionOnly && s.shopItemExclusiveIcon,
          !available && !item.missionOnly && s.shopItemIconLocked,
        ]}
      >
        {item.missionOnly && !owned ? (
          <LockKeyhole size={22} color={theme.studentPurple} />
        ) : (
          <Icon
            size={25}
            color={item.missionOnly ? theme.studentPurple : theme.primary}
          />
        )}
      </View>
      <Text style={s.shopItemTitle}>{item.name}</Text>
      {equipped ? (
        <View style={s.itemStatusReady}>
          <CheckCircle size={12} color={theme.primary} />
          <Text style={s.itemStatusReadyText}>Equipado</Text>
        </View>
      ) : owned ? (
        <Text style={s.itemActionText}>Equipar</Text>
      ) : item.missionOnly ? (
        <View style={s.exclusiveRequirement}>
          <Trophy size={12} color={theme.studentPurple} />
          <Text style={s.exclusiveRequirementText}>Exclusivo de Missão</Text>
        </View>
      ) : available ? (
        <View style={s.itemPriceRow}>
          <Coins size={12} color={theme.studentGold} />
          <Text style={s.itemPriceText}>{item.price}</Text>
        </View>
      ) : (
        <View style={s.requirementBox}>
          <Text style={s.requirementLabel}>Saldo necessário</Text>
          <Text style={s.requirementText}>{lacking} moedas</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}