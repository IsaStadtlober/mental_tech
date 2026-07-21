import { borderRadius, fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const studentCardStyles = StyleSheet.create({
    pressable: {
        padding: 16,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: borderRadius.xl,
        backgroundColor: theme.card,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    contentRowCompact: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    mainInfo: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: theme.bgSoft,
    },
    avatarText: {
        color: theme.primary,
        fontFamily: fonts.headlineBold,
        fontSize: 14,
    },
    textContainer: {
        flex: 1,
        minWidth: 0,
    },
    name: {
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        fontSize: 15,
    },
    subtitle: {
        marginTop: 3,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },
    metaText: {
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
});