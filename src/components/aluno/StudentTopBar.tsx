import { Bell, Coins } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno';
import type { EquippedBySlot, StudentSession } from '../../types/aluno';
import { ExplorerAvatar } from './ExplorerAvatar';

export function StudentTopBar({
  session,
  equippedBySlot,
  onProfile,
  onCoins,
  onNotifications,
  unreadNotificationsCount = 0,
}: {
  session: StudentSession;
  equippedBySlot: EquippedBySlot;
  onProfile(): void;
  onCoins(): void;
  onNotifications(): void;
  unreadNotificationsCount?: number;
}) {
  return (
    <View style={s.studentTopBar}>
      <TouchableOpacity onPress={onProfile}>
        <ExplorerAvatar compact equippedBySlot={equippedBySlot} />
      </TouchableOpacity>
      <View style={s.topIdentity}>
        <Text style={s.mapHello}>
          Olá, {session.explorerName || 'Explorador'}!
        </Text>
        <Text style={s.mapSubtitle}>Sua trilha</Text>
      </View>
      <TouchableOpacity
        accessibilityLabel={`${session.coins} moedas. Abrir loja`}
        onPress={onCoins}
        style={s.mapCoins}
      >
        <Coins size={16} color="#D6961D" />
        <Text style={s.mapCoinsText}>{session.coins}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Notificações"
        onPress={onNotifications}
        style={s.notificationBellButton}
      >
        <Bell size={19} color={theme.primary} />
        {unreadNotificationsCount > 0 && <View style={s.notificationDot} />}
      </TouchableOpacity>
    </View>
  );
}