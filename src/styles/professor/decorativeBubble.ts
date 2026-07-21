import { DECORATIVE_BUBBLE_DEFAULTS } from '@/constants/professor/decorativeBubble';
import { theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const decorativeBubbleStyles = StyleSheet.create({
    bubble: {
        position: 'absolute',
        top: DECORATIVE_BUBBLE_DEFAULTS.top,
        right: DECORATIVE_BUBBLE_DEFAULTS.right,
        width: DECORATIVE_BUBBLE_DEFAULTS.width,
        height: DECORATIVE_BUBBLE_DEFAULTS.height,
        borderRadius: DECORATIVE_BUBBLE_DEFAULTS.width / 2,
        backgroundColor: theme.primaryTint,
        opacity: 0.6,
    },
});