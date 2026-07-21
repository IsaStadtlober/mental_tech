import type { IconButtonSize, IconButtonVariant } from '@/types/professor/iconButton';

// Configurações de estilo do botão de ícone.
export function getIconButtonSizeConfig(size: IconButtonSize) {
    return {
        small: 40,
        medium: 44,
        large: 48,
    }[size];
}

// Configurações de estilo do botão de ícone com base na variante.
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