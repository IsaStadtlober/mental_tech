import { useRouter } from 'expo-router';
import { Bell, FileText, Gift, RotateCcw } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { StudentEmptyState } from '../../../components/aluno/StudentEmptyState';
import { StudentScreenShell } from '../../../components/aluno/StudentScreenShell';
import { theme } from '../../../constants/theme';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { ALUNO_ROUTES } from '../../../router/aluno.routes';
import { alunoStyles as s } from '../../../styles/aluno';
import type { StudentNotification } from '../../../types/aluno';

export default function NotificationsRoute() {
  const router = useRouter();
  const { notifications, markNotificationRead } = useStudentPrototype();
  const open = (x: StudentNotification) => {
    markNotificationRead(x.id);
    router.push(
      x.destination === 'mission'
        ? ALUNO_ROUTES.MISSION
        : x.destination === 'reward'
        ? ALUNO_ROUTES.REWARD
        : ALUNO_ROUTES.HISTORY
    );
  };
  return (
    <StudentScreenShell onBack={() => router.back()}>
      <Text style={s.screenTitle}>Notificações</Text>
      <Text style={s.screenSubtitle}>
        Novidades e lembretes da sua jornada.
      </Text>
      {notifications.length === 0 ? (
        <StudentEmptyState
          title="Tudo tranquilo por aqui"
          description="Quando uma novidade chegar, ela aparecerá aqui."
        />
      ) : (
        <View style={s.notificationList}>
          {notifications.map((x) => (
            <NotificationCard key={x.id} item={x} onPress={() => open(x)} />
          ))}
        </View>
      )}
    </StudentScreenShell>
  );
}
function NotificationCard({
  item,
  onPress,
}: {
  item: StudentNotification;
  onPress(): void;
}) {
  const Icon =
    item.category === 'reward'
      ? Gift
      : item.category === 'revision'
      ? RotateCcw
      : item.category === 'mission'
      ? FileText
      : Bell;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.title}. ${item.description}`}
      accessibilityHint="Abre o conteúdo relacionado"
      onPress={onPress}
      style={({ pressed }) => [
        s.notificationCard,
        item.category === 'revision' && s.notificationCardRevision,
        item.category === 'reward' && s.notificationCardReward,
        pressed && s.interactiveSurfacePressed,
      ]}
    >
      <View
        style={[
          s.notificationCardIcon,
          item.category === 'revision' && s.notificationCardIconRevision,
          item.category === 'reward' && s.notificationCardIconReward,
        ]}
      >
        <Icon
          size={20}
          color={
            item.category === 'revision'
              ? theme.warning
              : item.category === 'reward'
              ? '#7452B8'
              : theme.primary
          }
        />
      </View>
      <View style={s.contentFlex}>
        <Text style={s.studentNotificationEyebrow}>
          {item.category.toUpperCase()}
        </Text>
        <Text style={s.studentListTitle}>{item.title}</Text>
        <Text style={s.studentListMeta}>{item.description}</Text>
      </View>
      {!item.read && <View style={s.unreadDot} />}
    </Pressable>
  );
}