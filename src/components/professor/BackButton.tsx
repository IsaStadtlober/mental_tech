import { theme } from '@/constants/theme';
import { backButtonStyles } from '@/styles/professor/backButton';
import type { BackButtonProps } from '@/types/professor/backButton';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';

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
        backButtonStyles.pressable,
        {
          opacity: pressed ? 0.78 : 1,
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

      <Text numberOfLines={1} style={backButtonStyles.label}>
        {label}
      </Text>
    </Pressable>
  );
}