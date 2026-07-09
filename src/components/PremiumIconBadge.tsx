import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { usePop } from '@/hooks/useAnimations';

interface PremiumIconBadgeProps {
    Icon: LucideIcon;
    size?: number;
    iconSize?: number;
    animated?: boolean;
}

export function PremiumIconBadge({
    Icon,
    size = 74,
    iconSize = 30,
    animated = false,
}: PremiumIconBadgeProps) {
    const popStyle = usePop(0);

    return (
        <Animated.View
            style={[
                styles.badge,
                {
                    width: size,
                    height: size,
                    borderRadius: Math.round(size * 0.32),
                },
                animated ? popStyle : null,
            ]}
        >
            <View style={[styles.dot, { top: size * 0.22, right: size * 0.22, opacity: 0.35 }]} />
            <View style={[styles.dot, { bottom: size * 0.23, left: size * 0.24, opacity: 0.25 }]} />

            <Icon size={iconSize} color={theme.primary} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: theme.bgSoft,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadowCard,
    },
    dot: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.primary,
    },
});