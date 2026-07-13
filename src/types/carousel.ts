import React from 'react';

export interface SlideData {
    Icon: React.ElementType;
    eyebrow: string;
    title: string;
    text: string;
    bg: 'mixedHigh' | 'clouds' | 'trees' | 'mixed';
    accent: readonly [string, string];
}

export interface CarouselIconCardProps {
    children: React.ReactNode;
    accent: readonly [string, string];
}

export interface DotProps {
    isActive: boolean;
    accentColor: string;
}

export interface DotsProps {
    count: number;
    active: number;
    accentColor: string;
}

export interface SlideContentProps {
    slide: SlideData;
    direction: 'next' | 'prev';
}