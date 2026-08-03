import { LinearGradient } from 'expo-linear-gradient';
import { Backpack, Glasses, Sparkles } from 'lucide-react-native';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { usePop } from '../../hooks/useAnimations';
import { alunoStyles as s } from '../../styles/aluno';
import { authStyles as styles } from '../../styles/pages/auth';
import type { EquippedBySlot } from '../../types/aluno';

export function ExplorerAvatar({
  equippedItemId,
  equippedBySlot,
  name,
  compact = false,
}: {
  equippedItemId?: string | null;
  equippedBySlot?: EquippedBySlot;
  name?: string;
  compact?: boolean;
}) {
  const popStyle = usePop(120);
  const activeItem =
    equippedItemId ||
    equippedBySlot?.accessories ||
    equippedBySlot?.head ||
    null;
  const item =
    activeItem === 'cosmic-backpack' ? (
      <Backpack size={compact ? 18 : 25} color={theme.studentGoldAccent} />
    ) : activeItem === 'explorer-glasses' ? (
      <Glasses size={compact ? 18 : 25} color={theme.studentGoldAccent} />
    ) : (
      <Sparkles size={compact ? 25 : 44} color={theme.bg} strokeWidth={1.8} />
    );
  return (
    <View style={compact ? s.avatarCompactWrap : undefined}>
      <Animated.View
        style={[
          compact ? s.explorerAvatarCompact : styles.explorerAvatar,
          popStyle,
        ]}
      >
        <LinearGradient
          colors={theme.gradPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={
            compact
              ? s.explorerAvatarCompactGradient
              : styles.explorerAvatarGradient
          }
        >
          {item}
          {(activeItem === 'green-cap' ||
            equippedBySlot?.head === 'green-cap') && (
            <View style={s.avatarCap} />
          )}
        </LinearGradient>
      </Animated.View>
      {!!name && (
        <Text numberOfLines={1} style={s.avatarName}>
          {name}
        </Text>
      )}
    </View>
  );
}