import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { CoinCelebration } from '../../../components/aluno/CoinCelebration';
import { StudentScreenShell } from '../../../components/aluno/StudentScreenShell';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { ALUNO_ROUTES } from '../../../router/aluno.routes';
import { alunoStyles as s } from '../../../styles/aluno';

export default function SentRoute() {
  const router = useRouter();
  const { mission, session } = useStudentPrototype();

  // 1. Pega as moedas configuradas na atividade (30 para Padrão, 75 para Desafio) ou assume 30 como fallback
  const rewardCoins =
    (mission as any)?.reward_base_coins ??
    (mission as any)?.rewardBaseCoins ??
    mission?.rewardCoins ??
    30;

  const isRandom = (mission as any)?.reward_mode === 'random';

  return (
    <StudentScreenShell footerPadding={48}>
      <View style={s.celebrationScreen}>
        <Text style={s.screenEyebrow}>MISSÃO ENVIADA</Text>

        {/* Exibe o valor real configurado na missão */}
        <CoinCelebration reward={rewardCoins} total={session.coins} />

        <Text style={s.celebrationTitle}>
          {isRandom ? 'Recompensa Surpresa!' : 'Moedas em análise!'}
        </Text>

        <Text style={s.celebrationDescription}>
          {isRandom
            ? 'Sua resposta foi enviada! Assim que sua professora aprovar, você ganhará entre 10 e 75 moedas.'
            : `Sua resposta foi enviada! Assim que sua professora aprovar, ${rewardCoins} moedas serão creditadas no seu saldo.`}
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