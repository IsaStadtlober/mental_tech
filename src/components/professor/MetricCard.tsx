import { borderRadius, fonts, theme } from '@/constants/theme';
import type {
  ReactNode,
} from 'react';
import {
  Pressable,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

export type MetricCardTone =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface MetricCardProps {
  label: string;
  value: number | string;
  helper?: string;

  tone?: MetricCardTone;
  icon?: ReactNode;

  onPress?: () => void;

  style?: StyleProp<ViewStyle>;
}

export default function MetricCard({
  label,
  value,
  helper,
  tone = 'primary',
  icon,
  onPress,
  style,
}: MetricCardProps) {
  const tones = {
    primary: {
      foreground:
        theme.primary,

      background:
        theme.primaryTint,
    },

    success: {
      foreground:
        theme.success,

      background:
        theme.successSoft,
    },

    warning: {
      foreground:
        theme.warning,

      background:
        theme.warningSoft,
    },

    danger: {
      foreground:
        theme.danger,

      background:
        theme.dangerSoft,
    },

    info: {
      foreground:
        theme.info,

      background:
        theme.infoSoft,
    },
  } as const;

  const selectedTone =
    tones[tone];

  const cardStyle:
    StyleProp<ViewStyle> = [
    {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 210,

      minWidth: 210,
      minHeight: 148,

      justifyContent:
        'space-between',

      padding: 20,

      borderWidth: 1,
      borderColor:
        theme.border,

      borderRadius:
        borderRadius.xxl,

      backgroundColor:
        theme.card,
    },

    theme.shadowCard,

    style,
  ];

  const content = (
    <>
      <View
        style={{
          flexDirection: 'row',

          alignItems:
            'flex-start',

          justifyContent:
            'space-between',

          gap: 12,
        }}
      >
        <View
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Text
            style={{
              color:
                theme.textMuted,

              fontFamily:
                fonts.bodyRegular,

              fontSize: 13,
              lineHeight: 18,
            }}
          >
            {label}
          </Text>

          <Text
            style={{
              marginTop: 9,

              color:
                theme.textDark,

              fontFamily:
                fonts.headlineBold,

              fontSize: 30,
              lineHeight: 36,
            }}
          >
            {value}
          </Text>
        </View>

        {!!icon && (
          <View
            pointerEvents="none"
            style={{
              width: 42,
              height: 42,

              flexShrink: 0,

              alignItems: 'center',
              justifyContent:
                'center',

              borderRadius: 14,

              backgroundColor:
                selectedTone
                  .background,
            }}
          >
            {icon}
          </View>
        )}
      </View>

      {!!helper && (
        <Text
          style={{
            marginTop: 10,

            color:
              selectedTone
                .foreground,

            fontFamily:
              fonts.bodyBold,

            fontSize: 12,
            lineHeight: 17,
          }}
        >
          {helper}
        </Text>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          `${label}: ${value}`
        }
        accessibilityHint={
          helper
        }
        onPress={onPress}
        style={({ pressed }) => [
          cardStyle,

          {
            opacity:
              pressed ? 0.86 : 1,
          },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={
        `${label}: ${value}`
      }
      style={cardStyle}
    >
      {content}
    </View>
  );
}