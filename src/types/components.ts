import React from 'react';
import { KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle } from 'react-native';

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

export interface FormFieldProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    preset?: 'educator' | 'student';
    center?: boolean;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    maxLength?: number;
    editable?: boolean;
    error?: boolean;
}

export interface PasswordFieldProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: boolean;
}

export interface PremiumIconBadgeProps {
    Icon: React.ElementType;
    size?: number;
    iconSize?: number;
    animated?: boolean;
}

export interface AuthHeaderProps {
    Icon?: React.ElementType;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
}

export interface SimpleCenteredHeaderProps {
    title: string;
    subtitle?: string;
}

export type RoleType = 'student' | 'educator';
export type ChosenRole = 'aluno' | 'educador' | null;

export interface RoleMiniIconProps {
    type: RoleType;
    active: boolean;
}

export interface RoleChoiceCardProps {
    type: RoleType;
    active: boolean;
    title: string;
    description: string;
    onPress: () => void;
    delay?: number;
}

export interface OptionButtonProps {
    children: React.ReactNode;
    onPress: () => void;
}