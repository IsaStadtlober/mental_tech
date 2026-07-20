import { StyleSheet } from 'react-native';
import { borderRadius, fonts, theme } from '@/constants/theme';

export const dashboardStyles = StyleSheet.create({
    // Cabeçalho (Overview)
    overviewCard: {
        overflow: 'hidden',
    },
    overviewContent: {
        justifyContent: 'space-between',
        gap: 22,
    },
    overviewTextContainer: {
        flex: 1,
        minWidth: 0,
    },
    overviewEyebrow: {
        color: theme.primaryLight,
        fontFamily: fonts.bodyBold,
        fontSize: 11,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
    },
    overviewTitle: {
        marginTop: 8,
        color: theme.textDark,
        fontFamily: fonts.headlineBold,
    },
    overviewDescription: {
        maxWidth: 650,
        marginTop: 7,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 15,
        lineHeight: 22,
    },
    overviewActions: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },

    // Resumo das Turmas (Barras de progresso)
    classSummaryContainer: {
        gap: 18,
    },
    classSummaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    classSummaryName: {
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    classSummaryValuePrimary: {
        color: theme.primary,
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    classSummaryValueWarning: {
        color: theme.warning,
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    progressBarTrack: {
        height: 8,
        marginTop: 8,
        overflow: 'hidden',
        borderRadius: borderRadius.pill,
        backgroundColor: theme.bgSoft,
    },
    progressBarFillPrimary: {
        height: '100%',
        borderRadius: borderRadius.pill,
        backgroundColor: theme.primary,
    },
    progressBarFillWarning: {
        height: '100%',
        borderRadius: borderRadius.pill,
        backgroundColor: theme.warning,
    },

    // Últimas Entregas
    submissionsContainer: {
        gap: 4,
    },
    submissionRow: {
        justifyContent: 'space-between',
        gap: 12,
        paddingVertical: 14,
        borderTopColor: theme.border,
    },
    submissionInfo: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    submissionAvatar: {
        width: 40,
        height: 40,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        backgroundColor: theme.bgSoft,
    },
    submissionAvatarText: {
        color: theme.primary,
        fontFamily: fonts.headlineBold,
        fontSize: 13,
    },
    submissionTextContainer: {
        flex: 1,
        minWidth: 0,
    },
    submissionStudentName: {
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 14,
    },
    submissionActivityTitle: {
        marginTop: 3,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
    submissionActions: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },
});