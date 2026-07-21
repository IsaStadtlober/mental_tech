import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

export interface AppCardProps extends ViewProps {
    onPress?: () => void;
    elevated?: boolean;
    padding?: number;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    style?: StyleProp<ViewStyle>;
}