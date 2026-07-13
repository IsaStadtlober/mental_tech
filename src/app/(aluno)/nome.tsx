import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenShell } from '../../components/ScreenShell';
import { PrimaryButton } from '../../components/PrimaryButton';
import { FormField } from '../../components/FormFields';
import {
  SimpleCenteredHeader,
  ExplorerAvatarPreview,
} from '../../components/Headers';

import { styles } from '../../styles/styles';

export default function StudentNameRoute() {
  const router = useRouter();
  const [name, setName] = useState('');

  const canContinue = name.trim().length > 0;

  const handleDone = () => {
    // Passamos o nome inserido pela URL (Params) para a próxima tela
    router.push({
      pathname: '/(aluno)/concluido',
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