import React, { useState } from 'react';
import { Text } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ScreenShell } from '../../components/ScreenShell';
import { PrimaryButton } from '../../components/PrimaryButton';
import { FormField } from '../../components/FormFields';
import { AuthHeader } from '../../components/Headers';
import { styles } from '../../styles/styles';

export default function ForgotPasswordRoute() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const canSend = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSent = () => {
    router.push('/(professor)/senha-enviada');
  };

  return (
    <ScreenShell
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          disabled={!canSend}
          onPress={() => canSend && handleSent()}
        >
          Enviar link
        </PrimaryButton>
      }
    >
      <AuthHeader
        Icon={Sparkles}
        title="Recuperar senha"
        subtitle="Informe seu e-mail para receber as instruções de recuperação."
        align="center"
      />

      <FormField
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholder="seu@email.com"
        keyboardType="email-address"
        preset="educator"
      />

      <Text style={styles.recoveryHelperText}>
        Enviaremos um link para redefinir sua senha. Verifique também a caixa de spam ou lixo eletrônico.
      </Text>
    </ScreenShell>
  );
}