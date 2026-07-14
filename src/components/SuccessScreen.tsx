import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Text, View } from 'react-native';

import { theme } from '../constants/theme';
import { styles } from '../styles';
import { SuccessScreenProps } from '../types/components';
import { FloatingBackButton, FormBanner } from './ScreenShell';

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
        contentContainerStyle={styles.scrollContentMinHeight}
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
            <View style={[styles.successDot, styles.successDotTopRight]} />
            <View style={[styles.successDotSmall, styles.successDotSmallBottomLeft]} />
          </LinearGradient>

          <Text style={styles.eyebrow}>{eyebrow}</Text>

          <Text style={styles.successTitle}>{title}</Text>

          {!!description && (
            <Text style={styles.successDescription}>{description}</Text>
          )}

          {!!footer && <View style={styles.successFooter}>{footer}</View>}
        </View>
      </ScrollView>
    </View>
  );
}