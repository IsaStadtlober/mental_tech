import { theme } from '@/constants/theme';
import { appCardStyles } from '@/styles/professor/appCard';
import type { AppCardProps } from '@/types/professor/appCard';
import { Pressable, View } from 'react-native';

export default function AppCard({
  children,
  onPress,
  elevated = true,
  padding = 20,
  accessibilityLabel,
  accessibilityHint,
  style,
  ...viewProps
}: AppCardProps) {
  const baseStyle = [
    appCardStyles.container,
    {
      padding,
    },
    elevated ? theme.shadowCard : undefined,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          accessibilityLabel
        }
        accessibilityHint={
          accessibilityHint
        }
        onPress={onPress}
        style={({ pressed }) => [
          baseStyle,
          pressed ? appCardStyles.pressed : undefined,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      {...viewProps}
      style={baseStyle}
    >
      {children}
    </View>
  );
}