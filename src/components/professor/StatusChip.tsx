import { statusChipStyles } from '@/styles/professor/statusChip';
import type { StatusChipProps } from '@/types/professor/statusChip';
import { getStatusChipToneConfig } from '@/utils/professor/statusChip';
import { Text, View } from 'react-native';

export default function StatusChip({
  label,
  tone = 'neutral',
  dot = false,
  style,
}: StatusChipProps) {
  const selectedTone = getStatusChipToneConfig(tone);

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Status: ${label}`}
      style={[
        statusChipStyles.container,
        { backgroundColor: selectedTone.background },
        style,
      ]}
    >
      {dot && <View style={[statusChipStyles.dot, { backgroundColor: selectedTone.foreground }]} />}

      <Text style={[statusChipStyles.label, { color: selectedTone.foreground }]}>{label}</Text>
    </View>
  );
}