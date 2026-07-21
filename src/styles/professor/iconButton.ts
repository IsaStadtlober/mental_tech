import { borderRadius, fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const iconButtonStyles = StyleSheet.create({
    pressable: {
        position: 'relative',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: borderRadius.pill,
    },
    badgeContainer: {
        position: 'absolute',
        top: -4,
        right: -4,
        minWidth: 19,
        height: 19,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: theme.card,
        borderRadius: borderRadius.pill,
        backgroundColor: theme.danger,
    },
    badgeText: {
        color: theme.white,
        fontFamily: fonts.bodyBold,
        fontSize: 9,
        lineHeight: 11,
    },
});