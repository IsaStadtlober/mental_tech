import { StyleSheet } from 'react-native';
import { fonts, theme } from '../../constants/theme';

export const notificationsStudentStyles = StyleSheet.create({
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderRadius: 18,
        backgroundColor: theme.bgSubtle,
        borderWidth: 1,
        borderColor: theme.border,
        marginBottom: 12,
    },
    notificationCardRevision: {
        backgroundColor: theme.studentWarmGlow,
        borderColor: theme.studentWarmBorderSoft,
    },
    notificationCardReward: {
        backgroundColor: theme.studentPurpleLight,
        borderColor: theme.studentPurpleBorder,
    },
    notificationCardIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.bgSoft,
    },
    notificationCardIconRevision: { backgroundColor: theme.warningSoft },
    notificationCardIconReward: { backgroundColor: theme.studentPurpleSoft },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.danger,
    },
    notificationList: {
        gap: 10,
    },
    notificationEyebrow: {
        fontFamily: fonts.bodyBold,
        fontSize: 9.5,
        letterSpacing: 1,
        color: theme.primaryLight,
        marginBottom: 4,
    },
});