import { useRouter } from 'expo-router';
import { GraduationCap } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { FormField } from '../../../components/form/FormField';
import { AuthHeader } from '../../../components/Headers';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ScreenShell } from '../../../components/ScreenShell';

import { AUTH_ROUTES, PROFESSOR_ROUTES } from '@/router';
import { EDUCATOR_AUTH_CONSTANTS } from '../../../constants/auth';
import { styles } from '../../../styles';

export default function EducatorLoginRoute() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canEnter = email.trim().length > 3 && password.length > 0;

  const handleEnter = () => {
    router.replace(PROFESSOR_ROUTES.DASHBOARD as any);
  };

  return (
    <ScreenShell
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          disabled={!canEnter}
          onPress={() => canEnter && handleEnter()}
        >
          {EDUCATOR_AUTH_CONSTANTS.TEXTS.BUTTON_ENTER}
        </PrimaryButton>
      }
    >
      <AuthHeader
        Icon={GraduationCap}
        title={EDUCATOR_AUTH_CONSTANTS.TEXTS.LOGIN_TITLE}
        subtitle={EDUCATOR_AUTH_CONSTANTS.TEXTS.LOGIN_SUBTITLE}
        align="center"
      />

      <View style={styles.formStack}>
        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.EMAIL}
          value={email}
          onChangeText={setEmail}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.EMAIL}
          keyboardType="email-address"
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.PASSWORD}
          value={password}
          onChangeText={setPassword}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.PASSWORD}
          secureTextEntry
        />
      </View>

      <View style={styles.separator} />

      <View style={styles.loginLinks}>
        <TouchableOpacity
          onPress={() => router.push(AUTH_ROUTES.EDUCATOR.FORGOT_PASSWORD as any)}
          activeOpacity={0.75}
        >
          <Text style={styles.linkMuted}>
            Esqueci minha <Text style={styles.linkStrong}>senha</Text>
          </Text>
        </TouchableOpacity>

          <Text style={styles.linkMuted}>
          Ainda não tem uma escola cadastrada?{' '}
          <Text
            style={styles.linkStrong}
            onPress={() => router.push(AUTH_ROUTES.SCHOOL_SIGNUP as any)}
          >
            Cadastre aqui
          </Text>
        </Text>
      </View>
    </ScreenShell>
  );
}