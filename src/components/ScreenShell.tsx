import { ArrowLeft } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { FRAME_H, theme } from '../constants/theme';
import { styles } from '../styles';
import {
  FloatingBackButtonProps,
  FormBannerProps,
  ScreenShellProps,
} from '../types/components';
import { BackgroundScene } from './background/BackgroundScene';

// Botão flutuante de voltar compartilhado pelas telas de formulário
export function FloatingBackButton({ onPress }: FloatingBackButtonProps) {
  const insets = useSafeAreaInsets();

  if (!onPress) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.floatingBack, { top: insets.top + 12 }]}
    >
      <ArrowLeft size={18} color={theme.primary} />
      <Text style={styles.floatingBackText}>Voltar</Text>
    </TouchableOpacity>
  );
}

// Banner superior que renderiza os cenários animados em vetor (nuvens, árvores, etc)
export function FormBanner({ variant = 'clouds' }: FormBannerProps) {
  return (
    <View style={styles.formBanner}>
      <BackgroundScene variant={variant} />
    </View>
  );
}

// Shell/Casca principal que envelopa as telas de formulários e fluxos do app
export function ScreenShell({
  onBack,
  footer,
  children,
  bannerVariant = 'clouds',
  footerPadding = 112,
}: ScreenShellProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.shellRoot, { paddingTop: insets.top, paddingBottom: insets.bottom }]}> 
      <FloatingBackButton onPress={onBack} />

      <ScrollView
        style={styles.shellScroll}
        contentContainerStyle={{ minHeight: FRAME_H }}
        showsVerticalScrollIndicator={false}
      >
        <FormBanner variant={bannerVariant} />

        <View style={[styles.sheet, { paddingBottom: footerPadding + insets.bottom }]}> 
          {children}
        </View>
      </ScrollView>

      {/* Container fixo inferior para injeção de botões ou ações do rodapé */}
      {!!footer && (
        <View style={{ width: '100%', marginTop: 24 }}>
          {footer}
        </View>
      )}
    </SafeAreaView>
  );
}