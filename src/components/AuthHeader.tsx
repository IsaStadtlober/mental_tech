import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import { theme, fonts } from '@/constants/theme';
import { useFadeUp } from '@/hooks/useAnimations';
import { PremiumIconBadge } from './PremiumIconBadge';

interface AuthHeaderProps {
    Icon?: LucideIcon;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    animate?: boolean;
}

export function AuthHeader({
    Icon,
    title,
    subtitle,
    align = 'left',
    animate = false,
}: AuthHeaderProps) {
    const isCenter = align === 'center';
    const headerStyle = useFadeUp(50, 450);
    const titleStyle = useFadeUp(120, 420);
    const subtitleStyle = useFadeUp(220, 420);

    return (
        <Animated.View style={[styles.authHeader, headerStyle]}>
            {!!Icon && (
                <View style={[styles.iconRow, isCenter && styles.justifyCenter]}>
                    <PremiumIconBadge Icon={Icon} animated={animate} />
                </View>
            )}
            <Animated.Text
                style={[
                    styles.authTitle,
                    isCenter ? styles.textCenter : styles.textLeft,
                    titleStyle,
                ]}
            >
                {title}
            </Animated.Text>
            {!!subtitle && (
                <Animated.Text
                    style={[
                        styles.authSubtitle,
                        isCenter ? styles.textCenter : styles.textLeft,
                        subtitleStyle,
                    ]}
                >
                    {subtitle}
                </Animated.Text>
            )}
        </Animated.View>
    );
}

interface SimpleCenteredHeaderProps {
    title: string;
    subtitle?: string;
}

export function SimpleCenteredHeader({ title, subtitle }: SimpleCenteredHeaderProps) {
    const hStyle = useFadeUp(50, 450);
    const tStyle = useFadeUp(120, 420);
    const sStyle = useFadeUp(220, 420);

    return (
        <Animated.View style={[styles.simpleHeader, hStyle]}>
            <Animated.Text style={[styles.authTitle, styles.textCenter, tStyle]}>
                {title}
            </Animated.Text>
            {!!subtitle && (
                <Animated.Text style={[styles.authSubtitle, styles.textCenter, sStyle]}>
                    {subtitle}
                </Animated.Text>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    authHeader: {
        marginBottom: 32,
        gap: 12,
    },
    simpleHeader: {
        marginBottom: 32,
        gap: 12,
    },
    iconRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    textCenter: {
        textAlign: 'center',
    },
    textLeft: {
        textAlign: 'left',
    },
    authTitle: {
        fontFamily: fonts.headlineBold,
        fontSize: 24,
        color: theme.textDark,
        lineHeight: 30,
    },
    authSubtitle: {
        fontFamily: fonts.bodyRegular,
        fontSize: 15,
        color: theme.textMuted,
        lineHeight: 22,
    },
});