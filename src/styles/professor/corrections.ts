import { borderRadius, fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const correctionsStyles = StyleSheet.create({
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
        marginBottom: 24,
    },
    headerSection: {
        marginBottom: 20,
    },
    title: {
        color: theme.textDark,
        fontFamily: fonts.headlineBold,
    },
    titleCompact: {
        fontSize: 25,
        lineHeight: 32,
    },
    titleExpanded: {
        fontSize: 30,
        lineHeight: 38,
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
    filterChipButton: {
        minHeight: 40,
        paddingHorizontal: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: borderRadius.pill,
        backgroundColor: theme.card,
    },
    filterChipButtonActive: {
        borderColor: theme.primary,
        backgroundColor: theme.primary,
    },
    filterChipButtonPressed: {
        opacity: 0.82,
    },
    contentContainer: {
        paddingTop: 28,
        paddingBottom: 64,
    },
    countText: {
        marginTop: 24,
        marginBottom: 14,
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        fontSize: 17,
    },
    listStack: {
        gap: 14,
    },
    submissionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
    },
    avatar: {
        width: 46,
        height: 46,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: theme.bgSoft,
    },
    avatarText: {
        color: theme.primary,
        fontFamily: fonts.headlineBold,
        fontSize: 14,
    },
    avatarTextActive: {
        color: theme.warning,
        fontFamily: fonts.headlineBold,
        fontSize: 14,
    },
    avatarPrimary: {
        backgroundColor: theme.warningSoft,
    },
    avatarNeutral: {
        backgroundColor: theme.bgSoft,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
    },
    cardContentCompact: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    cardContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    submissionMeta: {
        flex: 1,
        minWidth: 0,
    },
    submissionTitle: {
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        fontSize: 16,
    },
    submissionSubtitle: {
        marginTop: 5,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 13,
    },
    chipsRow: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },
    attachmentText: {
        flexShrink: 1,
        color: theme.textFaint,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
    detailLayout: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 20,
    },
    detailLayoutCompact: {
        flexDirection: 'column',
    },
    detailMainColumn: {
        flex: 1.25,
        gap: 20,
    },
    detailMainColumnCompact: {
        width: '100%',
    },
    detailEvaluationColumn: {
        flex: 1,
    },
    detailEvaluationColumnCompact: {
        width: '100%',
    },
    attachmentPreview: {
        minHeight: 390,
        padding: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.bgSubtle,
    },
    attachmentBadge: {
        width: 76,
        height: 76,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: theme.bgSoft,
    },
    attachmentBadgeText: {
        color: theme.primary,
        fontFamily: fonts.headlineBold,
        fontSize: 18,
    },
    attachmentName: {
        marginTop: 18,
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        fontSize: 16,
        textAlign: 'center',
    },
    attachmentHint: {
        maxWidth: 460,
        marginTop: 8,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'center',
    },
    attachmentActions: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
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
    choiceRow: {
        flexDirection: 'row',
        gap: 10,
    },
    choiceRowCompact: {
        flexDirection: 'column',
    },
    choiceOption: {
        flex: 1,
        minHeight: 72,
        padding: 14,
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: borderRadius.lg,
        opacity: 1,
    },
    choiceOptionActive: {
        borderColor: theme.success,
        backgroundColor: theme.successSoft,
    },
    choiceOptionActiveRevision: {
        borderColor: theme.warning,
        backgroundColor: theme.warningSoft,
    },
    choiceOptionInactive: {
        borderColor: theme.border,
        backgroundColor: theme.card,
    },
    choiceOptionPressed: {
        opacity: 0.84,
    },
    choiceTitle: {
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        fontSize: 14,
    },
    choiceTitleActive: {
        color: theme.success,
    },
    choiceTitleActiveRevision: {
        color: theme.warning,
    },
    choiceSubtitle: {
        marginTop: 4,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
    textArea: {
        minHeight: 96,
        paddingHorizontal: 15,
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: borderRadius.lg,
        backgroundColor: theme.bgSubtle,
        color: theme.textDark,
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
    },
    textAreaInvalid: {
        borderColor: theme.danger,
    },
    textAreaWarning: {
        borderColor: theme.warning,
        backgroundColor: theme.warningSoft,
    },
    helperText: {
        marginTop: 6,
        alignSelf: 'flex-end',
        color: theme.textFaint,
        fontFamily: fonts.bodyRegular,
        fontSize: 11,
    },
    rewardCard: {
        marginTop: 20,
        padding: 15,
        borderRadius: borderRadius.lg,
        backgroundColor: theme.successSoft,
    },
    rewardTitle: {
        color: theme.success,
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    rewardValue: {
        marginTop: 5,
        color: theme.textDark,
        fontFamily: fonts.headlineSemibold,
        fontSize: 15,
    },
    rewardHint: {
        marginTop: 7,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
        lineHeight: 18,
    },
    validationHint: {
        marginTop: 16,
        padding: 13,
        borderRadius: borderRadius.lg,
        backgroundColor: theme.dangerSoft,
    },
    validationHintText: {
        color: theme.danger,
        fontFamily: fonts.bodyBold,
        fontSize: 12,
    },
    confirmButton: {
        marginTop: 22,
    },
});