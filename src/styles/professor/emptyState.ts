import { fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const emptyStateStyles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: theme.bgSoft,
    },
    title: {
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        textAlign: 'center',
    },
    description: {
        width: '100%',
        maxWidth: 440,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        textAlign: 'center',
    },
    action: {
        marginTop: 20,
    },
});