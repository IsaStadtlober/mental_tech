import { fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const sectionHeaderStyles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        minWidth: 0,
    },
    eyebrow: {
        marginBottom: 6,
        color: theme.primaryLight,
        fontFamily: fonts.bodyBold,
        fontSize: 11,
        letterSpacing: 1.3,
        textTransform: 'uppercase',
    },
    title: {
        color: theme.textDark,
        fontFamily: fonts.headlineBold,
        flexShrink: 1,
    },
    subtitle: {
        width: '100%',
        maxWidth: 720,
        marginTop: 5,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
        lineHeight: 20,
    },
    actionWrapper: {
        flexShrink: 0,
    },
});