import { borderRadius, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const appCardStyles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: borderRadius.xxl,
        backgroundColor: theme.card,
    },
    pressed: {
        opacity: 0.88,
        borderColor: theme.border,
        backgroundColor: theme.card,
    },
});