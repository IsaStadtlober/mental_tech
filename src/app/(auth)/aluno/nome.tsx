import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { FormField } from '../../../components/FormFields';
import {
  ExplorerAvatarPreview,
  SimpleCenteredHeader,
} from '../../../components/Headers';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ScreenShell } from '../../../components/ScreenShell';

import { styles } from '../../../styles/styles';

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
          Pronto! Vamos explorar!
        </PrimaryButton>
      }
    >
      <SimpleCenteredHeader
        title="Qual é o nome do seu explorador?"
        subtitle="Esse será o nome do seu companheiro em toda a jornada."
      />

      <ExplorerAvatarPreview />

      <View>
        <Text style={styles.manualLabel}>
          Dê um nome ao seu explorador
        </Text>

        <FormField
          value={name}
          onChangeText={setName}
          placeholder="Ex: Léo Aventureiro"
          preset="student"
        />
      </View>
    </ScreenShell>
  );
}
