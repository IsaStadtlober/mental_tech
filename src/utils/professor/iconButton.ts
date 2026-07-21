import type { IconButtonSize, IconButtonVariant } from '@/types/professor/iconButton';

export function getIconButtonSizeConfig(size: IconButtonSize) {
    return {
        small: 40,
        medium: 44,
        large: 48,
    }[size];
}

export function getIconButtonVariantConfig(variant: IconButtonVariant) {
    return {
        plain: {
            background: 'transparent',
            border: 'transparent',
        },
        soft: {
            background: '#EAF3F0',
            border: '#EFE7DC',
        },
        primary: {
            background: '#1E6B5C',
            border: '#1E6B5C',
        },
        danger: {
            background: '#FAD8D8',
            border: '#FAD8D8',
        },
    }[variant];
}