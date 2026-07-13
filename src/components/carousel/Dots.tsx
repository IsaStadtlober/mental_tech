import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { styles } from '../../styles';
import { DotProps, DotsProps } from '../../types/carousel';

function Dot({ isActive, accentColor }: DotProps) {
    const scaleX = useSharedValue(1);

    useEffect(() => {
        if (isActive) {
            scaleX.value = withSequence(
                withTiming(1.25, { duration: 150, easing: Easing.out(Easing.cubic) }),
                withTiming(1, { duration: 150, easing: Easing.out(Easing.cubic) })
            );
        }
    }, [isActive, scaleX]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(isActive ? 22 : 6, {
            duration: 300,
            easing: Easing.out(Easing.cubic),
        }),
        backgroundColor: isActive ? accentColor : '#D9CFC3',
        transform: [{ scaleX: scaleX.value }],
    }));

    return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export function Dots({ count, active, accentColor }: DotsProps) {
    return (
        <View style={styles.dotsRow}>
            {Array.from({ length: count }).map((_, i) => (
                <Dot key={i} isActive={i === active} accentColor={accentColor} />
            ))}
        </View>
    );
}