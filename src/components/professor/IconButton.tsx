import { theme } from '@/constants/theme';
import { iconButtonStyles } from '@/styles/professor/iconButton';
import type { IconButtonProps } from '@/types/professor/iconButton';
import { getIconButtonSizeConfig, getIconButtonVariantConfig } from '@/utils/professor/iconButton';
import { Pressable, Text, View } from 'react-native';

export default function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  variant = 'plain',
  size = 'medium',
  disabled = false,
  badge,
  style,
}: IconButtonProps) {
  const dimension = getIconButtonSizeConfig(size);
  const currentVariant = getIconButtonVariantConfig(variant);

  const visibleBadge = typeof badge === 'number' && badge > 0;
  const badgeLabel = visibleBadge ? (badge > 99 ? '99+' : String(badge)) : '';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        visibleBadge
          ? `${accessibilityLabel}. ${badgeLabel} notificações não lidas.`
          : accessibilityLabel
      }
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        iconButtonStyles.pressable,
        {
          width: dimension,
          height: dimension,
          borderColor: disabled ? theme.disabled : currentVariant.border,
          backgroundColor: disabled ? theme.bgSubtle : currentVariant.background,
          opacity: disabled ? 0.55 : pressed ? 0.78 : 1,
        },
        style,
      ]}
    >
      {icon}

      {visibleBadge && (
        <View pointerEvents="none" style={iconButtonStyles.badgeContainer}>
          <Text style={iconButtonStyles.badgeText}>{badgeLabel}</Text>
        </View>
      )}
    </Pressable>
  );
}