import { theme } from '@/constants/theme';
import { appButtonStyles } from '@/styles/professor/appButton';
import type { AppButtonProps } from '@/types/professor/appButton';
import { getAppButtonSizeConfig, getAppButtonVariantConfig } from '@/utils/professor/appButton';

import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from 'react-native';

export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  accessibilityLabel,
  accessibilityHint,
  style,
}: AppButtonProps) {
  const unavailable =
    disabled || loading;

  const currentVariant =
    getAppButtonVariantConfig(variant);

  const currentSize =
    getAppButtonSizeConfig(size);

  const backgroundColor =
    unavailable
      ? theme.disabled
      : currentVariant.background;

  const foregroundColor =
    unavailable
      ? theme.textMuted
      : currentVariant.foreground;

  const borderColor =
    unavailable
      ? theme.disabled
      : currentVariant.border;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ?? label
      }
      accessibilityHint={
        accessibilityHint
      }
      accessibilityState={{
        disabled: unavailable,
        busy: loading,
      }}
      disabled={unavailable}
      onPress={onPress}
      style={({ pressed }) => [
        appButtonStyles.pressable,
        {
          minHeight: currentSize.minHeight,
          width: fullWidth ? '100%' : undefined,
          alignSelf: fullWidth ? 'stretch' : undefined,
          paddingHorizontal: currentSize.paddingHorizontal,
          borderWidth: variant === 'ghost' ? 0 : 1,
          borderColor,
          borderRadius: 12,
          backgroundColor,
          opacity: pressed ? 0.84 : 1,
        },

        variant === 'primary' && !unavailable ? theme.shadowBtn : undefined,

        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={foregroundColor}
        />
      ) : (
        <>
          {!!iconLeft && (
            <View
              pointerEvents="none"
              style={[
                appButtonStyles.iconWrapper,
                {
                  width: currentSize.iconSize,
                  height: currentSize.iconSize,
                },
              ]}
            >
              {iconLeft}
            </View>
          )}

          <Text
            numberOfLines={1}
            style={[appButtonStyles.label, {
              color: foregroundColor,
              fontSize: currentSize.fontSize,
            }]}
          >
            {label}
          </Text>

          {!!iconRight && (
            <View
              pointerEvents="none"
              style={[
                appButtonStyles.iconWrapper,
                {
                  width: currentSize.iconSize,
                  height: currentSize.iconSize,
                },
              ]}
            >
              {iconRight}
            </View>
          )}
        </>
      )}
    </Pressable>
  );
}