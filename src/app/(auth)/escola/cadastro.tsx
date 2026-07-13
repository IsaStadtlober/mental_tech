import { useRouter } from 'expo-router';
import { GraduationCap } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { FormField } from '../../../components/form/FormField';
import { PasswordField } from '../../../components/form/PasswordField';
import { AuthHeader } from '../../../components/Headers';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ScreenShell } from '../../../components/ScreenShell';

import { EDUCATOR_AUTH_CONSTANTS } from '../../../constants/auth';
import { styles } from '../../../styles';
import { isValidEmail } from '../../../utils/auth';

export default function SchoolSignupRoute() {
  const router = useRouter();

  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailValid = isValidEmail(email);
  const passwordMismatch = Boolean(confirmPassword && password !== confirmPassword);
  const isPasswordLengthValid = password.length >= EDUCATOR_AUTH_CONSTANTS.MIN_PASSWORD_LENGTH;

  const isFormValid =
    schoolName.trim().length > 0 &&
    isEmailValid &&
    isPasswordLengthValid &&
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
          {EDUCATOR_AUTH_CONSTANTS.TEXTS.BUTTON_CONTINUE}
        </PrimaryButton>
      }
    >
      <AuthHeader
        Icon={GraduationCap}
        title={EDUCATOR_AUTH_CONSTANTS.TEXTS.SIGNUP_TITLE}
        subtitle={EDUCATOR_AUTH_CONSTANTS.TEXTS.SIGNUP_SUBTITLE}
        align="left"
      />

      <View style={{ gap: 16 }}>
        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.SCHOOL_NAME}
          value={schoolName}
          onChangeText={setSchoolName}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.SCHOOL_NAME}
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.RESPONSIBLE_EMAIL}
          value={email}
          onChangeText={setEmail}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.EMAIL}
          keyboardType="email-address"
          preset="educator"
        />

        <PasswordField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.CREATE_PASSWORD}
          value={password}
          onChangeText={setPassword}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.CREATE_PASSWORD}
        />

        <PasswordField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.CONFIRM_PASSWORD}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.CONFIRM_PASSWORD}
          error={passwordMismatch}
        />

        {passwordMismatch && (
          <Text style={styles.errorText}>
            {EDUCATOR_AUTH_CONSTANTS.ERRORS.PASSWORD_MISMATCH}
          </Text>
        )}

        {password.length > 0 && !isPasswordLengthValid && (
          <Text style={styles.errorText}>
            {EDUCATOR_AUTH_CONSTANTS.ERRORS.PASSWORD_TOO_SHORT}
          </Text>
        )}
      </View>
    </ScreenShell>
  );
}