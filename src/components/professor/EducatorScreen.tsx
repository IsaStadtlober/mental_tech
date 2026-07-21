import { educatorScreenStyles } from '@/styles/professor/educatorScreen';
import type { EducatorScreenProps } from '@/types/professor/educatorScreen';
import { useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeaderHeight } from '../../constants/professor/prof_Layout';
import EducatorHeader from './EducatorHeader';

export default function EducatorScreen({
  children,
  educatorName,
  headerSubtitle,
  currentDestination,
  unreadNotificationsCount,
  notificationPreview,
  onOpenDashboard,
  onOpenActivities,
  onOpenCorrectionQueue,
  onOpenReports,
  onOpenProfile,
  onOpenAllNotifications,
  style,
}: EducatorScreenProps) {
  const { width } =
    useWindowDimensions();

  const insets =
    useSafeAreaInsets();

  const headerHeight =
    getHeaderHeight(width);

  const totalHeaderHeight =
    headerHeight +
    insets.top;

  return (
    <View style={[educatorScreenStyles.container, style]}> 
    <EducatorHeader
        educatorName={educatorName}
        subtitle={headerSubtitle}
        currentDestination={
          currentDestination
        }
        unreadNotificationsCount={
          unreadNotificationsCount
        }
        notificationPreview={
          notificationPreview
        }
        onOpenDashboard={
          onOpenDashboard
        }
        onOpenActivities={
          onOpenActivities
        }
        onOpenCorrectionQueue={
          onOpenCorrectionQueue
        }
        onOpenReports={
          onOpenReports
        }
        onOpenProfile={
          onOpenProfile
        }
        onOpenAllNotifications={
        onOpenAllNotifications
        }
    />

      <View style={[educatorScreenStyles.content, { marginTop: totalHeaderHeight }]}> 
        {children}
      </View>
    </View>
  );
}