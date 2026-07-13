import { useFonts } from 'expo-font';

import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

import {
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_700Bold,
} from '@expo-google-fonts/atkinson-hyperlegible';

/* ============================================================
   FONTES
   ============================================================ */
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

/* ============================================================
   THEME (CORES E SOMBRAS)
   ============================================================ */
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

  gradPrimary: ['#2F8F76', '#1E6B5C'],
} as const;