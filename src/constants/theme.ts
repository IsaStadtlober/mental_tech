import { Platform } from 'react-native';

// Paleta de cores
export const Colors = {
  surface: '#ffffff',
  surfaceDim: '#e2d8d2',
  surfaceBright: '#fff8f5',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#fcf2eb',
  surfaceContainer: '#f6ece6',
  surfaceContainerHigh: '#f0e6e0',
  surfaceContainerHighest: '#eae1da',
  onSurface: '#1f1b17',
  onSurfaceVariant: '#3d4947',
  inverseSurface: '#342f2b',
  inverseOnSurface: '#f9efe8',
  outline: '#6d7a77',
  outlineVariant: '#bcc9c6',
  surfaceTint: '#006a61',
  primary: '#00685f',
  onPrimary: '#ffffff',
  primaryContainer: '#008378',
  onPrimaryContainer: '#f4fffc',
  inversePrimary: '#6bd8cb',
  secondary: '#855300',
  onSecondary: '#ffffff',
  secondaryContainer: '#fea619',
  onSecondaryContainer: '#684000',
  tertiary: '#712ae2',
  onTertiary: '#ffffff',
  tertiaryContainer: '#8a4cfc',
  onTertiaryContainer: '#fffbff',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  primaryFixed: '#89f5e7',
  primaryFixedDim: '#6bd8cb',
  onPrimaryFixed: '#00201d',
  onPrimaryFixedVariant: '#005049',
  secondaryFixed: '#ffddb8',
  secondaryFixedDim: '#ffb95f',
  onSecondaryFixed: '#2a1700',
  onSecondaryFixedVariant: '#653e00',
  tertiaryFixed: '#eaddff',
  tertiaryFixedDim: '#d2bbff',
  onTertiaryFixed: '#25005a',
  onTertiaryFixedVariant: '#5a00c6',
  background: '#fff8f5',
  onBackground: '#1f1b17',
  surfaceVariant: '#eae1da',
  appBg: '#fafaf9',
  success: '#10b981',
  uiRail: '#0f172a',
} as const;

export const Typography = {
  // Tipografia para Cabeçalhos
  headline: {
    regular: 'Quicksand_400Regular',
    medium: 'Quicksand_500Medium',
    bold: 'Quicksand_700Bold',
  },
  // Tipografia para Corpo de Texto
  body: {
    regular: 'AtkinsonHyperlegible_400Regular',
    bold: 'AtkinsonHyperlegible_700Bold',
  },

  // Tamanhos de Fonte - Quicksand (Cabeçalhos)
  headlineLg: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 30,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  headlineLgMobile: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 29,
  },
  headlineMd: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 29,
  },

  // Tamanhos de Fonte - Atkinson Hyperlegible (Corpo de Texto)
  buttonText: {
    fontFamily: 'AtkinsonHyperlegible_700Bold',
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 18,
  },
  bodyBase: {
    fontFamily: 'AtkinsonHyperlegible_400Regular',
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  labelSm: {
    fontFamily: 'AtkinsonHyperlegible_700Bold',
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 17,
  },
  microCaption: {
    fontFamily: 'AtkinsonHyperlegible_400Regular',
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 13,
  },
} as const;


// Espaçamentos
export const Spacing = {
  none: 0,
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
  containerPaddingMobile: 20,
  containerPaddingDesktop: 40,
  elementGap: 16,
  touchTargetMin: 48,
} as const;

// Arredondamentos
export const Radius = {
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// Sombras
export const Shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;