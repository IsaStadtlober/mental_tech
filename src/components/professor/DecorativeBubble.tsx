import { theme } from '@/constants/theme';
import {
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

export interface DecorativeBubbleProps {
  style?: StyleProp<ViewStyle>;
}

export default function DecorativeBubble({
  style,
}: DecorativeBubbleProps) {
  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          position: 'absolute',

          top: -70,
          right: -40,

          width: 210,
          height: 210,

          borderRadius: 105,

          backgroundColor:
            theme.primaryTint,

          opacity: 0.6,
        },
        style,
      ]}
    />
  );
}