import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface EmptyStateProps {
    title: string;
    description: string;
    icon?: ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    compact?: boolean;
    style?: StyleProp<ViewStyle>;
}