import { useRouter } from 'expo-router';
import {
  CheckCircle2,
  ChevronRight,
  Coins, Gift, History, MapPin,
} from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ExplorerAvatar } from '../../../components/aluno/ExplorerAvatar';
import { StudentScreenShell } from '../../../components/aluno/StudentScreenShell';
import { SimpleCenteredHeader } from '../../../components/Headers';
import { theme } from '../../../constants/theme';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { ALUNO_ROUTES } from '../../../router/aluno.routes';
import { alunoStyles as s } from '../../../styles/aluno/aluno';

export default function ProfileRoute() {
  const router = useRouter();
  const onBack = () => router.back();
  const onCustomize = () => router.push(ALUNO_ROUTES.CUSTOMIZE);
  const onHistory = () => router.push(ALUNO_ROUTES.HISTORY);
  const { session, mission, equippedBySlot, ownedItemIds } =
    useStudentPrototype();

  return (
    <StudentScreenShell onBack={onBack}>
      <SimpleCenteredHeader
        title="Perfil do Explorador"
        subtitle="Sua identidade nesta aventura"
      />
      <ExplorerAvatar equippedBySlot={equippedBySlot} />
      <View style={s.profileStats}>
        <Stat
          icon={<Coins size={17} color="#D6961D" />}
          value={`${session.coins}`}
          label="moedas"
        />
        <Stat
          icon={<CheckCircle2 size={17} color={theme.primary} />}
          value={mission.status === 'approved' ? '3' : '2'}
          label="missões"
        />
        <Stat
          icon={<Gift size={17} color="#7452B8" />}
          value={`${ownedItemIds.length}`}
          label="itens"
        />
      </View>
      <View style={s.profilePosition}>
        <MapPin size={18} color={theme.primary} />
        <View>
          <Text style={s.profilePositionLabel}>Posição na trilha</Text>
          <Text style={s.profilePositionValue}>
            {mission.status === 'approved'
              ? 'Florestas'
              : mission.status === 'awaitingReview' ||
                mission.status === 'revision'
                ? 'A caminho de Biomas'
                : 'Início'}
          </Text>
        </View>
      </View>
      <View style={s.profileOptionStack}>
        <ProfileOption
          icon={<Gift size={20} color={theme.primary} />}
          label="Loja e meu inventário"
          hint="Abre a personalização do explorador"
          onPress={onCustomize}
        />
        <ProfileOption
          icon={<History size={20} color={theme.primary} />}
          label="Histórico de atividades"
          hint="Abre todas as missões e conquistas anteriores"
          onPress={onHistory}
        />
      </View>
    </StudentScreenShell>
  );
}

function ProfileOption({
  icon,
  label,
  hint,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  onPress(): void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      onPress={onPress}
      style={({ pressed }) => [
        s.studentProfileOption,
        pressed && s.interactiveSurfacePressed,
      ]}
    >
      {icon}
      <Text style={s.studentProfileOptionText}>{label}</Text>
      <View style={[s.interactiveChevron]}>
        <ChevronRight size={18} color={theme.primary} />
      </View>
    </Pressable>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View style={s.profileStat}>
      {icon}
      <Text style={s.profileStatValue}>{value}</Text>
      <Text style={s.profileStatLabel}>{label}</Text>
    </View>
  );
}