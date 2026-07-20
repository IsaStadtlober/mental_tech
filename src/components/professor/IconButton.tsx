import { borderRadius, fonts, theme } from '@/constants/theme';
import React, {
  type ReactNode,
} from 'react';
import {
  Pressable,
  Text,
  type StyleProp,
  type ViewStyle,
  View
} from 'react-native';

export type IconButtonVariant =
  | 'plain'
  | 'soft'
  | 'primary'
  | 'danger';

export type IconButtonSize =
  | 'small'
  | 'medium'
  | 'large';

export interface IconButtonProps {
  icon: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityHint?: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  badge?: number;
  style?: StyleProp<ViewStyle>;
}

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
  const variants = {
    plain: {
      background:
        'transparent',

      hoverBackground:
        theme.bgSoft,

      border:
        'transparent',
    },

    soft: {
      background:
        theme.bgSoft,

      hoverBackground:
        theme.primaryTint,

      border:
        theme.border,
    },

    primary: {
      background:
        theme.primary,

      hoverBackground:
        theme.primaryLight,

      border:
        theme.primary,
    },

    danger: {
      background:
        theme.dangerSoft,

      hoverBackground:
        theme.dangerHoverSoft,

      border:
        theme.dangerSoft,
    },
  } as const;

  const sizes = {
    small: 40,
    medium: 44,
    large: 48,
  } as const;

  const dimension =
    sizes[size];

  const currentVariant =
    variants[variant];

  const visibleBadge =
    typeof badge === 'number' &&
    badge > 0;

  const badgeLabel =
    visibleBadge
      ? badge > 99
        ? '99+'
        : String(badge)
      : '';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        visibleBadge
          ? `${accessibilityLabel}. ${badgeLabel} notificações não lidas.`
          : accessibilityLabel
      }
      accessibilityHint={
        accessibilityHint
      }
      accessibilityState={{
        disabled,
      }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          position: 'relative',

          width: dimension,
          height: dimension,

          flexShrink: 0,

          alignItems: 'center',
          justifyContent: 'center',

          borderWidth: 1,

          borderColor: disabled
            ? theme.disabled
            : currentVariant.border,

          borderRadius:
            borderRadius.pill,

          backgroundColor:
            disabled
              ? theme.bgSubtle
              : currentVariant.background,

          opacity:
            disabled
              ? 0.55
              : pressed
                ? 0.78
                : 1,
        },
        style,
      ]}
    >
      {icon}

      {visibleBadge && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',

            top: -4,
            right: -4,

            minWidth: 19,
            height: 19,

            paddingHorizontal: 5,

            alignItems: 'center',
            justifyContent: 'center',

            borderWidth: 2,
            borderColor:
              theme.card,

            borderRadius:
              borderRadius.pill,

            backgroundColor:
              theme.danger,
          }}
        >
          <Text
            style={{
              color:
                theme.white,

              fontFamily:
                fonts.bodyBold,

              fontSize: 9,
              lineHeight: 11,
            }}
          >
            {badgeLabel}
          </Text>
        </View>
      )}
    </Pressable>
  );
}