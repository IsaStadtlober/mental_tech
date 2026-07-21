import { STATUS_CHIP_TONES } from '@/constants/professor/statusChip';
import { theme } from '@/constants/theme';
import type { StatusChipTone } from '@/types/professor/statusChip';

export function getStatusChipToneConfig(tone: StatusChipTone) {
    const selectedTone = STATUS_CHIP_TONES[tone];
    const background = theme[selectedTone.background as keyof typeof theme];
    const foreground = theme[selectedTone.foreground as keyof typeof theme];

    return {
        background: background as string,
        foreground: foreground as string,
    };
}