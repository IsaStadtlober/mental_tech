import { borderRadius, fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const metricCardStyles = StyleSheet.create({
    card: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 210,
        minWidth: 210,
        minHeight: 148,
        justifyContent: 'space-between',
        padding: 20,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: borderRadius.xxl,
        backgroundColor: theme.card,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
    },
    content: {
        flex: 1,
        minWidth: 0,
    },
    label: {
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 13,
        lineHeight: 18,
    },
    value: {
        marginTop: 9,
        color: theme.textDark,
        fontFamily: fonts.headlineBold,
        fontSize: 30,
        lineHeight: 36,
    },
    iconWrapper: {
        width: 42,
        height: 42,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },
    helper: {
        marginTop: 10,
        fontFamily: fonts.bodyBold,
        fontSize: 12,
        lineHeight: 17,
    },
});