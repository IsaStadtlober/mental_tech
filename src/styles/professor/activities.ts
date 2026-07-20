import { borderRadius, fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const activitiesStyles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: theme.bgSubtle,
    },
    screenContainer: {
        width: '100%',
        maxWidth: 1280,
        alignSelf: 'center',
    },
    topBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
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
    filterCard: {
        marginBottom: 20,
    },
    fieldLabel: {
        marginBottom: 8,
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    textInput: {
        minHeight: 48,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: borderRadius.lg,
        backgroundColor: theme.bgSubtle,
        color: theme.textDark,
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
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
    activityList: {
        gap: 14,
    },
    activityCard: {
        gap: 18,
    },
    activityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },
    activityTitle: {
        flexShrink: 1,
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        fontSize: 17,
        lineHeight: 23,
    },
    activityMeta: {
        marginTop: 8,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 13,
        lineHeight: 19,
    },
    statusRow: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },
    deleteCard: {
        marginTop: 20,
        borderColor: theme.danger,
        backgroundColor: theme.dangerSoft,
    },
    deleteContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
    },
    deleteTitle: {
        color: theme.danger,
        fontFamily: fonts.headlineSemibold,
        fontSize: 16,
    },
    deleteDescription: {
        marginTop: 5,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 13,
        lineHeight: 19,
    },
    deleteActions: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },
    detailCard: {
        gap: 20,
    },
    detailHero: {
        gap: 20,
    },
    detailHeroContent: {
        flex: 1,
        minWidth: 0,
    },
    detailTitle: {
        marginTop: 13,
        color: theme.textDark,
        fontFamily: fonts.headlineBold,
    },
    detailSubtitle: {
        marginTop: 7,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
        lineHeight: 21,
    },
    metricsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginTop: 20,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 20,
        marginTop: 20,
    },
    contentColumn: {
        flex: 1.4,
        gap: 20,
    },
    detailSection: {
        marginBottom: 16,
    },
    attachmentCard: {
        minHeight: 190,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.xl,
        backgroundColor: theme.bgSubtle,
    },
    attachmentName: {
        color: theme.primary,
        fontFamily: fonts.headlineSemibold,
        fontSize: 16,
        textAlign: 'center',
    },
    attachmentType: {
        marginTop: 6,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 13,
    },
    attachmentActions: {
        width: '100%',
        alignItems: 'center',
        marginTop: 18,
    },
    downloadFeedback: {
        marginTop: 14,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: borderRadius.lg,
        backgroundColor: theme.successSoft,
    },
    downloadFeedbackText: {
        color: theme.success,
        fontFamily: fonts.bodyBold,
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
    },
    configurationCard: {
        flex: 1,
    },
    configurationList: {
        gap: 16,
    },
    configurationLabel: {
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
    configurationValue: {
        marginTop: 3,
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 14,
    },
    configurationButton: {
        marginTop: 22,
    },
    contentText: {
        color: theme.textDark,
        fontFamily: fonts.bodyRegular,
        fontSize: 15,
        lineHeight: 23,
    },
});