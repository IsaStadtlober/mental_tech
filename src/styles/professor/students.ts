import { borderRadius, fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const studentsStyles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: theme.bgSubtle,
    },
    screenContainer: {
        width: '100%',
        maxWidth: 1180,
        alignSelf: 'center',
    },
    topBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
    },
    heroCard: {
        marginTop: 0,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    avatar: {
        width: 68,
        height: 68,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor: theme.primary,
    },
    avatarText: {
        color: theme.white,
        fontFamily: fonts.headlineBold,
        fontSize: 20,
    },
    profileText: {
        flex: 1,
        minWidth: 0,
    },
    profileName: {
        color: theme.textDark,
        fontFamily: fonts.headlineBold,
    },
    profileMeta: {
        marginTop: 4,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginTop: 20,
    },
    splitLayout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 20,
        marginTop: 20,
    },
    mainColumn: {
        flex: 1.4,
        minWidth: 0,
        gap: 20,
    },
    sideColumn: {
        flex: 1,
        minWidth: 0,
        gap: 20,
    },
    historyItem: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: theme.border,
    },
    historyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    historyTitle: {
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 14,
    },
    historyMeta: {
        marginTop: 4,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
    trailCard: {
        padding: 18,
        borderRadius: borderRadius.xl,
        backgroundColor: theme.bgSoft,
    },
    trailTitle: {
        color: theme.primary,
        fontFamily: fonts.headlineBold,
        fontSize: 28,
    },
    trailBody: {
        marginTop: 5,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 13,
        lineHeight: 20,
    },
    trailBarTrack: {
        height: 10,
        marginTop: 18,
        overflow: 'hidden',
        borderRadius: borderRadius.pill,
        backgroundColor: theme.card,
    },
    trailBarFill: {
        height: '100%',
        borderRadius: borderRadius.pill,
        backgroundColor: theme.primary,
    },
    pedagogyText: {
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
        lineHeight: 22,
    },
});