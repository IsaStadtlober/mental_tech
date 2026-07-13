import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { FormField } from '../../../components/form/FormField';
import {
  ExplorerAvatarPreview,
  SimpleCenteredHeader,
} from '../../../components/Headers';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ScreenShell } from '../../../components/ScreenShell';

import { STUDENT_AUTH_CONSTANTS } from '../../../constants/auth';
import { styles } from '../../../styles';

export default function StudentNameRoute() {
  const router = useRouter();
  const [name, setName] = useState('');

  const canContinue = name.trim().length > 0;

  const handleDone = () => {
    router.push({
      pathname: '/aluno/concluido',
      params: { explorerName: name.trim() },
    });
  };

  return (
    <ScreenShell
      onBack={() => router.back()}
      footerPadding={128}
      footer={
        <PrimaryButton
          disabled={!canContinue}
          onPress={() => canContinue && handleDone()}
        >
          {STUDENT_AUTH_CONSTANTS.TEXTS.BUTTON_CONTINUE}
        </PrimaryButton>
      }
    >
      <SimpleCenteredHeader
        title={STUDENT_AUTH_CONSTANTS.TEXTS.NAME_TITLE}
        subtitle={STUDENT_AUTH_CONSTANTS.TEXTS.NAME_SUBTITLE}
      />

      <ExplorerAvatarPreview />

      <View>
        <Text style={styles.manualLabel}>
          {STUDENT_AUTH_CONSTANTS.LABELS.EXPLORER_NAME}
        </Text>

        <FormField
          value={name}
          onChangeText={setName}
          placeholder={STUDENT_AUTH_CONSTANTS.PLACEHOLDERS.EXPLORER_NAME}
          preset="student"
        />
      </View>
    </ScreenShell>
  );
}