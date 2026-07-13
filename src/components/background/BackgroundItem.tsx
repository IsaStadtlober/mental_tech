import Animated, { FadeIn, useAnimatedStyle } from 'react-native-reanimated';

import { ASPECT } from '../../constants/backgroundScene';
import { theme } from '../../constants/theme';
import { styles } from '../../styles';
import { BackgroundItemProps } from '../../types/backgroundScene';
import { Cloud } from './Cloud';
import { Tree } from './Tree';

export function BackgroundItem({ item, color, progress }: BackgroundItemProps) {
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