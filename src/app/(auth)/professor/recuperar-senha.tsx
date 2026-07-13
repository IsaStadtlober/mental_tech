import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { Text } from 'react-native';

import { FormField } from '../../../components/form/FormField';
import { AuthHeader } from '../../../components/Headers';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ScreenShell } from '../../../components/ScreenShell';

import { EDUCATOR_AUTH_CONSTANTS } from '../../../constants/auth';
import { styles } from '../../../styles/styles';
import { isValidEmail } from '../../../utils/auth';

export default function ForgotPasswordRoute() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const canSend = isValidEmail(email);

  const handleSent = () => {
    router.push('/professor/senha-enviada');
  };

  return (
    <ScreenShell
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          disabled={!canSend}
          onPress={() => canSend && handleSent()}
        >
          {EDUCATOR_AUTH_CONSTANTS.TEXTS.BUTTON_SEND_LINK}
        </PrimaryButton>
      }
    >
      <AuthHeader
        Icon={Sparkles}
        title={EDUCATOR_AUTH_CONSTANTS.TEXTS.RECOVERY_TITLE}
        subtitle={EDUCATOR_AUTH_CONSTANTS.TEXTS.RECOVERY_SUBTITLE}
        align="center"
      />

      <FormField
        label={EDUCATOR_AUTH_CONSTANTS.LABELS.EMAIL}
        value={email}
        onChangeText={setEmail}
        placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.EMAIL}
        keyboardType="email-address"
        preset="educator"
      />

      <Text style={styles.recoveryHelperText}>
        {EDUCATOR_AUTH_CONSTANTS.TEXTS.RECOVERY_HELPER}
      </Text>
    </ScreenShell>
  );
}