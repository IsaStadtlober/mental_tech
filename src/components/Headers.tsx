import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useFadeUp, usePop } from '../animations/animations';
import { theme } from '../constants/theme';
import { styles } from '../styles/styles';

interface PremiumIconBadgeProps {
  Icon: React.ElementType;
  size?: number;
  iconSize?: number;
  animated?: boolean;
}

function PremiumIconBadge({
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
      <View
        style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: 3,
          top: size * 0.22,
          right: size * 0.22,
          backgroundColor: theme.primary,
          opacity: 0.35,
        }}
      />

      <View
        style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: 3,
          bottom: size * 0.23,
          left: size * 0.24,
          backgroundColor: theme.primary,
          opacity: 0.25,
        }}
      />

      <Icon size={iconSize} color={theme.primary} />
    </Animated.View>
  );
}

interface AuthHeaderProps {
  Icon: React.ElementType;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  animate?: boolean;
}

export function AuthHeader({
  Icon,
  title,
  subtitle,
  align = 'left',
  animate = false,
}: AuthHeaderProps) {
  const isCenter = align === 'center';

  const headerStyle = useFadeUp(50, 450);
  const titleStyle = useFadeUp(140, 420);
  const subtitleStyle = useFadeUp(220, 420);

  return (
    <Animated.View
      style={[
        styles.authHeader,
        isCenter ? styles.centerItems : styles.leftItems,
        headerStyle,
      ]}
    >
      <View style={{ marginBottom: 24 }}>
        <PremiumIconBadge Icon={Icon} animated={animate} />
      </View>

      <Animated.Text
        style={[
          styles.authTitle,
          isCenter ? styles.textCenter : styles.textLeft,
          titleStyle,
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
          ]}
        >
          {subtitle}
        </Animated.Text>
      )}
    </Animated.View>
  );
}

interface SimpleCenteredHeaderProps {
  title: string;
  subtitle?: string;
}

export function SimpleCenteredHeader({ title, subtitle }: SimpleCenteredHeaderProps) {
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

export function ExplorerAvatarPreview() {
  const popStyle = usePop(200);

  return (
    <Animated.View style={[styles.explorerAvatar, popStyle]}>
      <LinearGradient
        colors={theme.gradPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.explorerAvatarGradient}
      >
        <View style={[styles.heroDot, { top: 18, right: 20 }]} />
        <View style={[styles.heroDotSmall, { bottom: 20, left: 22 }]} />

        <Sparkles size={44} color={theme.bg} strokeWidth={1.8} />
      </LinearGradient>
    </Animated.View>
  );
}