import type { ReactNode } from 'react';
import type { BackgroundVariantType } from '../backgroundScene';

export type ShopTab = 'inventory' | 'shop';

export interface StudentScreenShellProps {
    children: ReactNode;
    onBack?: () => void;
    footer?: ReactNode;
    footerPadding?: number;
    bannerVariant?: BackgroundVariantType;
}

export interface StudentEmptyStateProps {
    onInventory?: () => void;
    title?: string;
    description?: string;
}

export interface MissionCardProps {
    mission: import('./mission').StudentMission;
    onPress(): void;
}