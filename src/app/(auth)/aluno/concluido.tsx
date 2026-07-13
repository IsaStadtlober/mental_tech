import { useLocalSearchParams, useRouter } from 'expo-router';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { SuccessScreen } from '../../../components/SuccessScreen';

export default function WelcomeDoneRoute() {
  const router = useRouter();
  const { explorerName } = useLocalSearchParams<{ explorerName: string }>();

  return (
    <SuccessScreen
      eyebrow="Tudo pronto"
      title={`${explorerName || 'Explorador'}, sua jornada começa agora!`}
      description="Vamos rumo à sua primeira missão."
      onBack={() => router.back()}
      footer={
        <PrimaryButton onPress={() => router.replace('/roles' as any)}>
          Acessar minha conta
        </PrimaryButton>
      }
    />
  );
}
