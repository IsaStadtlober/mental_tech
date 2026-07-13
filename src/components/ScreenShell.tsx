import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

import { theme } from '../constants/theme';
import { styles } from '../styles/styles';
import { FRAME_H, BANNER_H } from '../constants/layout';
import { BackgroundScene } from './BackgroundScene';

interface FloatingBackButtonProps {
  onPress?: () => void;
}

export function FloatingBackButton({ onPress }: FloatingBackButtonProps) {
  if (!onPress) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.floatingBack}
    >
      <ArrowLeft size={18} color={theme.primary} />
      <Text style={styles.floatingBackText}>Voltar</Text>
    </TouchableOpacity>
  );
}

interface FormBannerProps {
  variant?: 'clouds' | 'trees' | 'mixedHigh' | 'mixed';
}

export function FormBanner({ variant = 'clouds' }: FormBannerProps) {
  return (
    <View style={styles.formBanner}>
      <BackgroundScene variant={variant} />
    </View>
  );
}

interface ScreenShellProps {
  onBack?: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
  bannerVariant?: 'clouds' | 'trees' | 'mixedHigh' | 'mixed';
  footerPadding?: number;
}

export function ScreenShell({
  onBack,
  footer,
  children,
  bannerVariant = 'clouds',
  footerPadding = 112,
}: ScreenShellProps) {
  return (
    <View style={styles.shellRoot}>
      <FloatingBackButton onPress={onBack} />

      <ScrollView
        style={styles.shellScroll}
        contentContainerStyle={{ minHeight: FRAME_H }}
        showsVerticalScrollIndicator={false}
      >
        <FormBanner variant={bannerVariant} />

        <View
          style={[
            styles.sheet,
            {
              minHeight: FRAME_H - BANNER_H,
              paddingBottom: footerPadding,
            },
          ]}
        >
          {children}
        </View>
      </ScrollView>

      {!!footer && <View style={styles.footerOverlay}>{footer}</View>}
    </View>
  );
}