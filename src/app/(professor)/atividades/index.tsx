import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import EmptyState from '@/components/professor/EmptyState';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import StatusChip from '@/components/professor/StatusChip';
import { ACTIVITY_FILTERS } from '@/constants/professor/activities';
import { getHorizontalPadding, isCompactWidth } from '@/constants/professor/prof_Layout';
import { theme } from '@/constants/theme';
import { useActivitiesScreen } from '@/hooks/professor/useActivitiesScreen';
import { useProfessorPrototype } from '@/hooks/professor/useProfessorPrototype';
import { PROFESSOR_ROUTES } from '@/router/professor.routes';
import { activitiesStyles } from '@/styles/professor/activities';
import type { ActivitiesScreenProps } from '@/types/professor';
import { useRouter } from 'expo-router';
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react-native';
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';

const filterOptions = ACTIVITY_FILTERS;

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

    const {
        query,
        setQuery,
        filter,
        setFilter,
        activityPendingDeletion,
        filteredActivities,
        countLabel,
        emptyStateConfig,
        messages,
        statusConfig,
        requestActivityDeletion,
        cancelActivityDeletion,
        confirmActivityDeletion,
        getPendingCorrectionsCount,
    } = useActivitiesScreen(activities);
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={activitiesStyles.page}
            contentContainerStyle={[
                activitiesStyles.contentContainer,
                { paddingHorizontal: horizontalPadding },
            ]}
            showsVerticalScrollIndicator={false}
        >
            <View style={activitiesStyles.screenContainer}>
                {/* Navegação contextual e ação principal */}

                <View style={activitiesStyles.topBar}>
                    <BackButton label={messages.header.backButton} onPress={onBack} />

                    <AppButton
                        label={messages.header.newActivityButton}
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
                    <Text style={[activitiesStyles.title, isCompact ? activitiesStyles.titleCompact : activitiesStyles.titleExpanded]}> {messages.header.title} </Text>

                    <Text style={activitiesStyles.subtitle}>{messages.header.subtitle}</Text>
                </View>

                {/* Busca e filtros */}

                <AppCard style={activitiesStyles.filterCard}>
                    <Text style={activitiesStyles.fieldLabel}>{messages.search.label}</Text>

                    <TextInput
                        accessibilityLabel={messages.search.label}
                        value={query}
                        onChangeText={setQuery}
                        placeholder={messages.search.placeholder}
                        placeholderTextColor={theme.textFaint}
                        autoCorrect={false}
                        style={activitiesStyles.textInput}
                    />

                    <Text style={[activitiesStyles.fieldLabel, { marginTop: 18, marginBottom: 9 }]}>{messages.filters.label}</Text>

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
                                        style={({ pressed }) => [
                                            activitiesStyles.filterChipButton,
                                            active && activitiesStyles.filterChipButtonActive,
                                            pressed && activitiesStyles.filterChipButtonPressed,
                                        ]}
                                    >
                                        <Text style={[activitiesStyles.filterChipText, active && activitiesStyles.filterChipTextActive]}>{option.label}</Text>
                                    </Pressable>
                                );
                            }
                        )}
                    </View>
                </AppCard>

                {/* Contagem */}

                <Text style={activitiesStyles.countText}>
                    {filteredActivities.length}{' '}
                    {countLabel}
                </Text>

                {/* Lista */}

                {filteredActivities.length ===
                    0 ? (
                    <AppCard>
                        <EmptyState
                            title={emptyStateConfig.title}
                            description={emptyStateConfig.description}
                            actionLabel={emptyStateConfig.actionLabel}
                            onAction={!query.trim() && filter === 'all' ? onCreateActivity : undefined}
                        />
                    </AppCard>
                ) : (
                    <View style={activitiesStyles.activityList}>
                        {filteredActivities.map(
                            (activity) => {
                                const status =
                                    statusConfig[
                                    activity.status
                                    ];

                                const pending = getPendingCorrectionsCount(activity);

                                return (
                                    <AppCard
                                        key={activity.id}
                                        elevated={false}
                                    >
                                        <View
                                            style={[
                                                activitiesStyles.activityCardContent,
                                                isCompact ? activitiesStyles.activityCardContentColumnCompact : activitiesStyles.activityCardContentRowCompact,
                                            ]}
                                        >
                                            <View style={activitiesStyles.activityCardContentColumn}>
                                                <View style={activitiesStyles.activityHeader}>
                                                    <Text style={activitiesStyles.activityTitle}>
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

                                                <Text style={activitiesStyles.activityMeta}>
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

                                                <View style={activitiesStyles.statusRow}>
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

                                            <View style={activitiesStyles.actionRow}>
                                                <AppButton
                                                    label={messages.actions.details}
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
                                                    label={messages.actions.edit}
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
                                                    label={messages.actions.delete}
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
                        style={activitiesStyles.deleteCard}
                    >
                        <View
                            style={[
                                activitiesStyles.deleteContent,
                                isCompact ? activitiesStyles.deleteContentCompact : null,
                            ]}
                        >
                            <View style={activitiesStyles.activityCardContentColumn}>
                                <Text style={activitiesStyles.deleteTitle}>
                                    {messages.deleteDialog.title}
                                </Text>

                                <Text style={activitiesStyles.deleteDescription}>
                                    {messages.deleteDialog.description.replace('{title}', activityPendingDeletion.title)}
                                </Text>
                            </View>

                            <View style={activitiesStyles.deleteContentRow}>
                                <AppButton
                                    label={messages.deleteDialog.cancel}
                                    variant="secondary"
                                    size="small"
                                    onPress={
                                        cancelActivityDeletion
                                    }
                                />

                                <AppButton
                                    label={messages.deleteDialog.confirm}
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
                                    onPress={() => confirmActivityDeletion(onDeleteActivity)}
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
                onCreateActivity={() => router.push(PROFESSOR_ROUTES.CREATE_ACTIVITY)}
                onOpenActivity={(activityId) => router.push(PROFESSOR_ROUTES.ACTIVITY_DETAIL(activityId) as any)}
                onEditActivity={(activityId) => router.push(PROFESSOR_ROUTES.EDIT_ACTIVITY(activityId) as any)}
                onDeleteActivity={deleteActivity}
            />
        </ProfessorRouteShell>
    );
}