import { ChevronRight } from 'lucide-react-native';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { theme } from '../constants/theme';
import { styles } from '../styles';
import { PrimaryButtonProps } from '../types/components';

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

        {icon && <ChevronRight size={18} color="#fff" />}
      </TouchableOpacity>
    </Animated.View>
  );
}