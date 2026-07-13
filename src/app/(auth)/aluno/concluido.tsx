import { useLocalSearchParams, useRouter } from 'expo-router';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { SuccessScreen } from '../../../components/SuccessScreen';

import { STUDENT_AUTH_CONSTANTS } from '../../../constants/auth';
import { WelcomeDoneSearchParams } from '../../../types/auth';

export default function WelcomeDoneRoute() {
  const router = useRouter();
  const { explorerName } = useLocalSearchParams<WelcomeDoneSearchParams>();

  const titleText = `${explorerName || 'Explorador'}, sua jornada começa agora!`;

  return (
    <SuccessScreen
      eyebrow={STUDENT_AUTH_CONSTANTS.TEXTS.DONE_EYEBROW}
      title={titleText}
      description={STUDENT_AUTH_CONSTANTS.TEXTS.DONE_DESCRIPTION}
      onBack={() => router.back()}
      footer={
        <PrimaryButton onPress={() => router.replace('/roles' as any)}>
          {STUDENT_AUTH_CONSTANTS.TEXTS.BUTTON_ACCESS_ACCOUNT}
        </PrimaryButton>
      }
    />
  );
}