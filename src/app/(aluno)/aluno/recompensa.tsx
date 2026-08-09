import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { RewardChest } from "../../../components/aluno/RewardChest";
import { StudentScreenShell } from "../../../components/aluno/StudentScreenShell";
import { useStudentPrototype } from "../../../hooks/aluno/useStudentPrototype";
import { ALUNO_ROUTES } from "../../../router/aluno.routes";
import { alunoStyles as s } from "../../../styles/aluno";

export default function RewardRoute() {
  const router = useRouter();
  const { equipReward } = useStudentPrototype();
  return (
    <StudentScreenShell onBack={() => router.back()} footerPadding={48}>
      <View style={s.rewardScreen}>
        <View style={s.rewardContentCard}>
          <Text style={s.rewardHeading}>RECOMPENSA ESPECIAL</Text>
          <Text style={s.rewardDescription}>
            Você conquistou este item completando a missão Descobrindo Biomas.
          </Text>
          <RewardChest />
          <Text style={s.rewardItemTitle}>Mochila Cósmica</Text>
          <View style={s.rewardActions}>
            <PrimaryButton
              icon={false}
              onPress={() => {
                equipReward();
                router.replace(ALUNO_ROUTES.CUSTOMIZE);
              }}
            >
              Equipar agora
            </PrimaryButton>
            <TouchableOpacity
              onPress={() => router.replace(ALUNO_ROUTES.TRAIL)}
              style={s.secondaryAction}
            >
              <Text style={s.secondaryActionText}>Guardar para depois</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </StudentScreenShell>
  );
}
