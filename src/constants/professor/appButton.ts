import type { AppButtonSize, AppButtonVariant } from '@/types/professor/appButton';

// Configurações de estilo do botão do aplicativo com base na variante.
export const APP_BUTTON_VARIANTS: Record<
    AppButtonVariant,
    { background: string; hoverBackground: string; border: string; foreground: string }
> = {
    primary: {
        background: '#1C7C54',
        hoverBackground: '#2B9668',
        border: '#1C7C54',
        foreground: '#FFFFFF',
    },
    secondary: {
        background: '#F5FAF8',
        hoverBackground: '#E8F5EE',
        border: '#DDEEE6',
        foreground: '#1C7C54',
    },
    danger: {
        background: '#D9534F',
        hoverBackground: '#C74C4A',
        border: '#D9534F',
        foreground: '#FFFFFF',
    },
    ghost: {
        background: 'transparent',
        hoverBackground: '#F5FAF8',
        border: 'transparent',
        foreground: '#1C7C54',
    },
};

export const APP_BUTTON_SIZES: Record<
    AppButtonSize,
    { minHeight: number; paddingHorizontal: number; fontSize: number; iconSize: number }
> = {
    small: {
        minHeight: 40,
        paddingHorizontal: 14,
        fontSize: 13,
        iconSize: 16,
    },
    medium: {
        minHeight: 46,
        paddingHorizontal: 17,
        fontSize: 14,
        iconSize: 18,
    },
    large: {
        minHeight: 52,
        paddingHorizontal: 21,
        fontSize: 15,
        iconSize: 19,
    },
};
