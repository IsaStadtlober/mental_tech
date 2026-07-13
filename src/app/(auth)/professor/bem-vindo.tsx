import { useRouter } from 'expo-router';

import { SuccessScreen } from '../../../components/SuccessScreen';

export default function EducatorWelcomeRoute() {
  const router = useRouter();

  return (
    <SuccessScreen
      eyebrow="Tudo pronto"
      title="Bem-vindo de volta! Sua turma já está te esperando."
      onBack={() => router.back()}
    />
  );
}
