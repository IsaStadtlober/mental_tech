import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { CoinCelebration } from '../../../components/aluno/CoinCelebration';
import { StudentScreenShell } from '../../../components/aluno/StudentScreenShell';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { ALUNO_ROUTES } from '../../../router/aluno.routes';
import { alunoStyles as s } from '../../../styles/aluno/aluno';

export default function SentRoute() {
  const router = useRouter();
  const { mission, session } = useStudentPrototype();
  return (
    <StudentScreenShell footerPadding={48}>
      <View style={s.celebrationScreen}>
        <Text style={s.screenEyebrow}>MISSÃO ENVIADA</Text>
        <CoinCelebration reward={mission.rewardCoins} total={session.coins} />
        <Text style={s.celebrationTitle}>Moedas garantidas!</Text>
        <Text style={s.celebrationDescription}>
          Agora é só esperar sua professora corrigir para desbloquear uma
          recompensa especial.
        </Text>
        <PrimaryButton
          onPress={() => router.replace(ALUNO_ROUTES.TRAIL)}
          icon={false}
        >
          Ver minha trilha
        </PrimaryButton>
      </View>
    </StudentScreenShell>
  );
}
