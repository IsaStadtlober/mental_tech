import { useFonts } from 'expo-font';
import { Dimensions } from 'react-native';

// FONTES
import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

import {
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_700Bold,
} from '@expo-google-fonts/atkinson-hyperlegible';

export function useAppFonts(): boolean {
  const [fontsLoaded] = useFonts({
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_700Bold,
  });

  return fontsLoaded;
}

export const fonts = {
  headlineBold: 'Quicksand_700Bold',
  headlineSemibold: 'Quicksand_600SemiBold',
  headlineMedium: 'Quicksand_500Medium',
  bodyRegular: 'AtkinsonHyperlegible_400Regular',
  bodyBold: 'AtkinsonHyperlegible_700Bold',
} as const;

// PALETA DE CORES
export const theme = {
  bg: '#FCF6F0',
  bgSoft: '#EAF3F0',
  bgSubtle: '#F6F7F7',
  card: '#FFFFFF',
  primary: '#1E6B5C',
  primaryLight: '#2F8F76',
  primaryFaint: 'rgba(255,255,255,0.15)',
  primarySoft: 'rgba(30,107,92,0.60)',
  primarySoftStrong: 'rgba(30,107,92,0.45)',
  primarySoftMedium: 'rgba(30,107,92,0.35)',
  primaryTint: 'rgba(47,143,118,0.18)',
  teal: '#589B8B',
  tealDeep: '#00685F',
  textDark: '#173F37',
  textMuted: '#6B7A75',
  textFaint: '#8A968F',
  textSoft: '#4A5A55',
  border: '#EFE7DC',
  disabled: '#B9C7C1',
  danger: '#E53E3E',
  dangerSoft: 'rgba(229,62,62,0.08)',
  white: '#FFFFFF',
  whiteSoft: 'rgba(255,255,255,0.86)',
  whiteSubtle: 'rgba(255,255,255,0.96)',
  whiteFaint: 'rgba(255,255,255,0.12)',
  whiteBorder: 'rgba(255,255,255,0.35)',
  shellBg: '#F0EAE1',
  frameBorder: '#17171A',

  shadowCard: {
    shadowColor: 'rgba(23,63,55,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  shadowBtn: {
    shadowColor: 'rgba(30,107,92,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  shadowSheet: {
    shadowColor: 'rgba(23,63,55,1)',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 12,
  },

  gradPrimary: ['#2F8F76', '#1E6B5C'],
} as const;

// ESPAÇAMENTO
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
} as const;

// BORDAS
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  xxxl: 32,
  button: 18,
  panel: 20,
  card: 33,
  avatar: 30,
  frame: 40,
  pill: 999,
} as const;

// LAYOUT E DIMENSÕES
export const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
export const FRAME_W: number = Math.min(SCREEN_W, 390);
export const FRAME_H: number = Math.min(SCREEN_H, 780);
export const BANNER_H: number = 100;

// PRESETS DE INPUT
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