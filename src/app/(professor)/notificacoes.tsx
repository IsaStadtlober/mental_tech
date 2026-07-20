import { useRouter } from 'expo-router';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { borderRadius, fonts, theme } from '@/constants/theme';
import React, {
    useMemo,
    useState,
} from 'react';
import {
    Pressable,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import {
    Bell,
    BookOpen,
    CheckSquare2,
    GraduationCap,
    Settings2,
    Trash2,
} from 'lucide-react-native';
import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import EmptyState from '@/components/professor/EmptyState';
import StatusChip, {
    StatusChipTone,
} from '@/components/professor/StatusChip';
import {
    getHorizontalPadding,
    isCompactWidth,
} from '@/components/professor/../../constants/professorLayout';
import type {
    EducatorNotification,
    NotificationCategory,
} from '@/components/professor/../../types/professor';

type NotificationFilter =
    | 'all'
    | 'unread'
    | NotificationCategory;

export interface NotificationsScreenProps {
    notifications: EducatorNotification[];

    onBack: () => void;

    onMarkAsRead: (
        notificationId: string
    ) => void;

    onMarkAllAsRead: () => void;

    onDeleteNotification: (
        notificationId: string
    ) => void;

    onClearReadNotifications: () => void;

    onOpenCorrectionQueue: () => void;

    onOpenStudent: (
        studentId: string
    ) => void;

    onOpenActivity: (
        activityId: string
    ) => void;

    onOpenReports: () => void;
}

const filters: {
    value: NotificationFilter;
    label: string;
}[] = [
        {
            value: 'all',
            label: 'Todas',
        },
        {
            value: 'unread',
            label: 'Não lidas',
        },
        {
            value: 'correction',
            label: 'Correções',
        },
        {
            value: 'activity',
            label: 'Atividades',
        },
        {
            value: 'student',
            label: 'Alunos',
        },
        {
            value: 'system',
            label: 'Sistema',
        },
    ];

const categoryConfig: Record<
    NotificationCategory,
    {
        label: string;
        tone: StatusChipTone;
        backgroundColor: string;
        foregroundColor: string;
    }
> = {
    correction: {
        label: 'Correção',
        tone: 'warning',

        backgroundColor:
            theme.warningSoft,

        foregroundColor:
            theme.warning,
    },

    activity: {
        label: 'Atividade',
        tone: 'info',

        backgroundColor:
            theme.infoSoft,

        foregroundColor:
            theme.info,
    },

    student: {
        label: 'Aluno',
        tone: 'danger',

        backgroundColor:
            theme.dangerSoft,

        foregroundColor:
            theme.danger,
    },

    system: {
        label: 'Sistema',
        tone: 'neutral',

        backgroundColor:
            theme.bgSoft,

        foregroundColor:
            theme.primary,
    },
};

/**
 * USER FLOW N1:
 * Centraliza os eventos relevantes do professor.
 *
 * Cada notificação pode direcionar o professor
 * para o contexto relacionado.
 *
 * PROTOTYPE:
 * Leitura e exclusão permanecem somente
 * no estado local do App.tsx.
 */
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
    const { width } =
        useWindowDimensions();

    const isCompact =
        isCompactWidth(width);

    const horizontalPadding =
        getHorizontalPadding(width);

    const [
        filter,
        setFilter,
    ] = useState<NotificationFilter>(
        'all'
    );

    const unreadCount =
        notifications.filter(
            (notification) =>
                !notification.read
        ).length;

    const readCount =
        notifications.filter(
            (notification) =>
                notification.read
        ).length;

    const filteredNotifications =
        useMemo(() => {
            if (filter === 'all') {
                return notifications;
            }

            if (filter === 'unread') {
                return notifications.filter(
                    (notification) =>
                        !notification.read
                );
            }

            return notifications.filter(
                (notification) =>
                    notification.category ===
                    filter
            );
        }, [
            filter,
            notifications,
        ]);

    function getCategoryIcon(
        category: NotificationCategory
    ) {
        const config =
            categoryConfig[category];

        switch (category) {
            case 'correction':
                return (
                    <CheckSquare2
                        size={20}
                        color={
                            config.foregroundColor
                        }
                    />
                );

            case 'activity':
                return (
                    <BookOpen
                        size={20}
                        color={
                            config.foregroundColor
                        }
                    />
                );

            case 'student':
                return (
                    <GraduationCap
                        size={20}
                        color={
                            config.foregroundColor
                        }
                    />
                );

            default:
                return (
                    <Settings2
                        size={20}
                        color={
                            config.foregroundColor
                        }
                    />
                );
        }
    }

    function getActionLabel(
        notification: EducatorNotification
    ) {
        switch (
        notification.destination.type
        ) {
            case 'correctionQueue':
                return 'Abrir fila';

            case 'studentProfile':
                return 'Ver aluno';

            case 'activityDetail':
                return 'Ver atividade';

            case 'reports':
                return 'Ver relatórios';

            default:
                return notification.read
                    ? 'Lida'
                    : 'Marcar como lida';
        }
    }

    function openNotification(
        notification: EducatorNotification
    ) {
        if (!notification.read) {
            onMarkAsRead(notification.id);
        }

        const destination =
            notification.destination;

        switch (destination.type) {
            case 'correctionQueue':
                onOpenCorrectionQueue();
                return;

            case 'studentProfile':
                onOpenStudent(
                    destination.studentId
                );
                return;

            case 'activityDetail':
                onOpenActivity(
                    destination.activityId
                );
                return;

            case 'reports':
                onOpenReports();
                return;

            default:
                return;
        }
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{
                flex: 1,

                backgroundColor:
                    theme.bgSubtle,
            }}
            contentContainerStyle={{
                paddingHorizontal:
                    horizontalPadding,

                paddingTop: 28,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={
                false
            }
        >
            <View
                style={{
                    width: '100%',
                    maxWidth: 1120,
                    alignSelf: 'center',
                }}
            >
                {/* Voltar à esquerda e ações globais à direita */}

                <View
                    style={{
                        width: '100%',

                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent:
                            'space-between',

                        flexWrap: 'wrap',
                        gap: 12,

                        marginBottom: 24,
                    }}
                >
                    <BackButton
                        label="Dashboard"
                        onPress={onBack}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent:
                                'flex-end',

                            flexWrap: 'wrap',
                            gap: 8,
                        }}
                    >
                        {readCount > 0 && (
                            <AppButton
                                label={
                                    isCompact
                                        ? 'Limpar lidas'
                                        : 'Limpar notificações lidas'
                                }
                                variant="ghost"
                                size="small"
                                iconLeft={
                                    <Trash2
                                        size={16}
                                        color={
                                            theme.danger
                                        }
                                    />
                                }
                                onPress={
                                    onClearReadNotifications
                                }
                            />
                        )}

                        {unreadCount > 0 && (
                            <AppButton
                                label={
                                    isCompact
                                        ? 'Marcar todas'
                                        : 'Marcar todas como lidas'
                                }
                                variant="secondary"
                                size="small"
                                iconLeft={
                                    <Bell
                                        size={16}
                                        color={
                                            theme.primary
                                        }
                                    />
                                }
                                onPress={
                                    onMarkAllAsRead
                                }
                            />
                        )}
                    </View>
                </View>

                {/* Identificação da tela */}

                <View
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            color:
                                theme.textDark,

                            fontFamily:
                                fonts.headlineBold,

                            fontSize: isCompact
                                ? 25
                                : 30,

                            lineHeight: isCompact
                                ? 32
                                : 38,
                        }}
                    >
                        Notificações
                    </Text>

                    <Text
                        style={{
                            maxWidth: 720,
                            marginTop: 6,

                            color:
                                theme.textMuted,

                            fontFamily:
                                fonts.bodyRegular,

                            fontSize: 14,
                            lineHeight: 21,
                        }}
                    >
                        Acompanhe envios, correções,
                        atividades e alunos que precisam
                        de atenção.
                    </Text>
                </View>

                {/* Resumo */}

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',

                        gap: 8,
                        marginBottom: 18,
                    }}
                >
                    <StatusChip
                        label={
                            unreadCount === 1
                                ? '1 não lida'
                                : `${unreadCount} não lidas`
                        }
                        tone={
                            unreadCount > 0
                                ? 'warning'
                                : 'success'
                        }
                        dot
                    />

                    <Text
                        style={{
                            color:
                                theme.textMuted,

                            fontFamily:
                                fonts.bodyRegular,

                            fontSize: 12,
                        }}
                    >
                        Da mais recente para a mais antiga
                    </Text>
                </View>

                {/* Filtros */}

                <AppCard elevated={false}>
                    <Text
                        style={{
                            marginBottom: 10,

                            color:
                                theme.textDark,

                            fontFamily:
                                fonts.bodyBold,

                            fontSize: 13,
                        }}
                    >
                        Filtrar notificações
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 8,
                        }}
                    >
                        {filters.map((option) => {
                            const active =
                                filter === option.value;

                            return (
                                <Pressable
                                    key={option.value}
                                    accessibilityRole="button"
                                    accessibilityState={{
                                        selected: active,
                                    }}
                                    onPress={() =>
                                        setFilter(
                                            option.value
                                        )
                                    }
                                    style={({ pressed }) => ({
                                        minHeight: 40,

                                        paddingHorizontal: 13,

                                        alignItems: 'center',
                                        justifyContent:
                                            'center',

                                        borderWidth: 1,

                                        borderColor: active
                                            ? theme.primary
                                            : theme.border,

                                        borderRadius:
                                            borderRadius.pill,

                                        backgroundColor:
                                            active
                                                ? theme.primary
                                                : theme.card,

                                        opacity: pressed
                                            ? 0.82
                                            : 1,
                                    })}
                                >
                                    <Text
                                        style={{
                                            color: active
                                                ? theme.white
                                                : theme.textMuted,

                                            fontFamily:
                                                fonts.bodyBold,

                                            fontSize: 12,
                                        }}
                                    >
                                        {option.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </AppCard>

                {/* Quantidade encontrada */}

                <Text
                    style={{
                        marginTop: 24,
                        marginBottom: 14,

                        color:
                            theme.textDark,

                        fontFamily:
                            fonts.headlineSemibold,

                        fontSize: 17,
                    }}
                >
                    {filteredNotifications.length}{' '}
                    {filteredNotifications.length ===
                        1
                        ? 'notificação'
                        : 'notificações'}
                </Text>

                {/* Lista */}

                {filteredNotifications.length ===
                    0 ? (
                    <AppCard>
                        <EmptyState
                            icon={
                                <Bell
                                    size={24}
                                    color={
                                        theme.primary
                                    }
                                />
                            }
                            title="Nenhuma notificação encontrada"
                            description={
                                filter === 'unread'
                                    ? 'Você já leu todas as notificações.'
                                    : notifications.length === 0
                                        ? 'Você não possui notificações no momento.'
                                        : 'Nenhum evento corresponde ao filtro selecionado.'
                            }
                        />
                    </AppCard>
                ) : (
                    <View
                        style={{
                            gap: 12,
                        }}
                    >
                        {filteredNotifications.map(
                            (notification) => {
                                const config =
                                    categoryConfig[
                                    notification.category
                                    ];

                                const hasDestination =
                                    notification.destination
                                        .type !== 'none';

                                return (
                                    <AppCard
                                        key={
                                            notification.id
                                        }
                                        elevated={false}
                                        style={{
                                            borderColor:
                                                notification.read
                                                    ? theme.border
                                                    : theme.primaryTint,

                                            backgroundColor:
                                                notification.read
                                                    ? theme.card
                                                    : theme.bgSoft,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection:
                                                    isCompact
                                                        ? 'column'
                                                        : 'row',

                                                alignItems:
                                                    isCompact
                                                        ? 'stretch'
                                                        : 'center',

                                                justifyContent:
                                                    'space-between',

                                                gap: 18,
                                            }}
                                        >
                                            {/* Informações da notificação */}

                                            <View
                                                style={{
                                                    flex: 1,
                                                    minWidth: 0,

                                                    flexDirection: 'row',
                                                    alignItems:
                                                        'flex-start',

                                                    gap: 13,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: 46,
                                                        height: 46,

                                                        flexShrink: 0,

                                                        alignItems:
                                                            'center',

                                                        justifyContent:
                                                            'center',

                                                        borderRadius: 15,

                                                        backgroundColor:
                                                            config
                                                                .backgroundColor,
                                                    }}
                                                >
                                                    {getCategoryIcon(
                                                        notification.category
                                                    )}
                                                </View>

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                'row',

                                                            alignItems:
                                                                'center',

                                                            flexWrap: 'wrap',
                                                            gap: 8,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                flexShrink: 1,

                                                                color:
                                                                    theme.textDark,

                                                                fontFamily:
                                                                    fonts.headlineSemibold,

                                                                fontSize: 15,
                                                                lineHeight: 21,
                                                            }}
                                                        >
                                                            {
                                                                notification.title
                                                            }
                                                        </Text>

                                                        {!notification.read && (
                                                            <StatusChip
                                                                label="Nova"
                                                                tone="warning"
                                                                dot
                                                            />
                                                        )}

                                                        <StatusChip
                                                            label={
                                                                config.label
                                                            }
                                                            tone={
                                                                config.tone
                                                            }
                                                        />
                                                    </View>

                                                    <Text
                                                        style={{
                                                            marginTop: 6,

                                                            color:
                                                                theme.textMuted,

                                                            fontFamily:
                                                                fonts.bodyRegular,

                                                            fontSize: 13,
                                                            lineHeight: 19,
                                                        }}
                                                    >
                                                        {
                                                            notification.description
                                                        }
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            marginTop: 7,

                                                            color:
                                                                theme.textFaint,

                                                            fontFamily:
                                                                fonts.bodyRegular,

                                                            fontSize: 11,
                                                        }}
                                                    >
                                                        {
                                                            notification.createdAtLabel
                                                        }
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* Ações da notificação */}

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',

                                                    justifyContent:
                                                        isCompact
                                                            ? 'center'
                                                            : 'flex-end',

                                                    flexWrap: 'wrap',
                                                    gap: 8,
                                                }}
                                            >
                                                <AppButton
                                                    label={getActionLabel(
                                                        notification
                                                    )}
                                                    variant={
                                                        notification.read
                                                            ? 'ghost'
                                                            : 'secondary'
                                                    }
                                                    size="small"
                                                    disabled={
                                                        notification.read &&
                                                        !hasDestination
                                                    }
                                                    onPress={() =>
                                                        openNotification(
                                                            notification
                                                        )
                                                    }
                                                />

                                                <AppButton
                                                    label="Excluir"
                                                    variant="ghost"
                                                    size="small"
                                                    iconLeft={
                                                        <Trash2
                                                            size={16}
                                                            color={
                                                                theme.danger
                                                            }
                                                        />
                                                    }
                                                    onPress={() =>
                                                        onDeleteNotification(
                                                            notification.id
                                                        )
                                                    }
                                                />
                                            </View>
                                        </View>
                                    </AppCard>
                                );
                            }
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

export default function NotificationsRoute() {
    const router = useRouter();
    const { notifications, markRead, markAllRead, deleteNotification, clearRead } = useProfessorPrototype();

    return (
        <ProfessorRouteShell currentDestination="notifications">
            <NotificationsScreen
                notifications={notifications}
                onBack={() => router.back()}
                onMarkAsRead={markRead}
                onMarkAllAsRead={markAllRead}
                onDeleteNotification={deleteNotification}
                onClearReadNotifications={clearRead}
                onOpenCorrectionQueue={() => router.push('/(professor)/correcoes' as any)}
                onOpenStudent={(studentId) => router.push(({ pathname: '/(professor)/alunos/[studentId]', params: { studentId } } as any))}
                onOpenActivity={(activityId) => router.push(({ pathname: '/(professor)/[activityId]', params: { activityId } } as any))}
                onOpenReports={() => router.push('/(professor)/relatorios' as any)}
            />
        </ProfessorRouteShell>
    );
}