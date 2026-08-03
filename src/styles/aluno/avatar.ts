import { StyleSheet } from 'react-native';
import { fonts, theme } from '../../constants/theme';

export const avatarStudentStyles = StyleSheet.create({
    avatarCompactWrap: { alignItems: 'center' },
    explorerAvatarCompact: {
        width: 42,
        height: 42,
        borderRadius: 21,
        overflow: 'hidden',
    },
    explorerAvatarCompactGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
    },
    avatarName: {
        maxWidth: 116,
        marginTop: 5,
        alignSelf: 'center',
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 999,
        overflow: 'hidden',
        backgroundColor: theme.whiteSoft,
        color: theme.primary,
        fontFamily: fonts.bodyBold,
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
        textShadowColor: theme.whiteSoft,
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    avatarCap: {
        position: 'absolute',
        top: 6,
        width: 25,
        height: 8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.studentCapGreen,
    },
});