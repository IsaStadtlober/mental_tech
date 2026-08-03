import { ShoppingBag, Sparkles } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno';
import type { ShopTab } from '../../types/aluno';

export function ShopTabs({
  value,
  onChange,
}: {
  value: ShopTab;
  onChange(v: ShopTab): void;
}) {
  return (
    <View style={s.shopTabs}>
      <TouchableOpacity
        onPress={() => onChange('inventory')}
        style={[s.shopTab, value === 'inventory' && s.shopTabActive]}
      >
        <Sparkles
          size={16}
          color={value === 'inventory' ? theme.white : theme.primary}
        />
        <Text
          style={[s.shopTabText, value === 'inventory' && s.shopTabTextActive]}
        >
          Meu Inventário
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChange('shop')}
        style={[s.shopTab, value === 'shop' && s.shopTabActive]}
      >
        <ShoppingBag
          size={16}
          color={value === 'shop' ? theme.white : theme.primary}
        />
        <Text style={[s.shopTabText, value === 'shop' && s.shopTabTextActive]}>
          Loja
        </Text>
      </TouchableOpacity>
    </View>
  );
}