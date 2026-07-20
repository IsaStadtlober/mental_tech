import { borderRadius, fonts, theme } from '@/constants/theme';
import React, {
  ReactNode,
} from 'react';

import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

export type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost';

export type AppButtonSize =
  | 'small'
  | 'medium'
  | 'large';

export interface AppButtonProps {
  label: string;
  onPress?: () => void;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
}

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

  const variants = {
    primary: {
      background:
        theme.primary,

      hoverBackground:
        theme.primaryLight,

      border:
        theme.primary,

      foreground:
        theme.white,
    },

    secondary: {
      background:
        theme.bgSoft,

      hoverBackground:
        theme.primaryTint,

      border:
        theme.primaryTint,

      foreground:
        theme.primary,
    },

    danger: {
      background:
        theme.danger,

      hoverBackground: theme.dangerHover,

      border:
        theme.danger,

      foreground:
        theme.white,
    },

    ghost: {
      background: 'transparent',

      hoverBackground:
        theme.bgSoft,

      border: 'transparent',

      foreground:
        theme.primary,
    },
  } as const;

  const sizes = {
    small: {
      minHeight: 40,
      paddingHorizontal: 14,
      fontSize: 13,
      iconSize: 16,
    },

    medium: {
      minHeight: 46,
      paddingHorizontal: 17,
      fontSize: 14,
      iconSize: 18,
    },

    large: {
      minHeight: 52,
      paddingHorizontal: 21,
      fontSize: 15,
      iconSize: 19,
    },
  } as const;

  const currentVariant =
    variants[variant];

  const currentSize =
    sizes[size];

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
        {
          minHeight:
            currentSize.minHeight,

          width: fullWidth
            ? '100%'
            : undefined,

          alignSelf: fullWidth
            ? 'stretch'
            : undefined,

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

          gap: 8,

          paddingHorizontal:
            currentSize
              .paddingHorizontal,

          borderWidth:
            variant === 'ghost'
              ? 0
              : 1,

          borderColor,

          borderRadius:
            borderRadius.lg,

          backgroundColor,

          opacity:
            pressed ? 0.84 : 1,
        },

        variant === 'primary' &&
          !unavailable
          ? theme.shadowBtn
          : undefined,

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
              style={{
                width:
                  currentSize.iconSize,

                height:
                  currentSize.iconSize,

                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {iconLeft}
            </View>
          )}

          <Text
            numberOfLines={1}
            style={{
              color:
                foregroundColor,

              fontFamily:
                fonts.headlineSemibold,

              fontSize:
                currentSize.fontSize,

              textAlign: 'center',
            }}
          >
            {label}
          </Text>

          {!!iconRight && (
            <View
              pointerEvents="none"
              style={{
                width:
                  currentSize.iconSize,

                height:
                  currentSize.iconSize,

                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {iconRight}
            </View>
          )}
        </>
      )}
    </Pressable>
  );
}