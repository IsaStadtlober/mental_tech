import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GraduationCap } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ScreenShell } from '../../components/ScreenShell';
import { PrimaryButton } from '../../components/PrimaryButton';
import { FormField, PasswordField } from '../../components/FormFields';
import { AuthHeader } from '../../components/Headers';
import { styles } from '../../styles/styles';

export default function EducatorLoginRoute() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canEnter = email.trim().length > 3 && password.length > 0;

  const handleEnter = () => {
    router.replace('/(professor)/bem-vindo');
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
        Icon={GraduationCap}
        title="Entrar como Educador"
        subtitle="Use o e-mail e senha da sua conta de Professor ou Escola."
        align="center"
      />

      <View style={{ gap: 16 }}>
        <FormField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          keyboardType="email-address"
          preset="educator"
        />

        <PasswordField
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
        />
      </View>

      <View style={styles.separator} />

      <View style={styles.loginLinks}>
        <TouchableOpacity 
          onPress={() => router.push('/(professor)/recuperar-senha')} 
          activeOpacity={0.75}
        >
          <Text style={styles.linkMuted}>
            Esqueci minha{' '}
            <Text style={styles.linkStrong}>senha</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.linkMuted}>
          Ainda não tem uma escola cadastrada?{' '}
          <Text 
            style={styles.linkStrong} 
            onPress={() => router.push('/(escola)/cadastro')}
          >
            Cadastre aqui
          </Text>
        </Text>
      </View>
    </ScreenShell>
  );
}