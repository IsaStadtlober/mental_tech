import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';

import { theme } from '../constants/theme';
import { styles } from '../styles/styles';

interface PrimaryButtonProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: boolean;
  style?: StyleProp<ViewStyle>;
  pulse?: boolean;
}

export function PrimaryButton({
  onPress,
  disabled,
  children,
  icon = true,
  style,
  pulse = false,
}: PrimaryButtonProps) {
  const t = useSharedValue(0);

  useEffect(() => {
    if (pulse) {
      t.value = withDelay(
        600,
        withRepeat(
          withTiming(1, {
            duration: 800,
            easing: Easing.inOut(Easing.ease),
          }),
          4,
          true
        )
      );
    }
  }, [pulse, t]);

  const pulseStyle = useAnimatedStyle(() => ({
    shadowOpacity: disabled ? 0 : 0.35 + 0.3 * t.value,
    shadowRadius: disabled ? 0 : 16 + 8 * t.value,
  }));

  return (
    <Animated.View
      style={[pulse ? pulseStyle : null, { width: '100%', borderRadius: 18 }]}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.85}
        style={[
          styles.primaryBtn,
          {
            backgroundColor: disabled ? theme.disabled : theme.primary,
            ...(disabled ? {} : theme.shadowBtn),
          },
          style,
        ]}
      >
        <View style={styles.btnShine} pointerEvents="none" />

        {typeof children === 'string' ? (
          <Text style={styles.primaryBtnText}>{children}</Text>
        ) : (
          children
        )}

        {icon && (
          <ChevronRight
            size={20}
            color="#fff"
            style={{ opacity: 0.85 }}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}