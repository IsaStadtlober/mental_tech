import { ViewStyle } from 'react-native';

export type DriftType = 'A' | 'B' | 'swayA' | 'swayB';
export type ItemType = 'cloud' | 'tree';
export type BackgroundVariantType = 'clouds' | 'trees' | 'mixedHigh' | 'mixed';

export interface ShapeProps {
    width?: number;
    height?: number;
    color?: string;
    opacity?: number;
}

export interface BackgroundItemData {
    type: ItemType;
    style: ViewStyle;
    width: number;
    opacity: number;
    drift: DriftType;
    dur: number;
}

export interface BackgroundSceneProps {
    variant?: BackgroundVariantType;
    tintColor?: string;
    isActive?: boolean;
}