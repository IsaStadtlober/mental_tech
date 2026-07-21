import { borderRadius, fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const backButtonStyles = StyleSheet.create({
    pressable: {
        minHeight: 44,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingLeft: 9,
        paddingRight: 13,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: borderRadius.pill,
        backgroundColor: 'transparent',
        opacity: 1,
    },
    label: {
        color: theme.primary,
        fontFamily: fonts.headlineSemibold,
        fontSize: 14,
    },
});