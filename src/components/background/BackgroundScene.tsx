import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle } from 'react-native-reanimated';

import { ASPECT, BACKGROUND_VARIANTS } from '../../constants/backgroundScene';
import { theme } from '../../constants/theme';
import { useLoopValue } from '../../hooks/useAnimations';
import { styles } from '../../styles';
import { BackgroundItemData, BackgroundSceneProps } from '../../types/backgroundScene';
import { Cloud } from './Cloud';
import { Tree } from './Tree';

function BackgroundItem({
    item,
    color,
    progress,
}: {
    item: BackgroundItemData;
    color?: string;
    progress: { value: number };
}) {
    const h = Math.round(item.width * ASPECT[item.type]);

    const animatedStyle = useAnimatedStyle(() => {
        if (item.drift === 'A') {
            return {
                transform: [
                    { translateX: progress.value * 10 },
                    { translateY: progress.value * -4 },
                ],
            };
        }

        if (item.drift === 'B') {
            return {
                transform: [
                    { translateX: progress.value * -12 },
                    { translateY: progress.value * 5 },
                ],
            };
        }

        if (item.drift === 'swayA') {
            return {
                transformOrigin: 'bottom',
                transform: [{ rotate: `${progress.value * 3}deg` }],
            };
        }

        return {
            transformOrigin: 'bottom',
            transform: [{ rotate: `${progress.value * -3}deg` }],
        };
    });

    return (
        <Animated.View
            entering={FadeIn.duration(700)}
            style={[styles.bgItem, item.style, animatedStyle as any]}
        >
            {item.type === 'cloud' ? (
                <Cloud
                    width={item.width}
                    height={h}
                    color={color || theme.primary}
                    opacity={item.opacity}
                />
            ) : (
                <Tree
                    width={item.width}
                    height={h}
                    color={color || theme.primary}
                    opacity={item.opacity}
                />
            )}
        </Animated.View>
    );
}

export function BackgroundScene({
    variant = 'clouds',
    tintColor,
    isActive = true,
}: BackgroundSceneProps) {
    const items = BACKGROUND_VARIANTS[variant] || BACKGROUND_VARIANTS.clouds;

    const progressA = useLoopValue(0, 1, 4200, 0, isActive);
    const progressB = useLoopValue(0, 1, 5200, 300, isActive);

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {items.map((it, i) => {
                const progress = it.drift === 'A' || it.drift === 'swayA' ? progressA : progressB;

                return (
                    <BackgroundItem
                        key={`${variant}-${i}`}
                        item={it}
                        color={tintColor}
                        progress={progress}
                    />
                );
            })}
        </View>
    );
}