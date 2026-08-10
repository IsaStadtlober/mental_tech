import { useRouter } from 'expo-router';
import { Bell, FileText, Gift, RotateCcw } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { StudentEmptyState } from '../../../components/aluno/StudentEmptyState';
import { StudentScreenShell } from '../../../components/aluno/StudentScreenShell';
import {
  NOTIFICATION_CATEGORY_LABELS,
  NOTIFICATION_EMPTY_STATE,
  NOTIFICATION_SCREEN_COPY,
} from '../../../constants/aluno/notifications';
import { theme } from '../../../constants/theme';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { alunoStyles as s } from '../../../styles/aluno';
import type { StudentNotification } from '../../../types/aluno';
import { resolveNotificationRoute } from '../../../utils/aluno/notifications';

export default function NotificationsRoute() {
  const router = useRouter();
  const { notifications, markNotificationRead } = useStudentPrototype();
  const open = (x: StudentNotification) => {
    markNotificationRead(x.id);
    router.push(resolveNotificationRoute(x));
  };
  return (
    <StudentScreenShell onBack={() => router.back()}>
      <Text style={s.screenTitle}>{NOTIFICATION_SCREEN_COPY.title}</Text>
      <Text style={s.screenSubtitle}>{NOTIFICATION_SCREEN_COPY.subtitle}</Text>
      {notifications.length === 0 ? (
        <StudentEmptyState
          title={NOTIFICATION_EMPTY_STATE.title}
          description={NOTIFICATION_EMPTY_STATE.description}
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
              ? theme.studentPurple
              : theme.primary
          }
        />
      </View>
      <View style={s.contentFlex}>
        <Text style={s.studentNotificationEyebrow}>
          {NOTIFICATION_CATEGORY_LABELS[item.category]}
        </Text>
        <Text style={s.studentListTitle}>{item.title}</Text>
        <Text style={s.studentListMeta}>{item.description}</Text>
      </View>
      {!item.read && <View style={s.unreadDot} />}
    </Pressable>
  );
}