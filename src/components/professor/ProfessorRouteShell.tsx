import React from 'react';
import { View } from 'react-native';
import { ProfessorLoadingScreen } from './ProfessorLoadingScreen';
import { useProfessorData } from '@/hooks/professor/useProfessorData';
import { PROFESSOR_ROUTES } from '@/router/professor.routes';
import type { ProfessorRouteShellProps } from '@/types/professor/professorRouteShell';
import { useRouter } from 'expo-router';
import EducatorScreen from './EducatorScreen';


export function ProfessorRouteShell({
  children,
  currentDestination = 'dashboard',
  loading: propLoading = false,
}: ProfessorRouteShellProps) {
  const router = useRouter();
  const { profileName, schoolName, notifications, loading: dataLoading } = useProfessorData();

  const subtitle = `${schoolName}`;

  const isLoading = propLoading || dataLoading;
  
  if (isLoading) {
    return <ProfessorLoadingScreen />;
  }

  return (
    <EducatorScreen
      educatorName={profileName}
      headerSubtitle={subtitle}
      currentDestination={currentDestination}
      unreadNotificationsCount={notifications.filter((item) => !item.read).length}
      notificationPreview={notifications.slice(0, 3)}
      onOpenDashboard={() => router.push(PROFESSOR_ROUTES.DASHBOARD as any)}
      onOpenActivities={() => router.push(PROFESSOR_ROUTES.ACTIVITIES as any)}
      onOpenCorrectionQueue={() => router.push(PROFESSOR_ROUTES.CORRECTIONS as any)}
      onOpenReports={() => router.push(PROFESSOR_ROUTES.REPORTS as any)}
      onOpenProfile={() => router.push(PROFESSOR_ROUTES.PROFILE as any)}
      onOpenAllNotifications={() => router.push(PROFESSOR_ROUTES.NOTIFICATIONS as any)}
    >
      {children}
    </EducatorScreen>
  );
}