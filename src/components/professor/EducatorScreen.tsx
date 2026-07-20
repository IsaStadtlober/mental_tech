import { theme } from '@/constants/theme';
import {
    type ReactNode,
} from 'react';
import {
    type StyleProp,
    useWindowDimensions,
    View,
    type ViewStyle,
} from 'react-native';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
    getHeaderHeight,
} from '../../constants/professor/prof_Layout';
import EducatorHeader, {
    type HeaderDestination,
    type HeaderNotificationPreview,
} from './EducatorHeader';

export interface EducatorScreenProps {
  children: ReactNode;
  educatorName: string;
  headerSubtitle?: string;
  currentDestination?: HeaderDestination;
  unreadNotificationsCount?: number;
  notificationPreview?: HeaderNotificationPreview[];
  onOpenDashboard: () => void;
  onOpenActivities: () => void;
  onOpenCorrectionQueue: () => void;
  onOpenReports: () => void;
  onOpenProfile: () => void;
  onOpenAllNotifications?: () => void;
  style?: StyleProp<ViewStyle>;
}

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
    <View
      style={[
        {
          flex: 1,

          backgroundColor:
            theme.bgSubtle,
        },
        style,
      ]}
    >
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

      <View
        style={{
          flex: 1,

          marginTop:
            totalHeaderHeight,
        }}
      >
        {children}
      </View>
    </View>
  );
}