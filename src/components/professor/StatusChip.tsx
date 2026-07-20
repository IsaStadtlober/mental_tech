import { borderRadius, fonts, theme } from '@/constants/theme';
import {
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

export type StatusChipTone =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface StatusChipProps {
  label: string;
  tone?: StatusChipTone;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function StatusChip({
  label,
  tone = 'neutral',
  dot = false,
  style,
}: StatusChipProps) {
  const tones = {
    neutral: {
      background: theme.bgSubtle,
      foreground: theme.textMuted,
    },

    success: {
      background: theme.successSoft,
      foreground: theme.success,
    },

    warning: {
      background: theme.warningSoft,
      foreground: theme.warning,
    },

    danger: {
      background: theme.dangerSoft,
      foreground: theme.danger,
    },

    info: {
      background: theme.infoSoft,
      foreground: theme.info,
    },
  } as const;

  const selectedTone = tones[tone];

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Status: ${label}`}
      style={[
        {
          alignSelf: 'flex-start',

          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,

          paddingHorizontal: 10,
          paddingVertical: 6,

          borderRadius: borderRadius.pill,
          backgroundColor:
            selectedTone.background,
        },
        style,
      ]}
    >
      {dot && (
        <View
          style={{
            width: 7,
            height: 7,

            borderRadius: 4,

            backgroundColor:
              selectedTone.foreground,
          }}
        />
      )}

      <Text
        style={{
          color: selectedTone.foreground,

          fontFamily: fonts.bodyBold,
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </View>
  );
}