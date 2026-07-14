import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { theme } from '../../constants/theme';
import { EASE_STANDARD, useLoopValue } from '../../hooks/useAnimations';
import { styles } from '../../styles';
import { SlideContentProps } from '../../types/carousel';

export function SlideContent({ slide, direction }: SlideContentProps) {
    const Icon = slide.Icon;

    const enter = useSharedValue(direction === 'next' ? 6 : -6);
    const opacity = useSharedValue(0);
    const pop = useSharedValue(0);

    const t1 = useSharedValue(0);
    const t2 = useSharedValue(0);
    const t3 = useSharedValue(0);

    useEffect(() => {
        enter.value = direction === 'next' ? 8 : -8;
        opacity.value = 0;
        pop.value = 0;
        t1.value = 0;
        t2.value = 0;
        t3.value = 0;

        enter.value = withTiming(0, { duration: 520, easing: Easing.out(Easing.cubic) });
        opacity.value = withTiming(1, { duration: 720, easing: Easing.out(Easing.cubic) });
        pop.value = withDelay(80, withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) }));

        t1.value = withDelay(240, withTiming(1, { duration: 720, easing: EASE_STANDARD }));
        t2.value = withDelay(360, withTiming(1, { duration: 780, easing: EASE_STANDARD }));
        t3.value = withDelay(500, withTiming(1, { duration: 840, easing: EASE_STANDARD }));
    }, [slide, direction, enter, opacity, pop, t1, t2, t3]);

    const animatedContainer = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateX: enter.value }],
    }));

    const popStyle = useAnimatedStyle(() => ({
        opacity: pop.value,
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

    const eyebrowStyle = useAnimatedStyle(() => ({
        opacity: t1.value,
        transform: [{ translateY: 6 * (1 - t1.value) }],
    }));

    const titleStyle = useAnimatedStyle(() => ({
        opacity: t2.value,
        transform: [{ translateY: 6 * (1 - t2.value) }],
    }));

    const textStyle = useAnimatedStyle(() => ({
        opacity: t3.value,
        transform: [{ translateY: 6 * (1 - t3.value) }],
    }));

    return (
        <Animated.View style={[styles.carouselContent, animatedContainer]}>
            <Animated.View style={[styles.iconCardWrap, popStyle]}>
                <LinearGradient
                    colors={slide.accent}
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

                    <Icon size={44} color={theme.bg} />
                </LinearGradient>
            </Animated.View>

            <Animated.Text style={[styles.eyebrow, eyebrowStyle]}>{slide.eyebrow}</Animated.Text>
            <Animated.Text style={[styles.carouselTitle, titleStyle]}>{slide.title}</Animated.Text>
            <Animated.Text style={[styles.carouselText, textStyle]}>{slide.text}</Animated.Text>
        </Animated.View>
    );
}