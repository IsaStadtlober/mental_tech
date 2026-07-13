import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface PrimaryButtonProps {
    onPress: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    icon?: boolean;
    style?: StyleProp<ViewStyle>;
    pulse?: boolean;
}

export interface SuccessScreenProps {
    eyebrow: string;
    title: string;
    description?: string;
    footer?: React.ReactNode;
    onBack?: () => void;
}

export interface FloatingBackButtonProps {
    onPress?: () => void;
}

export interface FormBannerProps {
    variant?: 'clouds' | 'trees' | 'mixedHigh' | 'mixed';
}

export interface ScreenShellProps {
    onBack?: () => void;
    footer?: React.ReactNode;
    children: React.ReactNode;
    bannerVariant?: 'clouds' | 'trees' | 'mixedHigh' | 'mixed';
    footerPadding?: number;
}