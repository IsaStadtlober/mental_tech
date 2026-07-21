import { decorativeBubbleStyles } from '@/styles/professor/decorativeBubble';
import type { DecorativeBubbleProps } from '@/types/professor/decorativeBubble';
import { View } from 'react-native';

export default function DecorativeBubble({ style }: DecorativeBubbleProps) {
  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[decorativeBubbleStyles.bubble, style]}
    />
  );
}