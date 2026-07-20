import { borderRadius, fonts, theme } from '@/constants/theme';
import React from 'react';
import {
  Pressable,
  type StyleProp,
  Text,
  type ViewStyle,
} from 'react-native';
import {
  ChevronLeft,
} from 'lucide-react-native';

export interface BackButtonProps {
  label: string;

  onPress: () => void;

  accessibilityHint?: string;

  style?: StyleProp<ViewStyle>;
}

export default function BackButton({
  label,
  onPress,
  accessibilityHint,
  style,
}: BackButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Voltar para ${label}`}
      accessibilityHint={
        accessibilityHint
      }
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: 44,

          alignSelf: 'flex-start',

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

          gap: 6,

          paddingLeft: 9,
          paddingRight: 13,

          borderWidth: 1,
          borderColor: 'transparent',

          borderRadius:
            borderRadius.pill,

          backgroundColor: 'transparent',

          opacity:
            pressed ? 0.78 : 1,
        },
        style,
      ]}
    >
      <ChevronLeft
        size={19}
        strokeWidth={2.4}
        color={
          theme.primary
        }
      />

      <Text
        numberOfLines={1}
        style={{
          color:
            theme.primary,

          fontFamily:
            fonts.headlineSemibold,

          fontSize: 14,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}