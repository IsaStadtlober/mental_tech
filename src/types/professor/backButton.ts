import type { StyleProp, ViewStyle } from 'react-native';

export interface BackButtonProps {
    label: string;
    onPress: () => void;
    accessibilityHint?: string;
    style?: StyleProp<ViewStyle>;
}