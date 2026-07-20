import { fonts, theme } from '@/constants/theme';
import React, { type ReactNode } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import AppButton from './AppButton';

export interface EmptyStateProps {
  title: string;
  description: string;

  icon?: ReactNode;

  actionLabel?: string;
  onAction?: () => void;

  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  compact = false,
  style,
}: EmptyStateProps) {
  const hasAction = Boolean(actionLabel) && Boolean(onAction);

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`${title}. ${description}`}
      style={[
        {
          width: '100%',

          alignItems: 'center',
          justifyContent: 'center',

          paddingHorizontal: 20,
          paddingVertical: compact ? 24 : 40,
        },
        style,
      ]}>
      {!!icon && (
        <View
          pointerEvents="none"
          style={{
            width: compact ? 48 : 58,
            height: compact ? 48 : 58,

            marginBottom: 16,

            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: compact ? 15 : 18,

            backgroundColor: theme.bgSoft,
          }}>
          {icon}
        </View>
      )}

      <Text
        style={{
          color: theme.textDark,

          fontFamily: fonts.headlineSemibold,

          fontSize: compact ? 16 : 18,
          lineHeight: compact ? 22 : 25,

          textAlign: 'center',
        }}>
        {title}
      </Text>

      <Text
        style={{
          width: '100%',
          maxWidth: 440,

          marginTop: 8,

          color: theme.textMuted,

          fontFamily: fonts.bodyRegular,

          fontSize: compact ? 13 : 14,
          lineHeight: compact ? 19 : 21,

          textAlign: 'center',
        }}>
        {description}
      </Text>

      {hasAction && (
        <AppButton
          label={actionLabel ?? ''}
          onPress={onAction}
          variant="secondary"
          size={compact ? 'small' : 'medium'}
          style={{
            marginTop: 20,
          }}
        />
      )}
    </View>
  );
}