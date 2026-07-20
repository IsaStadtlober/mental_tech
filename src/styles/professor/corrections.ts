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
});