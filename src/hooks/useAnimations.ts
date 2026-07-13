import { useEffect } from 'react';
import {
  cancelAnimation,
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const EASE_SLIDE = Easing.bezier(0.22, 1, 0.36, 1);
export const EASE_POP = Easing.bezier(0.34, 1.56, 0.64, 1);
export const EASE_STANDARD = Easing.out(Easing.cubic);

export function useLoopValue(
  from: number,
  to: number,
  duration: number,
  delay: number = 0,
  isActive: boolean = true
): SharedValue<number> {
  const v = useSharedValue(from);

  useEffect(() => {
    if (!isActive) {
      cancelAnimation(v);
      v.value = from;
      return;
    }

    v.value = withDelay(
      delay,
      withRepeat(
        withTiming(to, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );

    return () => {
      cancelAnimation(v);
    };
  }, [delay, duration, from, isActive, to, v]);

  return v;
}

export function useLoopValueOnce(duration: number, delay: number = 0): SharedValue<number> {
  const v = useSharedValue(0);

  useEffect(() => {
    v.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );
  }, [delay, duration, v]);

  return v;
}

export function useFadeUp(delay: number = 0, duration: number = 420) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: EASE_STANDARD,
      })
    );

    return () => {
      cancelAnimation(t);
    };
  }, [delay, duration, t]);

  return useAnimatedStyle(() => ({
    opacity: t.value,
    transform: [{ translateY: 10 * (1 - t.value) }],
  }));
}

export function usePop(delay: number = 0) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      delay,
      withTiming(1, {
        duration: 300,
        easing: EASE_POP,
      })
    );

    return () => {
      cancelAnimation(t);
    };
  }, [delay, t]);

  return useAnimatedStyle(() => ({
    opacity: t.value,
    transform: [{ scale: t.value }],
  }));
}