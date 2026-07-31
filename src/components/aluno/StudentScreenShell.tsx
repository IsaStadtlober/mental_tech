import { ArrowLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  Text, TouchableOpacity, View
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno';
import type { BackgroundVariantType } from '../../types/backgroundScene';
import { BackgroundScene } from '../background/BackgroundScene';

export interface StudentScreenShellProps {
  children: ReactNode;
  onBack?: () => void;
  footer?: ReactNode;
  footerPadding?: number;
  bannerVariant?: BackgroundVariantType;
}
export function StudentScreenShell({
  children,
  onBack,
  footer,
  footerPadding = 12,
  bannerVariant = 'clouds',
}: StudentScreenShellProps) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={s.studentScreenRoot} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={s.studentScreenRoot}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {onBack && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            onPress={onBack}
            style={[s.studentBackButton, { top: insets.top + 8 }]}
          >
            <ArrowLeft size={18} color={theme.primary} />
            <Text style={s.studentBackText}>Voltar</Text>
          </TouchableOpacity>
        )}
        <View style={s.studentBanner}>
          <BackgroundScene variant={bannerVariant} />
        </View>
        <View style={s.studentSheet}>
          <ScrollView
            contentContainerStyle={s.studentScreenContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
          {footer && (
            <View
              style={[
                s.studentFooter,
                { paddingBottom: footerPadding + insets.bottom },
              ]}
            >
              {footer}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}