// src/components/AnimatedIcons.tsx
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { useLoopValue, useLoopValueOnce } from '../hooks/useAnimations';

const AnimatedG = Animated.createAnimatedComponent(G as React.ComponentType<any>);
const AnimatedCircle = Animated.createAnimatedComponent(Circle as React.ComponentType<any>);
const AnimatedRect = Animated.createAnimatedComponent(Rect as React.ComponentType<any>);
const AnimatedPath = Animated.createAnimatedComponent(Path as React.ComponentType<any>);

interface AnimatedIconProps {
    size?: number;
    color: string;
}

/* ============================================================
   1. COMPASS PLAY (Ícone de bússola com rotação segmentada)
   ============================================================ */
export function CompassPlay({ size = 42, color }: AnimatedIconProps) {
    const t = useSharedValue(0);

    useEffect(() => {
        t.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 780, easing: Easing.inOut(Easing.ease) }),
                withTiming(2, { duration: 650, easing: Easing.inOut(Easing.ease) }),
                withTiming(3, { duration: 520, easing: Easing.inOut(Easing.ease) }),
                withTiming(4, { duration: 650, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            false
        );
    }, [t]);

    const animatedProps = useAnimatedProps(() => {
        const stops = [-18, 24, -8, 10, -18];
        const seg = Math.min(3, Math.floor(t.value));
        const frac = t.value - seg;
        const angle = stops[seg] + (stops[seg + 1] - stops[seg]) * frac;
        // CORREÇÃO: Adicionado 'px' nas unidades do transformOrigin
        const base: any = { rotation: angle, transformOrigin: '12px 12px' };
        if (Platform.OS !== 'web') base.origin = '12,12';
        return base;
    });

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" opacity={0.75} />
            <Circle cx="12" cy="12" r="3.1" stroke={color} strokeWidth="1.2" opacity={0.35} />
            <Path d="M12 4.7v1.7M12 17.6v1.7M4.7 12h1.7M17.6 12h1.7" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity={0.6} />
            {/* CORREÇÃO: Adicionado 'px' no transformOrigin do JSX */}
            <AnimatedG animatedProps={animatedProps} {...(Platform.OS !== 'web' ? { origin: '12,12' } : { transformOrigin: '12px 12px' })}>
                <Path d="M16.2 7.8L13.3 13.3L7.8 16.2L10.7 10.7L16.2 7.8Z" fill={color} />
            </AnimatedG>
            <Circle cx="12" cy="12" r="1.25" fill={color} />
        </Svg>
    );
}

/* ============================================================
   2. TROPHY PLAY (Troféu flutuante com emissão de confetes)
   ============================================================ */
interface ConfettiDotProps {
    cx: number;
    cy: number;
    color: string;
    delay: number;
}

function ConfettiDot({ cx, cy, color, delay }: ConfettiDotProps) {
    const t = useLoopValueOnce(2400, delay);
    const animatedProps = useAnimatedProps(() => {
        const p = t.value;
        const ty = -24 * p;
        const scale = 1 - 0.5 * p;

        let opacity;
        if (p < 0.7) {
            opacity = 1;
        } else {
            const f = (p - 0.7) / 0.3;
            opacity = 1 - f;
        }

        return {
            opacity,
            transform: [{ translateY: ty }, { scale }],
        };
    });
    return <AnimatedCircle cx={cx} cy={cy} r={1} fill={color} animatedProps={animatedProps} />;
}

export function TrophyPlay({ size = 42, color }: AnimatedIconProps) {
    const t = useLoopValue(0, 1, 1800, 0);
    const groupProps = useAnimatedProps(() => {
        const base: any = {
            transform: [
                { translateY: -2 * t.value },
                { rotate: `${1 * t.value}deg` },
            ],
            // CORREÇÃO: Adicionado 'px' no transformOrigin
            transformOrigin: '12px 13px',
        };
        if (Platform.OS !== 'web') base.origin = '12,13';
        return base;
    });

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            {/* CORREÇÃO: Adicionado 'px' no transformOrigin do JSX */}
            <AnimatedG animatedProps={groupProps} {...(Platform.OS !== 'web' ? { origin: '12,13' } : { transformOrigin: '12px 13px' })}>
                <Path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
                <Path d="M8 5H5.5a1 1 0 0 0-1 1.2c.35 1.7 1.5 2.8 3.5 3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
                <Path d="M16 5h2.5a1 1 0 0 1 1 1.2c-.35 1.7-1.5 2.8-3.5 3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
                <Path d="M12 13v3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
                <Path d="M9 19.5h6M9.5 16.5h5l.6 3H8.9l.6-3Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
            </AnimatedG>
            <ConfettiDot cx={5} cy={4} color={color} delay={0} />
            <ConfettiDot cx={19} cy={6} color={color} delay={400} />
            <ConfettiDot cx={6} cy={15} color={color} delay={800} />
            <ConfettiDot cx={18} cy={16} color={color} delay={1200} />
            <ConfettiDot cx={12} cy={2.5} color={color} delay={600} />
        </Svg>
    );
}

/* ============================================================
   3. GRADUATION CAP PLAY (Capelo flutuante com barras simuladas)
   ============================================================ */
interface DashboardCardProps {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    delay: number;
}

function DashboardCard({ x, y, w, h, color, delay }: DashboardCardProps) {
    const t = useLoopValue(0, 1, 1800, delay);
    const animatedProps = useAnimatedProps(() => ({
        opacity: 0.55 + 0.35 * t.value,
        transform: [{ translateY: -2 * t.value }],
    }));
    return <AnimatedRect x={x} y={y} width={w} height={h} rx={0.75} stroke={color} strokeWidth={1.2} fill="none" animatedProps={animatedProps} />;
}

export function GraduationCapPlay({ size = 42, color }: AnimatedIconProps) {
    const floatT = useLoopValue(0, 1, 1800, 0);
    const capProps = useAnimatedProps(() => ({ transform: [{ translateY: -4 * floatT.value }] }));

    const spark1 = useLoopValue(0, 1, 900, 200);
    const spark1Props = useAnimatedProps(() => ({
        opacity: 0.25 + 0.6 * spark1.value,
        transform: [{ scale: 0.8 + 0.3 * spark1.value }],
    }));
    const spark2 = useLoopValue(0, 1, 900, 700);
    const spark2Props = useAnimatedProps(() => ({
        opacity: 0.25 + 0.6 * spark2.value,
        transform: [{ scale: 0.8 + 0.3 * spark2.value }],
    }));

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            {/* CORREÇÃO: Adicionado 'px' no transformOrigin do JSX */}
            <AnimatedG animatedProps={capProps} {...(Platform.OS !== 'web' ? { origin: '12,11' } : { transformOrigin: '12px 11px' })}>
                <Path d="M3 8.5l9-4 9 4-9 4-9-4Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
                <Path d="M7 10.9v3.5c0 1.4 2.2 2.7 5 2.7s5-1.3 5-2.7v-3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M19 9.5v4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
            </AnimatedG>
            <DashboardCard x={4.5} y={20.2} w={3.5} h={2.2} color={color} delay={0} />
            <DashboardCard x={10.2} y={19.5} w={3.5} h={2.7} color={color} delay={250} />
            <DashboardCard x={15.8} y={18.8} w={3.5} h={3.3} color={color} delay={500} />
            {/* CORREÇÃO: Adicionado 'px' no transformOrigin dos círculos */}
            <AnimatedCircle cx={5.5} cy={5} r={1} fill={color} animatedProps={spark1Props} {...(Platform.OS !== 'web' ? { origin: '5.5,5' } : { transformOrigin: '5.5px 5px' })} />
            <AnimatedCircle cx={19} cy={18} r={1} fill={color} animatedProps={spark2Props} {...(Platform.OS !== 'web' ? { origin: '19,18' } : { transformOrigin: '19px 18px' })} />
        </Svg>
    );
}

/* ============================================================
   4. SPARKLES PLAY (Brilhos mágicos pulsantes com traço inferior)
   ============================================================ */
interface SparkleShapeProps {
    cx: number;
    cy: number;
    r: number;
    color: string;
    delay: number;
}

function SparkleShape({ cx, cy, r, color, delay }: SparkleShapeProps) {
    const t = useLoopValue(0, 1, 1400, delay);
    const animatedProps = useAnimatedProps(() => ({
        opacity: 0.25 + 0.6 * t.value,
        transform: [{ scale: 0.8 + 0.3 * t.value }],
    }));
    const d = `M${cx} ${cy - r} L${cx + r * 0.28} ${cy - r * 0.28} L${cx + r} ${cy} L${cx + r * 0.28} ${cy + r * 0.28} L${cx} ${cy + r} L${cx - r * 0.28} ${cy + r * 0.28} L${cx - r} ${cy} L${cx - r * 0.28} ${cy - r * 0.28} Z`;
    // CORREÇÃO: Adicionado 'px' dinamicamente no transformOrigin
    const originProp = Platform.OS !== 'web' ? { origin: `${cx}, ${cy}` } : { transformOrigin: `${cx}px ${cy}px` };
    return <AnimatedPath d={d} fill={color} animatedProps={animatedProps} {...originProp} />;
}

export function SparklesPlay({ size = 42, color }: AnimatedIconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <SparkleShape cx={12} cy={12} r={6} color={color} delay={0} />
            <SparkleShape cx={19} cy={6} r={2.6} color={color} delay={400} />
            <SparkleShape cx={5} cy={18} r={2.2} color={color} delay={800} />
            <Path d="M4 22.4c2.4-1.8 5-2.5 8-2.5s5.6.7 8 2.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity={0.45} />
        </Svg>
    );
}