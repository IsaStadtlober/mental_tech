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
import { AnimStyleResult, PopStyleResult } from '../types/animations';

export const EASE_SLIDE = Easing.bezier(0.22, 1, 0.36, 1);
export const EASE_POP = Easing.bezier(0.16, 0.84, 0.22, 1);
export const EASE_STANDARD = Easing.out(Easing.cubic);

// Cria um valor numérico compartilhado que fica alternando entre 'from' e 'to' continuamente
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

// Semelhante aouseLoopValue, mas executa o loop de forma direta sem reverter o efeito
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

// Fornece um estilo animado de surgimento suave de baixo para cima (Fade-in + TranslateY)
export function useFadeUp(delay: number = 0, duration: number = 420): AnimStyleResult | any {
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

// Cria um efeito elástico de escala (Pop-in) muito usado em ícones, Badges e Avatares
export function usePop(delay: number = 0, duration: number = 450): PopStyleResult | any {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: EASE_POP,
      })
    );

    return () => {
      cancelAnimation(t);
    };
  }, [delay, duration, t]);

  return useAnimatedStyle(() => ({
    transform: [{ scale: t.value }],
  }));
}