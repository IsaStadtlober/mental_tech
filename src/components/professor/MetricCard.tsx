import { theme } from '@/constants/theme';
import { metricCardStyles } from '@/styles/professor/metricCard';
import type { MetricCardProps } from '@/types/professor/metricCard';
import { getMetricCardToneConfig } from '@/utils/professor/metricCard';
import { Pressable, Text, View } from 'react-native';

export default function MetricCard({
  label,
  value,
  helper,
  tone = 'primary',
  icon,
  onPress,
  style,
}: MetricCardProps) {
  const selectedTone = getMetricCardToneConfig(tone);

  const cardStyle = [
    metricCardStyles.card,
    theme.shadowCard,
    style,
  ];

  const content = (
    <>
      <View style={metricCardStyles.header}>
        <View style={metricCardStyles.content}>
          <Text style={metricCardStyles.label}>{label}</Text>
          <Text style={metricCardStyles.value}>{value}</Text>
        </View>

        {!!icon && (
          <View
            pointerEvents="none"
            style={[
              metricCardStyles.iconWrapper,
              { backgroundColor: selectedTone.background },
            ]}
          >
            {icon}
          </View>
        )}
      </View>

      {!!helper && (
        <Text style={[metricCardStyles.helper, { color: selectedTone.foreground }]}>
          {helper}
        </Text>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value}`}
        accessibilityHint={helper}
        onPress={onPress}
        style={({ pressed }) => [cardStyle, { opacity: pressed ? 0.86 : 1 }]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View accessibilityRole="text" accessibilityLabel={`${label}: ${value}`} style={cardStyle}>
      {content}
    </View>
  );
}
