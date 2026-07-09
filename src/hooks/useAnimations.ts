// src/hooks/useAnimations.ts
import { useEffect } from 'react';
import { Easing, useSharedValue, withDelay, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated';

/* ============================================================
   CURVAS DE EASING FIÉIS AO DESIGN ORIGINAL
   ============================================================ */
// slideInFromRight / slideInFromLeft -> cubic-bezier(0.22, 1, 0.36, 1)
export const EASE_SLIDE = Easing.bezier(0.22, 1, 0.36, 1);
// popIn -> cubic-bezier(0.34, 1.56, 0.64, 1) (com overshoot elástico)
export const EASE_POP = Easing.bezier(0.34, 1.56, 0.64, 1);
// fadeUp -> "ease" padrão do CSS
export const EASE_STANDARD = Easing.out(Easing.cubic);

/**
 * Hook para animações em loop contínuo de ida e volta (reverse).
 * Ideal para efeitos de flutuação e oscilação leve (sway).
 */
export function useLoopValue(from: number, to: number, duration: number, delay = 0) {
    const v = useSharedValue(from);
    useEffect(() => {
        v.value = withDelay(
            delay,
            withRepeat(withTiming(to, { duration, easing: Easing.inOut(Easing.ease) }), -1, true)
        );
    }, [delay, duration, to, v]);
    return v;
}

/**
 * Hook para animações em loop contínuo direto que vai de 0 a 1 e reinicia do zero.
 * Muito utilizado para o efeito cascata de confetes e brilhos ativos.
 */
export function useLoopValueOnce(duration: number, delay = 0) {
    const v = useSharedValue(0);
    useEffect(() => {
        v.value = withDelay(
            delay,
            withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, false)
        );
    }, [delay, duration, v]);
    return v;
}

/**
 * Hook utilitário que gera um estilo animado para Fade-In gradual
 * combinado com um leve deslocamento ascendente no eixo Y.
 */
export function useFadeUp(delay = 0, duration = 420) {
    const t = useSharedValue(0);

    useEffect(() => {
        t.value = withDelay(
            delay,
            withTiming(1, {
                duration,
                easing: EASE_STANDARD,
            })
        );
    }, [delay, duration, t]);

    return useAnimatedStyle(() => ({
        opacity: t.value,
        transform: [{ translateY: 10 * (1 - t.value) }],
    }));
}

/**
 * Hook utilitário que gera um estilo animado para um Pop-In elástico
 * utilizando alteração de escala (scale) a partir do centro.
 */
export function usePop(delay = 0) {
    const t = useSharedValue(0);

    useEffect(() => {
        t.value = withDelay(
            delay,
            withTiming(1, {
                duration: 300,
                easing: EASE_POP,
            })
        );
    }, [delay, t]);

    return useAnimatedStyle(() => ({
        opacity: t.value,
        transform: [{ scale: t.value }],
    }));
}