import React, { useState } from 'react';
import { View } from 'react-native';
import { Compass } from 'lucide-react-native';
import { useRouter } from 'expo-router'; // ⬅️ 

import { ScreenShell } from '../../components/ScreenShell';
import { PrimaryButton } from '../../components/PrimaryButton';
import { FormField } from '../../components/FormFields';
import { AuthHeader } from '../../components/Headers';

export default function StudentLoginRoute() {
  const router = useRouter();
  const [classCode, setClassCode] = useState('');
  const [pin, setPin] = useState('');

  const canEnter = classCode.trim().length > 0 && pin.length === 4;

  const handleEnter = () => {
    // Quando válido, vai para a próxima tela do fluxo
    router.push('/(aluno)/nome');
  };

  return (
    <ScreenShell
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          disabled={!canEnter}
          onPress={() => canEnter && handleEnter()}
        >
          Entrar
        </PrimaryButton>
      }
    >
      <AuthHeader
        Icon={Compass}
        title="Entrar na aventura"
        subtitle="Peça o código e o PIN para sua professora."
        align="center"
      />

      <View style={{ gap: 16 }}>
        <FormField
          label="Código da Turma"
          value={classCode}
          onChangeText={(value) => setClassCode(value.toUpperCase())}
          placeholder="EX: 12AB"
          preset="student"
          center
        />

        <FormField
          label="PIN (4 números)"
          value={pin}
          onChangeText={(value) =>
            setPin(value.replace(/[^0-9]/g, '').slice(0, 4))
          }
          placeholder="****"
          preset="student"
          center
          keyboardType="numeric"
        />
      </View>
    </ScreenShell>
  );
}