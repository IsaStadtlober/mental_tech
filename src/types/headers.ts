import React from 'react';
import { TextStyle } from 'react-native';

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