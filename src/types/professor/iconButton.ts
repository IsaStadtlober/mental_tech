import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type IconButtonVariant = 'plain' | 'soft' | 'primary' | 'danger';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps {
    icon: ReactNode;
    onPress: () => void;
    accessibilityLabel: string;
    accessibilityHint?: string;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    disabled?: boolean;
    badge?: number;
    style?: StyleProp<ViewStyle>;
}