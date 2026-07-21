import type { StyleProp, ViewStyle } from 'react-native';

export type StatusChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface StatusChipProps {
    label: string;
    tone?: StatusChipTone;
    dot?: boolean;
    style?: StyleProp<ViewStyle>;
}