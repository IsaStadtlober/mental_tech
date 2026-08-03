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
import {
  PROFILE_OPTION_COPY,
  PROFILE_POSITION_COPY,
  PROFILE_SCREEN_COPY,
} from '../../../constants/aluno/profile';
import { theme } from '../../../constants/theme';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { ALUNO_ROUTES } from '../../../router/aluno.routes';
import { alunoStyles as s } from '../../../styles/aluno';
import {
  getMissionCountValue,
  getProfilePositionKey,
} from '../../../utils/aluno/profile';

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
        title={PROFILE_SCREEN_COPY.title}
        subtitle={PROFILE_SCREEN_COPY.subtitle}
      />
      <ExplorerAvatar equippedBySlot={equippedBySlot} />
      <View style={s.profileStats}>
        <Stat
          icon={<Coins size={17} color={theme.studentGold} />}
          value={`${session.coins}`}
          label="moedas"
        />
        <Stat
          icon={<CheckCircle2 size={17} color={theme.primary} />}
          value={getMissionCountValue(mission.status)}
          label="missões"
        />
        <Stat
          icon={<Gift size={17} color={theme.studentPurple} />}
          value={`${ownedItemIds.length}`}
          label="itens"
        />
      </View>
      <View style={s.profilePosition}>
        <MapPin size={18} color={theme.primary} />
        <View>
          <Text style={s.profilePositionLabel}>Posição na trilha</Text>
          <Text style={s.profilePositionValue}>
            {PROFILE_POSITION_COPY[getProfilePositionKey(mission)]}
          </Text>
        </View>
      </View>
      <View style={s.profileOptionStack}>
        <ProfileOption
          icon={<Gift size={20} color={theme.primary} />}
          label={PROFILE_OPTION_COPY.shop.label}
          hint={PROFILE_OPTION_COPY.shop.hint}
          onPress={onCustomize}
        />
        <ProfileOption
          icon={<History size={20} color={theme.primary} />}
          label={PROFILE_OPTION_COPY.history.label}
          hint={PROFILE_OPTION_COPY.history.hint}
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