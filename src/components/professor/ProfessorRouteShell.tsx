import { useProfessorPrototype } from '@/hooks/professor/useProfessorPrototype';
import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import type { HeaderDestination } from './EducatorHeader';
import EducatorScreen from './EducatorScreen';

export function ProfessorRouteShell({
  children,
  currentDestination = 'dashboard',
}: {
  children: ReactNode;
  currentDestination?: HeaderDestination;
}) {
  const router = useRouter();
  const { notifications } = useProfessorPrototype();

  return (
    <EducatorScreen
      educatorName="Professor"
      headerSubtitle="Escola Caminho do Saber · 5º Ano A"
      currentDestination={currentDestination}
      unreadNotificationsCount={
        notifications.filter((item) => !item.read).length
      }
      notificationPreview={notifications.slice(0, 3)}
      onOpenDashboard={() => router.push('/(professor)/dashboard' as any)}
      onOpenActivities={() => router.push('/(professor)/atividades' as any)}
      onOpenCorrectionQueue={() => router.push('/(professor)/correcoes' as any)}
      onOpenReports={() => router.push('/(professor)/relatorios' as any)}
      onOpenProfile={() => router.push('/(professor)/perfil' as any)}
      onOpenAllNotifications={() =>
        router.push('/(professor)/notificacoes' as any)
      }
    >
      {children}
    </EducatorScreen>
  );
}