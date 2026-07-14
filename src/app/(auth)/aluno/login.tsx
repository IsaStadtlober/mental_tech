import { useRouter } from 'expo-router';
import { Compass } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { FormField } from '../../../components/form/FormField';
import { AuthHeader } from '../../../components/Headers';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ScreenShell } from '../../../components/ScreenShell';

import { STUDENT_AUTH_CONSTANTS } from '../../../constants/auth';
import { styles } from '../../../styles';
import { formatClassCode, formatPin } from '../../../utils/auth';

export default function StudentLoginRoute() {
  const router = useRouter();
  const [classCode, setClassCode] = useState('');
  const [pin, setPin] = useState('');

  const canEnter =
    classCode.trim().length > 0 &&
    pin.length === STUDENT_AUTH_CONSTANTS.PIN_LENGTH;

  const handleEnter = () => {
    router.push('/aluno/nome');
  };

  return (
    <ScreenShell
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          disabled={!canEnter}
          onPress={() => canEnter && handleEnter()}
        >
          {STUDENT_AUTH_CONSTANTS.TEXTS.BUTTON_ENTER}
        </PrimaryButton>
      }
    >
      <AuthHeader
        Icon={Compass}
        title={STUDENT_AUTH_CONSTANTS.TEXTS.LOGIN_TITLE}
        subtitle={STUDENT_AUTH_CONSTANTS.TEXTS.LOGIN_SUBTITLE}
        align="center"
      />

      <View style={styles.formStack}>
        <FormField
          label={STUDENT_AUTH_CONSTANTS.LABELS.CLASS_CODE}
          value={classCode}
          onChangeText={(value) => setClassCode(formatClassCode(value))}
          placeholder={STUDENT_AUTH_CONSTANTS.PLACEHOLDERS.CLASS_CODE}
          preset="student"
          center
        />

        <FormField
          label={STUDENT_AUTH_CONSTANTS.LABELS.PIN}
          value={pin}
          onChangeText={(value) => setPin(formatPin(value))}
          placeholder={STUDENT_AUTH_CONSTANTS.PLACEHOLDERS.PIN}
          preset="student"
          center
          keyboardType="numeric"
        />
      </View>
    </ScreenShell>
  );
}