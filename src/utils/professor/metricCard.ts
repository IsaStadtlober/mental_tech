import { theme } from '@/constants/theme';
import type { MetricCardTone } from '@/types/professor/metricCard';

export function getMetricCardToneConfig(tone: MetricCardTone) {
    return {
        primary: {
            foreground: theme.primary,
            background: theme.primaryTint,
        },
        success: {
            foreground: theme.success,
            background: theme.successSoft,
        },
        warning: {
            foreground: theme.warning,
            background: theme.warningSoft,
        },
        danger: {
            foreground: theme.danger,
            background: theme.dangerSoft,
        },
        info: {
            foreground: theme.info,
            background: theme.infoSoft,
        },
    }[tone];
}