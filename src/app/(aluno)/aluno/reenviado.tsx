import { useRouter } from 'expo-router';
import { CheckCircle2 } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { StudentScreenShell } from '../../../components/aluno/StudentScreenShell';
import { theme } from '../../../constants/theme';
import { ALUNO_ROUTES } from '../../../router/aluno.routes';
import { alunoStyles as s } from '../../../styles/aluno/aluno';

export default function ResentRoute() {
  const router = useRouter();
  return (
    <StudentScreenShell footerPadding={48}>
      <View style={s.resentScreen}>
        <View style={s.resentIcon}>
          <CheckCircle2 size={42} color={theme.primary} />
        </View>
        <Text style={s.screenEyebrow}>CORREÇÃO REENVIADA</Text>
        <Text style={s.celebrationTitle}>Tudo certo!</Text>
        <Text style={s.celebrationDescription}>
          Sua professora vai dar uma olhada novamente. Seu explorador continua
          na metade do caminho.
        </Text>
        <View style={s.noRewardNotice}>
          <Text style={s.noRewardText}>
            Nenhuma moeda foi adicionada novamente.
          </Text>
        </View>
        <PrimaryButton
          onPress={() => router.replace(ALUNO_ROUTES.TRAIL)}
          icon={false}
        >
          Voltar para a trilha
        </PrimaryButton>
      </View>
    </StudentScreenShell>
  );
}