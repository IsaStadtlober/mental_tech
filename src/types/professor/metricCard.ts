import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type MetricCardTone = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface MetricCardProps {
    label: string;
    value: number | string;
    helper?: string;
    tone?: MetricCardTone;
    icon?: ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}