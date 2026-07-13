import { theme } from './theme'; // Caminho atualizado

export interface InputPreset {
  py: number;
  px: number;
  fontSize: number;
  radius: number;
  labelSize: number;
  bg: string;
  activeBorder: string;
}

export const inputPresets: Record<'student' | 'educator', InputPreset> = {
  student: {
    py: 14,
    px: 20,
    fontSize: 15,
    radius: 14,
    labelSize: 13,
    bg: theme.bg,
    activeBorder: theme.primaryLight,
  },

  educator: {
    py: 12,
    px: 20,
    fontSize: 14,
    radius: 14,
    labelSize: 13,
    bg: theme.bg,
    activeBorder: theme.primaryLight,
  },
};