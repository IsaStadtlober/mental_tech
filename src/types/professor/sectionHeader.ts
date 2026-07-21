import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    eyebrow?: string;
    action?: ReactNode;
    compact?: boolean;
    style?: StyleProp<ViewStyle>;
}