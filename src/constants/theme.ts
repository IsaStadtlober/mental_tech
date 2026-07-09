// src/constants/theme.ts
import { Dimensions } from 'react-native';

export const theme = {
  bg: '#FCF6F0',
  bgSoft: '#EAF3F0',
  bgSubtle: '#F6F7F7',
  card: '#FFFFFF',
  primary: '#1E6B5C',
  primaryLight: '#2F8F76',
  primaryFaint: 'rgba(255,255,255,0.15)',
  teal: '#589B8B',
  textDark: '#173F37',
  textMuted: '#6B7A75',
  textFaint: '#8A968F',
  border: '#EFE7DC',
  disabled: '#B9C7C1',
  danger: '#E53E3E',

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

  gradPrimary: ['#2F8F76', '#1E6B5C'] as [string, string],
};

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
// Criação de containers responsivos baseados no protótipo original
export const FRAME_W = Math.min(SCREEN_W, 390);
export const FRAME_H = Math.min(SCREEN_H, 780);
export const BANNER_H = 100;

export const inputPresets = {
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

export const fonts = {
  headlineBold: 'Quicksand_700Bold',
  headlineSemibold: 'Quicksand_600SemiBold',
  headlineMedium: 'Quicksand_500Medium',
  bodyRegular: 'AtkinsonHyperlegible_400Regular',
  bodyBold: 'AtkinsonHyperlegible_700Bold',
};