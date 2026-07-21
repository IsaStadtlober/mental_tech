import { emptyStateStyles } from '@/styles/professor/emptyState';
import type { EmptyStateProps } from '@/types/professor/emptyState';
import { getEmptyStateLayout } from '@/utils/professor/emptyState';
import { Text, View } from 'react-native';
import AppButton from './AppButton';

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
  const layout = getEmptyStateLayout(compact);

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`${title}. ${description}`}
      style={[
        emptyStateStyles.container,
        {
          paddingVertical: layout.paddingVertical,
        },
        style,
      ]}
    >
      {!!icon && (
        <View
          pointerEvents="none"
          style={[
            emptyStateStyles.iconWrapper,
            {
              width: layout.iconSize,
              height: layout.iconSize,
              marginBottom: 16,
              borderRadius: compact ? 15 : 18,
            },
          ]}
        >
          {icon}
        </View>
      )}

      <Text
        style={[
          emptyStateStyles.title,
          {
            fontSize: layout.titleFontSize,
            lineHeight: layout.titleLineHeight,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          emptyStateStyles.description,
          {
            marginTop: 8,
            fontSize: layout.descriptionFontSize,
            lineHeight: layout.descriptionLineHeight,
          },
        ]}
      >
        {description}
      </Text>

      {hasAction && (
        <AppButton
          label={actionLabel ?? ''}
          onPress={onAction}
          variant="secondary"
          size={compact ? 'small' : 'medium'}
          style={emptyStateStyles.action}
        />
      )}
    </View>
  );
}