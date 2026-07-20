import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import EmptyState from '@/components/professor/EmptyState';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import StatusChip from '@/components/professor/StatusChip';
import { ACTIVITY_FILTERS, ACTIVITY_MESSAGES, ACTIVITY_STATUS_CONFIG } from '@/constants/professor/activities';
import { getHorizontalPadding, isCompactWidth } from '@/constants/professor/prof_Layout';
import { borderRadius, fonts, theme } from '@/constants/theme';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { activitiesStyles } from '@/styles/professor/activities';
import type { Activity, ActivityStatus } from '@/types/professor';
import { useRouter } from 'expo-router';
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';

type ActivityFilter = 'all' | ActivityStatus;

export interface ActivitiesScreenProps {
    activities: Activity[];

    onBack: () => void;
    onCreateActivity: () => void;

    onOpenActivity: (
        activityId: string
    ) => void;

    onEditActivity: (
        activityId: string
    ) => void;

    onDeleteActivity: (
        activityId: string
    ) => void;
}

const filterOptions = ACTIVITY_FILTERS;
const statusConfig = ACTIVITY_STATUS_CONFIG;

/**
 * USER FLOW P2:
 * Centraliza as atividades criadas pelo professor.
 *
 * PROTOTYPE:
 * Busca, filtros, criação, edição e exclusão operam
 * somente sobre o estado local do App.tsx.
 */
function ActivitiesScreen({
    activities,
    onBack,
    onCreateActivity,
    onOpenActivity,
    onEditActivity,
    onDeleteActivity,
}: ActivitiesScreenProps) {
    const { width } =
        useWindowDimensions();

    const isCompact =
        isCompactWidth(width);

    const horizontalPadding =
        getHorizontalPadding(width);

    const [query, setQuery] =
        useState('');

    const [filter, setFilter] =
        useState<ActivityFilter>('all');

    const [
        activityPendingDeletion,
        setActivityPendingDeletion,
    ] = useState<Activity | null>(
        null
    );

    const filteredActivities =
        useMemo(() => {
            const normalizedQuery =
                query.trim().toLowerCase();

            return activities.filter(
                (activity) => {
                    const matchesFilter =
                        filter === 'all' ||
                        activity.status ===
                        filter;

                    const matchesQuery =
                        !normalizedQuery ||
                        activity.title
                            .toLowerCase()
                            .includes(
                                normalizedQuery
                            ) ||
                        activity.className
                            .toLowerCase()
                            .includes(
                                normalizedQuery
                            );

                    return (
                        matchesFilter &&
                        matchesQuery
                    );
                }
            );
        }, [
            activities,
            filter,
            query,
        ]);

    function requestActivityDeletion(
        activity: Activity
    ) {
        setActivityPendingDeletion(
            activity
        );
    }

    function cancelActivityDeletion() {
        setActivityPendingDeletion(null);
    }

    function confirmActivityDeletion() {
        if (!activityPendingDeletion) {
            return;
        }

        const activityId =
            activityPendingDeletion.id;

        setActivityPendingDeletion(null);

        onDeleteActivity(activityId);
    }
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={activitiesStyles.page}
            contentContainerStyle={{
                paddingHorizontal: horizontalPadding,
                paddingTop: 28,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={activitiesStyles.screenContainer}>
                {/* Navegação contextual e ação principal */}

                <View style={activitiesStyles.topBar}>
                    <BackButton label={ACTIVITY_MESSAGES.header.backButton} onPress={onBack} />

                    <AppButton
                        label={ACTIVITY_MESSAGES.header.newActivityButton}
                        onPress={onCreateActivity}
                        iconLeft={
                            <Plus
                                size={18}
                                strokeWidth={2.4}
                                color={
                                    theme.white
                                }
                            />
                        }
                    />
                </View>

                {/* Identificação da tela */}

                <View style={activitiesStyles.headerSection}>
                    <Text style={[activitiesStyles.title, { fontSize: isCompact ? 25 : 30, lineHeight: isCompact ? 32 : 38 }]}> {ACTIVITY_MESSAGES.header.title} </Text>

                    <Text style={activitiesStyles.subtitle}>{ACTIVITY_MESSAGES.header.subtitle}</Text>
                </View>

                {/* Busca e filtros */}

                <AppCard style={activitiesStyles.filterCard}>
                    <Text style={activitiesStyles.fieldLabel}>{ACTIVITY_MESSAGES.search.label}</Text>

                    <TextInput
                        accessibilityLabel={ACTIVITY_MESSAGES.search.label}
                        value={query}
                        onChangeText={setQuery}
                        placeholder={ACTIVITY_MESSAGES.search.placeholder}
                        placeholderTextColor={theme.textFaint}
                        autoCorrect={false}
                        style={activitiesStyles.textInput}
                    />

                    <Text style={[activitiesStyles.fieldLabel, { marginTop: 18, marginBottom: 9 }]}>{ACTIVITY_MESSAGES.filters.label}</Text>

                    <View style={activitiesStyles.filterList}>
                        {filterOptions.map(
                            (option) => {
                                const active =
                                    filter ===
                                    option.value;

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
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: active ? theme.primary : theme.border,
                                            borderRadius: borderRadius.pill,
                                            backgroundColor: active ? theme.primary : theme.card,
                                            opacity: pressed ? 0.82 : 1,
                                        })}
                                    >
                                        <Text style={[activitiesStyles.filterChipText, active && activitiesStyles.filterChipTextActive]}>{option.label}</Text>
                                    </Pressable>
                                );
                            }
                        )}
                    </View>
                </AppCard>

                {/* Contagem */}

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
                    {filteredActivities.length}{' '}
                    {filteredActivities.length ===
                        1
                        ? 'atividade encontrada'
                        : 'atividades encontradas'}
                </Text>

                {/* Lista */}

                {filteredActivities.length ===
                    0 ? (
                    <AppCard>
                        <EmptyState
                            title="Nenhuma atividade encontrada"
                            description={
                                query.trim() ||
                                    filter !== 'all'
                                    ? 'Ajuste a pesquisa ou os filtros para visualizar outras missões.'
                                    : 'Crie uma missão para começar a acompanhar as atividades da turma.'
                            }
                            actionLabel={
                                !query.trim() &&
                                    filter === 'all'
                                    ? 'Criar missão'
                                    : undefined
                            }
                            onAction={
                                !query.trim() &&
                                    filter === 'all'
                                    ? onCreateActivity
                                    : undefined
                            }
                        />
                    </AppCard>
                ) : (
                    <View
                        style={{
                            gap: 14,
                        }}
                    >
                        {filteredActivities.map(
                            (activity) => {
                                const status =
                                    statusConfig[
                                    activity.status
                                    ];

                                const pending =
                                    Math.max(
                                        activity
                                            .submissionsCount -
                                        activity
                                            .correctedCount,
                                        0
                                    );

                                return (
                                    <AppCard
                                        key={activity.id}
                                        elevated={false}
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

                                                        flexWrap:
                                                            'wrap',

                                                        gap: 10,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            flexShrink: 1,

                                                            color:
                                                                theme.textDark,

                                                            fontFamily:
                                                                fonts.headlineSemibold,

                                                            fontSize: 17,
                                                            lineHeight: 23,
                                                        }}
                                                    >
                                                        {activity.title}
                                                    </Text>

                                                    <StatusChip
                                                        label={
                                                            status.label
                                                        }
                                                        tone={
                                                            status.tone
                                                        }
                                                    />
                                                </View>

                                                <Text
                                                    style={{
                                                        marginTop: 8,

                                                        color:
                                                            theme.textMuted,

                                                        fontFamily:
                                                            fonts.bodyRegular,

                                                        fontSize: 13,
                                                        lineHeight: 19,
                                                    }}
                                                >
                                                    {
                                                        activity.className
                                                    }
                                                    {' · '}
                                                    {activity.dueDate
                                                        ? `Entrega: ${activity.dueDate}`
                                                        : 'Sem prazo'}
                                                    {' · '}
                                                    {
                                                        activity
                                                            .attachment
                                                            .name
                                                    }
                                                </Text>

                                                <View
                                                    style={{
                                                        marginTop: 12,

                                                        flexDirection:
                                                            'row',

                                                        flexWrap:
                                                            'wrap',

                                                        gap: 8,
                                                    }}
                                                >
                                                    <StatusChip
                                                        label={`${activity.submissionsCount}/${activity.studentsCount} entregaram`}
                                                        tone="info"
                                                    />

                                                    <StatusChip
                                                        label={`${activity.correctedCount} corrigidas`}
                                                        tone="success"
                                                    />

                                                    {pending > 0 && (
                                                        <StatusChip
                                                            label={`${pending} aguardando correção`}
                                                            tone="warning"
                                                        />
                                                    )}
                                                </View>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection:
                                                        'row',

                                                    alignItems:
                                                        'center',

                                                    flexWrap:
                                                        'wrap',

                                                    gap: 8,
                                                }}
                                            >
                                                <AppButton
                                                    label="Detalhes"
                                                    size="small"
                                                    variant="secondary"
                                                    iconLeft={
                                                        <Eye
                                                            size={16}
                                                            color={
                                                                theme.primary
                                                            }
                                                        />
                                                    }
                                                    onPress={() =>
                                                        onOpenActivity(
                                                            activity.id
                                                        )
                                                    }
                                                />

                                                <AppButton
                                                    label="Editar"
                                                    size="small"
                                                    variant="ghost"
                                                    iconLeft={
                                                        <Edit3
                                                            size={16}
                                                            color={
                                                                theme.primary
                                                            }
                                                        />
                                                    }
                                                    onPress={() =>
                                                        onEditActivity(
                                                            activity.id
                                                        )
                                                    }
                                                />

                                                <AppButton
                                                    label="Excluir"
                                                    size="small"
                                                    variant="danger"
                                                    iconLeft={
                                                        <Trash2
                                                            size={16}
                                                            color={
                                                                theme.white
                                                            }
                                                        />
                                                    }
                                                    onPress={() =>
                                                        requestActivityDeletion(
                                                            activity
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

                {/* Confirmação de exclusão */}

                {!!activityPendingDeletion && (
                    <AppCard
                        elevated={false}
                        style={{
                            marginTop: 20,

                            borderColor:
                                theme.danger,

                            backgroundColor:
                                theme.dangerSoft,
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
                            <View
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            theme.danger,

                                        fontFamily:
                                            fonts.headlineSemibold,

                                        fontSize: 16,
                                    }}
                                >
                                    Excluir esta atividade?
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 5,

                                        color:
                                            theme.textMuted,

                                        fontFamily:
                                            fonts.bodyRegular,

                                        fontSize: 13,
                                        lineHeight: 19,
                                    }}
                                >
                                    A atividade “
                                    {
                                        activityPendingDeletion.title
                                    }
                                    ” será removida do
                                    protótipo.
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 10,
                                }}
                            >
                                <AppButton
                                    label="Cancelar"
                                    variant="secondary"
                                    size="small"
                                    onPress={
                                        cancelActivityDeletion
                                    }
                                />

                                <AppButton
                                    label="Confirmar exclusão"
                                    variant="danger"
                                    size="small"
                                    iconLeft={
                                        <Trash2
                                            size={16}
                                            color={
                                                theme.white
                                            }
                                        />
                                    }
                                    onPress={
                                        confirmActivityDeletion
                                    }
                                />
                            </View>
                        </View>
                    </AppCard>
                )}
            </View>
        </ScrollView>
    );
}

export default function ActivitiesRoute() {
    const router = useRouter();
    const { activities, deleteActivity } = useProfessorPrototype();

    return (
        <ProfessorRouteShell currentDestination="activities">
            <ActivitiesScreen
                activities={activities}
                onBack={() => router.back()}
                onCreateActivity={() => router.push('/(professor)/atividades/nova' as any)}
                onOpenActivity={(activityId) => router.push(({ pathname: '/(professor)/[activityId]', params: { activityId } } as any))}
                onEditActivity={(activityId) => router.push(({ pathname: '/(professor)/[activityId]/editar', params: { activityId } } as any))}
                onDeleteActivity={deleteActivity}
            />
        </ProfessorRouteShell>
    );
}