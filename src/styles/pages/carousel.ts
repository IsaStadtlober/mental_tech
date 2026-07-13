import { StyleSheet } from 'react-native';
import { fonts, spacing, theme } from '../../constants/theme';

export const carouselStyles = StyleSheet.create({
    carouselRoot: {
        flex: 1,
        backgroundColor: theme.bg
    },
    carouselTopRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg
    },
    skipText: {
        fontFamily: fonts.bodyBold,
        fontSize: 14,
        color: theme.primarySoftStrong
    },
    carouselBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xl
    },
    carouselContent: {
        alignItems: 'center'
    },
    carouselTitle: {
        fontFamily: fonts.headlineBold,
        fontSize: 24,
        lineHeight: 30,
        color: theme.textDark,
        maxWidth: 290,
        textAlign: 'center',
        marginBottom: spacing.md
    },
    carouselText: {
        fontFamily: fonts.bodyRegular,
        fontSize: 15,
        lineHeight: 22,
        color: theme.textSoft,
        maxWidth: 310,
        textAlign: 'center'
    },
    carouselFooter: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxl,
        paddingTop: spacing.md,
        alignItems: 'center',
        gap: spacing.lg
    },
});