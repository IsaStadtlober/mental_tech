import { useRouter } from 'expo-router';
import { GraduationCap } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { FormField, PasswordField } from '../../../components/FormFields';
import { AuthHeader } from '../../../components/Headers';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ScreenShell } from '../../../components/ScreenShell';

import { styles } from '../../../styles/styles';

export default function SchoolSignupRoute() {
  const router = useRouter();

  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const passwordMismatch = Boolean(
    confirmPassword && password !== confirmPassword
  );

  const isFormValid =
    schoolName.trim().length > 0 &&
    isEmailValid &&
    password.length >= 6 &&
    password === confirmPassword;

  const handleCreated = () => {
    router.push({
      pathname: '/wizard',
      params: { schoolName: schoolName.trim() },
    });
  };

  return (
    <ScreenShell
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          disabled={!isFormValid}
          onPress={() => isFormValid && handleCreated()}
        >
          Continuar cadastro
        </PrimaryButton>
      }
    >
      <AuthHeader
        Icon={GraduationCap}
        title="Cadastre sua Escola"
        subtitle="Vamos criar o espaço da sua instituição para gerenciar turmas, professores e alunos."
        align="left"
      />

      <View style={{ gap: 16 }}>
        <FormField
          label="Nome da escola"
          value={schoolName}
          onChangeText={setSchoolName}
          placeholder="Ex: Escola Caminho do Saber"
          preset="educator"
        />

        <FormField
          label="E-mail do responsável"
          value={email}
          onChangeText={setEmail}
          placeholder="Ex: diretor@escola.com"
          keyboardType="email-address"
          preset="educator"
        />

        <PasswordField
          label="Crie uma senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Mínimo 6 caracteres"
        />

        <PasswordField
          label="Confirme a senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Digite a senha novamente"
          error={passwordMismatch}
        />

        {passwordMismatch && (
          <Text style={styles.errorText}>As senhas não coincidem</Text>
        )}

        {password.length > 0 && password.length < 6 && (
          <Text style={styles.errorText}>
            A senha precisa ter pelo menos 6 caracteres
          </Text>
        )}
      </View>
    </ScreenShell>
  );
}
