import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../constants/theme';
import { styles } from '../styles/styles';
import { FRAME_H } from '../constants/layout';
import {
  FloatingBackButton,
  FormBanner,
} from './ScreenShell';

interface SuccessScreenProps {
  eyebrow: string;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  onBack?: () => void;
}

export function SuccessScreen({
  eyebrow,
  title,
  description,
  footer,
  onBack,
}: SuccessScreenProps) {
  return (
    <View style={styles.shellRoot}>
      <FloatingBackButton onPress={onBack} />

      <ScrollView
        style={styles.shellScroll}
        contentContainerStyle={{ minHeight: FRAME_H }}
        showsVerticalScrollIndicator={false}
      >
        <FormBanner variant="clouds" />

        <View style={[styles.sheet, styles.successSheet]}>
          <LinearGradient
            colors={theme.gradPrimary as unknown as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.successBadge}
          >
            <Text style={styles.successEmoji}>✨</Text>
            <View style={[styles.successDot, { top: 17, right: 19 }]} />
            <View style={[styles.successDotSmall, { bottom: 19, left: 20 }]} />
          </LinearGradient>

          <Text style={styles.eyebrow}>{eyebrow}</Text>

          <Text style={styles.successTitle}>{title}</Text>

          {!!description && (
            <Text style={styles.successDescription}>{description}</Text>
          )}

          {!!footer && <View style={{ width: '100%' }}>{footer}</View>}
        </View>
      </ScrollView>
    </View>
  );
}