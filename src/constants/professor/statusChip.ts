export const STATUS_CHIP_TONES = {
    neutral: {
        background: 'bgSubtle',
        foreground: 'textMuted',
    },
    success: {
        background: 'successSoft',
        foreground: 'success',
    },
    warning: {
        background: 'warningSoft',
        foreground: 'warning',
    },
    danger: {
        background: 'dangerSoft',
        foreground: 'danger',
    },
    info: {
        background: 'infoSoft',
        foreground: 'info',
    },
} as const;

export const STATUS_CHIP_LABELS = {
    engaged: 'Em dia',
    attention: 'Precisa de atenção',
    inactive: 'Sem atividade há +7 dias',
} as const;