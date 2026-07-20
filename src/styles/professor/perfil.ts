import { borderRadius, fonts, theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: theme.bgSubtle,
    },
    screenContainer: {
        width: '100%',
        maxWidth: 1120,
        alignSelf: 'center',
    },
    backButton: {
        marginBottom: 20,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 20,
        marginTop: 24,
    },
    contentColumn: {
        flex: 1.25,
        width: '100%',
        gap: 20,
    },
    sideColumn: {
        flex: 1,
        width: '100%',
        gap: 20,
    },
    sectionStack: {
        gap: 20,
    },
    avatar: {
        width: 82,
        height: 82,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 26,
        backgroundColor: theme.primary,
    },
    avatarText: {
        color: theme.white,
        fontFamily: fonts.headlineBold,
        fontSize: 23,
    },
    formColumn: {
        flex: 1,
        minWidth: 0,
        gap: 16,
    },
    fieldLabel: {
        marginBottom: 7,
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    input: {
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
    inputLargeText: {
        fontSize: 17,
    },
    inputError: {
        borderColor: theme.danger,
    },
    schoolCard: {
        marginTop: 18,
        padding: 14,
        borderRadius: borderRadius.lg,
        backgroundColor: theme.bgSoft,
    },
    schoolLabel: {
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
    },
    schoolValue: {
        marginTop: 3,
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 14,
    },
    messageContainer: {
        marginTop: 16,
        padding: 13,
        borderRadius: borderRadius.lg,
    },
    messageText: {
        fontFamily: fonts.bodyBold,
        fontSize: 12,
    },
    actionRow: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    passwordGroup: {
        gap: 16,
    },
    passwordRow: {
        flexDirection: 'row',
        gap: 16,
    },
    passwordColumn: {
        flex: 1,
    },
    preferenceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        paddingVertical: 15,
    },
    preferenceContent: {
        flex: 1,
        minWidth: 0,
    },
    preferenceTitle: {
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 14,
    },
    preferenceDescription: {
        marginTop: 4,
        color: theme.textMuted,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
        lineHeight: 18,
    },
    accessibilityNote: {
        marginTop: 16,
        padding: 13,
        borderRadius: borderRadius.lg,
        backgroundColor: theme.infoSoft,
    },
    accessibilityNoteText: {
        color: theme.info,
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
        lineHeight: 18,
    },
    divider: {
        height: 1,
        backgroundColor: theme.border,
    },
    passwordInputLabel: {
        marginBottom: 7,
        color: theme.textDark,
        fontFamily: fonts.bodyBold,
        fontSize: 13,
    },
    passwordInput: {
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
    passwordInputLargeText: {
        fontSize: 17,
    },
});