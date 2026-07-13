import { useRouter } from 'expo-router';

import { SuccessScreen } from '../../../components/SuccessScreen';
import { EDUCATOR_AUTH_CONSTANTS, STUDENT_AUTH_CONSTANTS } from '../../../constants/auth';

export default function EducatorWelcomeRoute() {
  const router = useRouter();

  return (
    <SuccessScreen
      eyebrow={STUDENT_AUTH_CONSTANTS.TEXTS.DONE_EYEBROW}
      title={EDUCATOR_AUTH_CONSTANTS.TEXTS.WELCOME_TITLE}
      onBack={() => router.back()}
    />
  );
}