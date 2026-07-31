import type { ReactNode } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { alunoStyles as s } from '../../styles/aluno';

export function StudentBottomSheet({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose(): void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={s.nativeModalRoot}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar janela"
          onPress={onClose}
          style={s.nativeModalBackdrop}
        />
        <View
          style={[
            s.nativeModalSheet,
            { paddingBottom: Math.max(12, insets.bottom) },
          ]}
        >
          <View style={s.nativeModalGrabber} />
          {children}
        </View>
      </View>
    </Modal>
  );
}