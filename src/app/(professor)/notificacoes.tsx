import { useRouter } from 'expo-router';
import { Bell, Trash2 } from 'lucide-react-native';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

import {
    NOTIFICATION_CATEGORY_CONFIG, NOTIFICATION_FILTERS,
} from '@/constants/professor/notifications';
import { getHorizontalPadding, isCompactWidth } from '@/constants/professor/prof_Layout';
import { PROFESSOR_NOTIFICATIONS_MESSAGES } from '@/constants/professor/professor';
import { theme } from '@/constants/theme';
import { useEducatorNotifications } from '@/hooks/useEducatorNotifications';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { PROFESSOR_ROUTES } from '@/router';
import { notificationsStyles as styles } from '@/styles/professor/notifications';
import type { EducatorNotification } from '@/types/professor';

import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import EmptyState from '@/components/professor/EmptyState';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import StatusChip from '@/components/professor/StatusChip';

export interface NotificationsScreenProps {
    notifications: EducatorNotification[];
    onBack: () => void;
    onMarkAsRead: (notificationId: string) => void;
    onMarkAllAsRead: () => void;
    onDeleteNotification: (notificationId: string) => void;
    onClearReadNotifications: () => void;
    onOpenCorrectionQueue: () => void;
    onOpenStudent: (studentId: string) => void;
    onOpenActivity: (activityId: string) => void;
    onOpenReports: () => void;
}

function NotificationsScreen({
    notifications,
    onBack,
    onMarkAsRead,
    onMarkAllAsRead,
    onDeleteNotification,
    onClearReadNotifications,
    onOpenCorrectionQueue,
    onOpenStudent,
    onOpenActivity,
    onOpenReports,
}: NotificationsScreenProps) {
    const { width } = useWindowDimensions();
    const isCompact = isCompactWidth(width);
    const horizontalPadding = getHorizontalPadding(width);

    const {
        filter,
        setFilter,
        unreadCount,
        readCount,
        filteredNotifications,
        getActionLabel,
        getCategoryIcon,
        openNotification,
    } = useEducatorNotifications(notifications);

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.page}
            contentContainerStyle={{
                paddingHorizontal: horizontalPadding,
                paddingTop: 28,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.screenContainer}>
                {/* Ações Globais & Voltar */}
                <View style={styles.topHeaderRow}>
                    <BackButton
                        label={PROFESSOR_NOTIFICATIONS_MESSAGES.header.backButton}
                        onPress={onBack}
                    />

                    <View style={styles.globalActionsRow}>
                        {readCount > 0 && (
                            <AppButton
                                label={PROFESSOR_NOTIFICATIONS_MESSAGES.header.clearReadButton(isCompact)}
                                variant="ghost"
                                size="small"
                                iconLeft={<Trash2 size={16} color={theme.danger} />}
                                onPress={onClearReadNotifications}
                            />
                        )}

                        {unreadCount > 0 && (
                            <AppButton
                                label={PROFESSOR_NOTIFICATIONS_MESSAGES.header.markAllReadButton(isCompact)}
                                variant="secondary"
                                size="small"
                                iconLeft={<Bell size={16} color={theme.primary} />}
                                onPress={onMarkAllAsRead}
                            />
                        )}
                    </View>
                </View>

                {/* Título da tela */}
                <View style={styles.headerSection}>
                    <Text
                        style={[
                            styles.title,
                            {
                                fontSize: isCompact ? 25 : 30,
                                lineHeight: isCompact ? 32 : 38,
                            },
                        ]}
                    >
                        {PROFESSOR_NOTIFICATIONS_MESSAGES.header.title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {PROFESSOR_NOTIFICATIONS_MESSAGES.header.subtitle}
                    </Text>
                </View>

                {/* Contador e resumo */}
                <View style={styles.summaryRow}>
                    <StatusChip
                        label={PROFESSOR_NOTIFICATIONS_MESSAGES.summary.unreadCount(unreadCount)}
                        tone={unreadCount > 0 ? 'warning' : 'success'}
                        dot
                    />
                    <Text style={styles.summaryHelperText}>
                        {PROFESSOR_NOTIFICATIONS_MESSAGES.summary.helperText}
                    </Text>
                </View>

                {/* Filtros */}
                <AppCard elevated={false}>
                    <Text style={styles.filterTitle}>
                        {PROFESSOR_NOTIFICATIONS_MESSAGES.filter.title}
                    </Text>
                    <View style={styles.filterList}>
                        {NOTIFICATION_FILTERS.map((option) => {
                            const active = filter === option.value;
                            return (
                                <Pressable
                                    key={option.value}
                                    accessibilityRole="button"
                                    accessibilityState={{ selected: active }}
                                    onPress={() => setFilter(option.value)}
                                    style={({ pressed }) => [
                                        styles.filterChip,
                                        active && styles.filterChipActive,
                                        { opacity: pressed ? 0.82 : 1 },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.filterChipText,
                                            active && styles.filterChipTextActive,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </AppCard>

                {/* Quantidade */}
                <Text style={styles.countText}>
                    {PROFESSOR_NOTIFICATIONS_MESSAGES.count.total(filteredNotifications.length)}
                </Text>

                {/* Lista */}
                {filteredNotifications.length === 0 ? (
                    <AppCard>
                        <EmptyState
                            icon={<Bell size={24} color={theme.primary} />}
                            title={PROFESSOR_NOTIFICATIONS_MESSAGES.emptyState.title}
                            description={
                                filter === 'unread'
                                    ? PROFESSOR_NOTIFICATIONS_MESSAGES.emptyState.descriptionUnread
                                    : notifications.length === 0
                                        ? PROFESSOR_NOTIFICATIONS_MESSAGES.emptyState.descriptionEmpty
                                        : PROFESSOR_NOTIFICATIONS_MESSAGES.emptyState.descriptionFilter
                            }
                        />
                    </AppCard>
                ) : (
                    <View style={styles.listStack}>
                        {filteredNotifications.map((notification) => {
                            const config = NOTIFICATION_CATEGORY_CONFIG[notification.category];
                            const hasDestination = notification.destination.type !== 'none';

                            return (
                                <AppCard
                                    key={notification.id}
                                    elevated={false}
                                    style={[
                                        styles.cardItem,
                                        {
                                            borderColor: notification.read
                                                ? theme.border
                                                : theme.primaryTint,
                                            backgroundColor: notification.read
                                                ? theme.card
                                                : theme.bgSoft,
                                        },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.cardWrapper,
                                            {
                                                flexDirection: isCompact ? 'column' : 'row',
                                                alignItems: isCompact ? 'stretch' : 'center',
                                            },
                                        ]}
                                    >
                                        <View style={styles.cardMainInfo}>
                                            <View
                                                style={[
                                                    styles.iconBox,
                                                    { backgroundColor: config.backgroundColor },
                                                ]}
                                            >
                                                {getCategoryIcon(notification.category, config.foregroundColor)}
                                            </View>

                                            <View style={styles.cardTextContent}>
                                                <View style={styles.cardHeaderTags}>
                                                    <Text style={styles.cardTitle}>
                                                        {notification.title}
                                                    </Text>

                                                    {!notification.read && (
                                                        <StatusChip
                                                            label={PROFESSOR_NOTIFICATIONS_MESSAGES.item.newTag}
                                                            tone="warning"
                                                            dot
                                                        />
                                                    )}

                                                    <StatusChip
                                                        label={config.label}
                                                        tone={config.tone}
                                                    />
                                                </View>

                                                <Text style={styles.cardDescription}>
                                                    {notification.description}
                                                </Text>

                                                <Text style={styles.cardTimestamp}>
                                                    {notification.createdAtLabel}
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={[
                                                styles.cardActionsRow,
                                                {
                                                    justifyContent: isCompact
                                                        ? 'center'
                                                        : 'flex-end',
                                                },
                                            ]}
                                        >
                                            <AppButton
                                                label={getActionLabel(notification)}
                                                variant={
                                                    notification.read ? 'ghost' : 'secondary'
                                                }
                                                size="small"
                                                disabled={notification.read && !hasDestination}
                                                onPress={() => openNotification(notification, {
                                                    onMarkAsRead: onMarkAsRead,
                                                    onOpenCorrectionQueue: onOpenCorrectionQueue,
                                                    onOpenStudent: onOpenStudent,
                                                    onOpenActivity: onOpenActivity,
                                                    onOpenReports: onOpenReports,
                                                })}
                                            />

                                            <AppButton
                                                label={PROFESSOR_NOTIFICATIONS_MESSAGES.item.deleteButton}
                                                variant="ghost"
                                                size="small"
                                                iconLeft={
                                                    <Trash2 size={16} color={theme.danger} />
                                                }
                                                onPress={() =>
                                                    onDeleteNotification(notification.id)
                                                }
                                            />
                                        </View>
                                    </View>
                                </AppCard>
                            );
                        })}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

export default function NotificationsRoute() {
    const router = useRouter();
    const { notifications, markRead, markAllRead, deleteNotification, clearRead } =
        useProfessorPrototype();

    return (
        <ProfessorRouteShell currentDestination="notifications">
            <NotificationsScreen
                notifications={notifications}
                onBack={() => router.back()}
                onMarkAsRead={markRead}
                onMarkAllAsRead={markAllRead}
                onDeleteNotification={deleteNotification}
                onClearReadNotifications={clearRead}
                onOpenCorrectionQueue={() => router.push(PROFESSOR_ROUTES.CORRECTIONS as any)}
                onOpenStudent={(studentId) =>
                    router.push(PROFESSOR_ROUTES.STUDENT_PROFILE(studentId) as any)
                }
                onOpenActivity={(activityId) =>
                    router.push(PROFESSOR_ROUTES.ACTIVITY_DETAIL(activityId) as any)
                }
                onOpenReports={() => router.push(PROFESSOR_ROUTES.REPORTS as any)}
            />
        </ProfessorRouteShell>
    );
}