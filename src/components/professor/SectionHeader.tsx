import { fonts, theme } from '@/constants/theme';
import React, {
  type ReactNode,
} from 'react';
import {
  type StyleProp,
  Text,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;

  action?: ReactNode;

  compact?: boolean;

  style?: StyleProp<ViewStyle>;
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  action,
  compact = false,
  style,
}: SectionHeaderProps) {
  const { width } =
    useWindowDimensions();

  const stackAction =
    width < 680;

  return (
    <View
      style={[
        {
          width: '100%',

          flexDirection:
            stackAction
              ? 'column'
              : 'row',

          alignItems:
            stackAction
              ? 'stretch'
              : 'flex-start',

          justifyContent:
            'space-between',

          gap: stackAction
            ? 14
            : 18,
        },
        style,
      ]}
    >
      <View
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {!!eyebrow && (
          <Text
            style={{
              marginBottom: 6,

              color:
                theme.primaryLight,

              fontFamily:
                fonts.bodyBold,

              fontSize: 11,
              letterSpacing: 1.3,

              textTransform:
                'uppercase',
            }}
          >
            {eyebrow}
          </Text>
        )}

        <Text
          style={{
            color:
              theme.textDark,

            fontFamily:
              fonts.headlineBold,

            fontSize: compact
              ? 18
              : 24,

            lineHeight: compact
              ? 24
              : 31,

            flexShrink: 1,
          }}
        >
          {title}
        </Text>

        {!!subtitle && (
          <Text
            style={{
              width: '100%',
              maxWidth: 720,

              marginTop: 5,

              color:
                theme.textMuted,

              fontFamily:
                fonts.bodyRegular,

              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {!!action && (
        <View
          style={{
            width: stackAction
              ? '100%'
              : undefined,

            flexShrink: 0,

            alignItems:
              stackAction
                ? 'stretch'
                : 'flex-end',
          }}
        >
          {action}
        </View>
      )}
    </View>
  );
}