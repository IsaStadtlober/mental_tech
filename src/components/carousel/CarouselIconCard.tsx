import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { EASE_POP, useLoopValue } from '../../hooks/useAnimations';
import { styles } from '../../styles';
import { CarouselIconCardProps } from '../../types/carousel';

export function CarouselIconCard({ children, accent }: CarouselIconCardProps) {
    const pop = useSharedValue(0);

    useEffect(() => {
        pop.value = withDelay(
            40,
            withTiming(1, {
                duration: 340,
                easing: EASE_POP,
            })
        );
    }, [pop]);

    const popStyle = useAnimatedStyle(() => ({
        opacity: pop.value,
        transform: [{ scale: pop.value }],
    }));

    const halo = useLoopValue(0, 1, 1800, 0);
    const haloStyle = useAnimatedStyle(() => ({
        opacity: 0.25 + 0.4 * halo.value,
    }));

    const spark1 = useLoopValue(0, 1, 1200, 0);
    const spark1Style = useAnimatedStyle(() => ({
        opacity: 0.25 + 0.6 * spark1.value,
        transform: [{ scale: 0.8 + 0.3 * spark1.value }],
    }));

    const spark2 = useLoopValue(0, 1, 1200, 450);
    const spark2Style = useAnimatedStyle(() => ({
        opacity: 0.25 + 0.6 * spark2.value,
        transform: [{ scale: 0.8 + 0.3 * spark2.value }],
    }));

    return (
        <Animated.View style={[styles.iconCardWrap, popStyle]}>
            <LinearGradient
                colors={accent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconCard}
            >
                <Animated.View style={[styles.iconCardHaloBorder, haloStyle]} />

                <Animated.View
                    style={[
                        styles.iconCardSparkle,
                        { top: 18, right: 20, width: 8, height: 8, borderRadius: 4 },
                        spark1Style,
                    ]}
                />

                <Animated.View
                    style={[
                        styles.iconCardSparkle,
                        { bottom: 20, left: 22, width: 6, height: 6, borderRadius: 3 },
                        spark2Style,
                    ]}
                />

                {children}
            </LinearGradient>
        </Animated.View>
    );
}