import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { SuccessScreen } from '../../../components/SuccessScreen';

import { EDUCATOR_AUTH_CONSTANTS, STUDENT_AUTH_CONSTANTS } from '../../../constants/auth';
import { styles } from '../../../styles';

export default function PasswordSentRoute() {
  const router = useRouter();

  return (
    <SuccessScreen
      eyebrow={STUDENT_AUTH_CONSTANTS.TEXTS.DONE_EYEBROW} // Reaproveitando "Tudo pronto" ou string similar
      title={EDUCATOR_AUTH_CONSTANTS.TEXTS.SENT_TITLE}
      description={EDUCATOR_AUTH_CONSTANTS.TEXTS.SENT_DESCRIPTION}
      onBack={() => router.back()}
      footer={
        <View style={styles.sentNoticeBox}>
          <Text style={styles.sentNoticeTitle}>
            {EDUCATOR_AUTH_CONSTANTS.TEXTS.SENT_NOTICE_TITLE}
          </Text>

          <Text style={styles.sentNoticeText}>
            {EDUCATOR_AUTH_CONSTANTS.TEXTS.SENT_NOTICE_TEXT}
          </Text>
        </View>
      }
    />
  );
}