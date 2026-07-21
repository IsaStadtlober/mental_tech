import { borderRadius, fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const appButtonStyles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderRadius: borderRadius.lg,
        opacity: 1,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontFamily: fonts.headlineSemibold,
        textAlign: 'center',
    },
    loadingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export function getAppButtonStyleConfig(variant: 'primary' | 'secondary' | 'danger' | 'ghost', size: 'small' | 'medium' | 'large') {
    return {
        primary: {
            background: theme.primary,
            hoverBackground: theme.primaryLight,
            border: theme.primary,
            foreground: theme.white,
        },
        secondary: {
            background: theme.bgSoft,
            hoverBackground: theme.primaryTint,
            border: theme.primaryTint,
            foreground: theme.primary,
        },
        danger: {
            background: theme.danger,
            hoverBackground: theme.dangerHover,
            border: theme.danger,
            foreground: theme.white,
        },
        ghost: {
            background: 'transparent',
            hoverBackground: theme.bgSoft,
            border: 'transparent',
            foreground: theme.primary,
        },
    }[variant];
}