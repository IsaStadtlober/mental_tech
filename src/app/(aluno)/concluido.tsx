import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SuccessScreen } from '../../components/SuccessScreen';
import { PrimaryButton } from '../../components/PrimaryButton';

export default function WelcomeDoneRoute() {
  const router = useRouter();
  
  // Resgata o nome que passamos na tela anterior via parâmetro de rota
  const { explorerName } = useLocalSearchParams<{ explorerName: string }>();

  return (
    <SuccessScreen
      eyebrow="Tudo pronto"
      title={`${explorerName || 'Explorador'}, sua jornada começa agora!`}
      description="Vamos rumo à sua primeira missão."
      onBack={() => router.back()}
      footer={
        <PrimaryButton onPress={() => router.replace('/(aluno)/dashboard' as any)}>
          Acessar minha conta
        </PrimaryButton>
      }
    />
  );
}