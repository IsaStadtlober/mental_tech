import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { theme } from '../constants/theme';
import { useFadeUp, usePop } from '../hooks/useAnimations';
import { styles } from '../styles';
import {
  AuthHeaderProps,
  PremiumIconBadgeProps,
  SimpleCenteredHeaderProps,
} from '../types/components';

// Subcomponente interno/compartilhado para os Badges de Ícone
export function PremiumIconBadge({
  Icon,
  size = 74,
  iconSize = 30,
  animated = false,
}: PremiumIconBadgeProps) {
  const popStyle = usePop(0);

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.32),
          backgroundColor: theme.bgSoft,
          alignItems: 'center',
          justifyContent: 'center',
          ...theme.shadowCard,
        },
        animated ? popStyle : null,
      ]}
    >
      <Icon size={iconSize} color={theme.primary} />
    </Animated.View>
  );
}

// Cabeçalho de Autenticação Principal (Usado em login, cadastro, etc.)
export function AuthHeader({
  Icon,
  title,
  subtitle,
  align = 'center',
  titleStyle,
  subtitleStyle,
}: AuthHeaderProps) {
  const isCenter = align === 'center';
  const headerFade = useFadeUp(0, 400);
  const titleFade = useFadeUp(100, 400);
  const subtitleFade = useFadeUp(200, 400);

  return (
    <Animated.View
      style={[
        styles.authHeader,
        headerFade,
        { alignItems: isCenter ? 'center' : 'flex-start' }
      ]}
    >
      {!!Icon && <PremiumIconBadge Icon={Icon} animated />}

      <Animated.Text
        style={[
          styles.authTitle,
          isCenter ? styles.textCenter : styles.textLeft,
          Icon ? styles.headerTitleSpacing : null,
          titleStyle,
          titleFade,
        ]}
      >
        {title}
      </Animated.Text>

      {!!subtitle && (
        <Animated.Text
          style={[
            styles.authSubtitle,
            isCenter ? styles.textCenter : styles.textLeft,
            subtitleStyle,
            subtitleFade,
          ]}
        >
          {subtitle}
        </Animated.Text>
      )}
    </Animated.View>
  );
}

// Cabeçalho Simples e Centralizado (Usado no fluxo do Aluno)
export function SimpleCenteredHeader({
  title,
  subtitle
}: SimpleCenteredHeaderProps) {
  const hStyle = useFadeUp(50, 450);
  const tStyle = useFadeUp(120, 420);
  const sStyle = useFadeUp(220, 420);

  return (
    <Animated.View style={[styles.simpleHeader, hStyle]}>
      <Animated.Text style={[styles.authTitle, styles.textCenter, tStyle]}>
        {title}
      </Animated.Text>

      {!!subtitle && (
        <Animated.Text style={[styles.authSubtitle, styles.textCenter, sStyle]}>
          {subtitle}
        </Animated.Text>
      )}
    </Animated.View>
  );
}

// Preview do Avatar do Explorador
export function ExplorerAvatarPreview() {
  const popStyle = usePop(200);

  return (
    <Animated.View style={[styles.explorerAvatar, popStyle]}>
      <LinearGradient
        colors={theme.gradPrimary || ['#1E6B5C', '#2F8F76']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.explorerAvatarGradient}
      />
    </Animated.View>
  );
}