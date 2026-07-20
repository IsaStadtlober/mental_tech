import { StyleSheet } from 'react-native';
import { borderRadius, fonts, theme } from '@/constants/theme';

export const notificationsStyles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: theme.bgSubtle,
    },
    screenContainer: {
        width: '100%',
        maxWidth: 1120,
        alignSelf: 'center',
    },
    topHeaderRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    globalActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: 8,
    },
    headerSection: {
        marginBottom: 20,
    },
    title: {
        color: theme.textDark,
        fontFamily: fonts.headlineBold,
    },
    subtitle: {
        maxWidth: 720,
        marginTop: 6,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
        lineHeight: 21,
    },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 18,
    },
    summaryHelperText: {
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
    filterTitle: {
        marginBottom: 10,
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    filterList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    filterChip: {
        minHeight: 40,
        paddingHorizontal: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: borderRadius.pill,
        backgroundColor: theme.card,
    },
    filterChipActive: {
        borderColor: theme.primary,
        backgroundColor: theme.primary,
    },
    filterChipText: {
        color: theme.textMuted,
        fontFamily: fonts.bodyBold,
        fontSize: 12,
    },
    filterChipTextActive: {
        color: theme.white,
    },
    countText: {
        marginTop: 24,
        marginBottom: 14,
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        fontSize: 17,
    },
    listStack: {
        gap: 12,
    },
    cardItem: {
        borderWidth: 1,
    },
    cardWrapper: {
        justifyContent: 'space-between',
        gap: 18,
    },
    cardMainInfo: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 13,
    },
    iconBox: {
        width: 46,
        height: 46,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    cardTextContent: {
        flex: 1,
        minWidth: 0,
    },
    cardHeaderTags: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },
    cardTitle: {
        flexShrink: 1,
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        fontSize: 15,
        lineHeight: 21,
    },
    cardDescription: {
        marginTop: 6,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 13,
        lineHeight: 19,
    },
    cardTimestamp: {
        marginTop: 7,
        color: theme.textFaint,
        fontFamily: fonts.bodyRegular,
        fontSize: 11,
    },
    cardActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },
});