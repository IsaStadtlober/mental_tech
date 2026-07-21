import { borderRadius, fonts } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const statusChipStyles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: borderRadius.pill,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    label: {
        fontFamily: fonts.bodyBold,
        fontSize: 12,
    },
});