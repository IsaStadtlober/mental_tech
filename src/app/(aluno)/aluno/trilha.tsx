import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MissionCard } from '../../../components/aluno/MissionCard';
import { StudentEmptyState } from '../../../components/aluno/StudentEmptyState';
import { StudentMap } from '../../../components/aluno/StudentMap';
import { StudentTopBar } from '../../../components/aluno/StudentTopBar';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { ALUNO_ROUTES } from '../../../router/aluno.routes';
import { alunoStyles as s } from '../../../styles/aluno';

export default function TrailRoute() {
  const router = useRouter();
  const { explorerName } = useLocalSearchParams<{ explorerName?: string }>();
  const {
    session,
    mission,
    equippedBySlot,
    missionAvailable,
    notifications,
    setExplorerName,
  } = useStudentPrototype();
  useEffect(() => {
    if (typeof explorerName === 'string' && explorerName.trim())
      setExplorerName(explorerName.trim());
  }, [explorerName, setExplorerName]);
  return (
    <SafeAreaView style={s.studentMapRoot} edges={['top', 'left', 'right']}>
      <StudentTopBar
        session={session}
        equippedBySlot={equippedBySlot}
        onProfile={() => router.push(ALUNO_ROUTES.PROFILE)}
        onCoins={() => router.push(ALUNO_ROUTES.CUSTOMIZE)}
        unreadNotificationsCount={notifications.filter((x) => !x.read).length}
        onNotifications={() => router.push(ALUNO_ROUTES.NOTIFICATIONS)}
      />
      <StudentMap
        status={mission.status}
        equippedBySlot={equippedBySlot}
        explorerName={session.explorerName}
        onOpenMission={() => router.push(ALUNO_ROUTES.MISSION)}
      />
      {missionAvailable ? (
        <MissionCard
          mission={mission}
          onPress={() => router.push(ALUNO_ROUTES.MISSION)}
        />
      ) : (
        <View style={s.emptyMissionOverlay}>
          <StudentEmptyState
            onInventory={() => router.push(ALUNO_ROUTES.CUSTOMIZE)}
          />
        </View>
      )}
    </SafeAreaView>
  );
}