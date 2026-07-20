import { borderRadius, theme } from '@/constants/theme';
import React from 'react';
import {
  Pressable,
  type StyleProp,
  View,
  ViewProps,
  type ViewStyle,
} from 'react-native';

export interface AppCardProps
  extends ViewProps {
  onPress?: () => void;

  elevated?: boolean;
  padding?: number;

  accessibilityLabel?: string;
  accessibilityHint?: string;

  style?: StyleProp<ViewStyle>;
}

export default function AppCard({
  children,
  onPress,
  elevated = true,
  padding = 20,
  accessibilityLabel,
  accessibilityHint,
  style,
  ...viewProps
}: AppCardProps) {
  const baseStyle: StyleProp<ViewStyle> = [
    {
      width: '100%',

      padding,

      borderWidth: 1,
      borderColor:
        theme.border,

      borderRadius:
        borderRadius.xxl,

      backgroundColor:
        theme.card,
    },

    elevated
      ? theme.shadowCard
      : undefined,

    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          accessibilityLabel
        }
        accessibilityHint={
          accessibilityHint
        }
        onPress={onPress}
        style={({ pressed }) => [
          baseStyle,

          {
            opacity:
              pressed ? 0.88 : 1,

          borderColor:
            theme.border,

          backgroundColor:
            theme.card,
          },
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      {...viewProps}
      style={baseStyle}
    >
      {children}
    </View>
  );
}