import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type AppButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type AppButtonSize = 'small' | 'medium' | 'large';

export interface AppButtonProps {
    label: string;
    onPress?: () => void;
    variant?: AppButtonVariant;
    size?: AppButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    style?: StyleProp<ViewStyle>;
}