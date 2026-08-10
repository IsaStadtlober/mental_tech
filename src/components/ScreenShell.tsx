import { ArrowLeft } from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { theme } from "../constants/theme";
import { useFadeUp } from "../hooks/useAnimations";
import { styles } from "../styles";
import {
  FloatingBackButtonProps,
  FormBannerProps,
  ScreenShellProps,
} from "../types/components";
import { BackgroundScene } from "./background/BackgroundScene";

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
export function FormBanner({ variant = "clouds" }: FormBannerProps) {
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
  bannerVariant = "clouds",
  footerPadding = 12,
}: ScreenShellProps) {
  const insets = useSafeAreaInsets();
  const sheetEntry = useFadeUp(40, 520);

  return (
    <SafeAreaView
      style={[styles.shellRoot, { paddingTop: insets.top }]}
      edges={["top", "left", "right"]}
    >
      <FloatingBackButton onPress={onBack} />

      <KeyboardAvoidingView
        style={styles.shellRoot}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.formBanner}>
          <BackgroundScene variant={bannerVariant} />
        </View>

        <Animated.View style={[styles.sheet, sheetEntry]}>
          <ScrollView
            style={styles.shellScroll}
            contentContainerStyle={styles.shellContentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.sheetContent}>{children}</View>
          </ScrollView>

          {!!footer && (
            <View
              style={[
                styles.sheetFooter,
                { paddingBottom: footerPadding + insets.bottom },
              ]}
            >
              {footer}
            </View>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
