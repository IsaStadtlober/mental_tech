import { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { theme } from '../../constants/theme';
import { EASE_STANDARD } from '../../hooks/useAnimations';
import { styles } from '../../styles';
import { SlideContentProps } from '../../types/carousel';
import { CarouselIconCard } from './CarouselIconCard';

export function SlideContent({ slide, direction }: SlideContentProps) {
    const Icon = slide.Icon;

    const enter = useSharedValue(direction === 'next' ? 6 : -6);
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.99);

    const t1 = useSharedValue(0);
    const t2 = useSharedValue(0);
    const t3 = useSharedValue(0);

    useEffect(() => {
        enter.value = direction === 'next' ? 6 : -6;
        opacity.value = 0;
        scale.value = 0.99;
        t1.value = 0;
        t2.value = 0;
        t3.value = 0;

        enter.value = withTiming(0, { duration: 360, easing: Easing.out(Easing.cubic) });
        opacity.value = withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) });
        scale.value = withTiming(1, { duration: 360, easing: Easing.out(Easing.cubic) });

        t1.value = withDelay(200, withTiming(1, { duration: 640, easing: EASE_STANDARD }));
        t2.value = withDelay(360, withTiming(1, { duration: 700, easing: EASE_STANDARD }));
        t3.value = withDelay(540, withTiming(1, { duration: 760, easing: EASE_STANDARD }));
    }, [slide, direction, enter, opacity, scale, t1, t2, t3]);

    const animatedContainer = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateX: enter.value }, { scale: scale.value }],
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
            <CarouselIconCard accent={slide.accent}>
                <Icon size={44} color={theme.bg} />
            </CarouselIconCard>

            <Animated.Text style={[styles.eyebrow, eyebrowStyle]}>{slide.eyebrow}</Animated.Text>
            <Animated.Text style={[styles.carouselTitle, titleStyle]}>{slide.title}</Animated.Text>
            <Animated.Text style={[styles.carouselText, textStyle]}>{slide.text}</Animated.Text>
        </Animated.View>
    );
}