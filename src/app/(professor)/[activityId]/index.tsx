import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import MetricCard from '@/components/professor/MetricCard';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip from '@/components/professor/StatusChip';
import { ACTIVITY_MESSAGES, ACTIVITY_STATUS_CONFIG } from '@/constants/professor/activities';
import { theme } from '@/constants/theme';
import { useActivityDetail } from '@/hooks/useActivityDetail';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { PROFESSOR_ROUTES } from '@/router/professor.routes';
import { activitiesStyles } from '@/styles/professor/activities';
import type { ActivityDetailScreenProps } from '@/types/professor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Download, Edit3 } from 'lucide-react-native';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';

const statusConfig = ACTIVITY_STATUS_CONFIG;

function ActivityDetailScreen({
    activity,
    onBack,
    onEdit,
    onOpenCorrectionQueue,
}: ActivityDetailScreenProps) {
    const { width } = useWindowDimensions();

    const isCompact = width < 760;
    const status = statusConfig[activity.status];
    const {
        downloadMessage,
        pendingCorrections,
        metrics,
        configurationRows,
        headerMeta,
        attachmentTypeLabel,
        simulateDownload,
        messages,
    } = useActivityDetail(activity);

    return (
        <ScrollView
            style={activitiesStyles.page}
            contentContainerStyle={{
                paddingHorizontal: isCompact ? 16 : 24,
                paddingTop: 28,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={activitiesStyles.screenContainer}>
                <View style={activitiesStyles.topBar}>
                    <BackButton label={messages.header.detailsBackLabel} onPress={onBack} />

                    <AppButton
                        label={messages.header.editButton}
                        variant="secondary"
                        iconLeft={
                            <Edit3
                                size={17}
                                color={theme.primary}
                            />
                        }
                        onPress={onEdit}
                    />
                </View>

                <AppCard>
                    <View style={[activitiesStyles.detailHero, isCompact ? undefined : { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}> 
                        <View style={activitiesStyles.detailHeroContent}>
                            <StatusChip
                                label={status.label}
                                tone={status.tone}
                            />

                            <Text style={[activitiesStyles.detailTitle, { fontSize: isCompact ? 24 : 29, lineHeight: isCompact ? 31 : 37 }]}>
                                {activity.title}
                            </Text>

                            <Text style={activitiesStyles.detailSubtitle}>
                                {activity.className}
                                {' · '}
                                {headerMeta}
                            </Text>
                        </View>
                    </View>
                </AppCard>

                <View style={activitiesStyles.metricsRow}>
                    {metrics.map((metric) => (
                        <MetricCard
                            key={metric.label}
                            label={metric.label}
                            value={metric.value}
                            helper={metric.helper}
                            tone={metric.tone}
                            onPress={metric.label === messages.detail.pendingLabel ? onOpenCorrectionQueue : undefined}
                        />
                    ))}
                </View>

                <View style={[activitiesStyles.contentRow, isCompact ? { flexDirection: 'column' } : undefined]}>
                    <View style={[activitiesStyles.contentColumn, isCompact ? { width: '100%' } : undefined]}>
                        <AppCard>
                            <SectionHeader
                                compact
                                title={messages.detail.instructionTitle}
                                subtitle={messages.detail.instructionSubtitle}
                                style={activitiesStyles.detailSection}
                            />

                            <Text style={activitiesStyles.contentText}>
                                {activity.instruction}
                            </Text>
                        </AppCard>

                        <AppCard>
                            <SectionHeader
                                compact
                                title={messages.detail.materialTitle}
                                subtitle={messages.detail.materialSubtitle}
                                style={activitiesStyles.detailSection}
                            />

                            <View style={activitiesStyles.attachmentCard}>
                                <Text style={activitiesStyles.attachmentName}>
                                    {activity.attachment.name}
                                </Text>

                                <Text style={activitiesStyles.attachmentType}>
                                    Tipo:{' '}
                                    {attachmentTypeLabel}
                                </Text>

                                <View style={activitiesStyles.attachmentActions}>
                                    <AppButton
                                        label={messages.actions.download}
                                        variant="secondary"
                                        size="small"
                                        iconLeft={
                                            <Download
                                                size={17}
                                                color={theme.primary}
                                            />
                                        }
                                        onPress={simulateDownload}
                                    />
                                </View>

                                {!!downloadMessage && (
                                    <View style={activitiesStyles.downloadFeedback}>
                                        <Text style={activitiesStyles.downloadFeedbackText}>
                                            {downloadMessage}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </AppCard>
                    </View>

                    <View style={[activitiesStyles.configurationCard, isCompact ? { width: '100%' } : undefined]}>
                        <AppCard>
                            <SectionHeader
                                compact
                                title={messages.detail.configurationTitle}
                                subtitle={messages.detail.configurationSubtitle}
                                style={{ marginBottom: 18 }}
                            />

                            <View style={activitiesStyles.configurationList}>
                                {configurationRows.map((row) => (
                                    <View key={row.label}>
                                        <Text style={activitiesStyles.configurationLabel}>
                                            {row.label}
                                        </Text>

                                        <Text style={activitiesStyles.configurationValue}>
                                            {row.value}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {pendingCorrections > 0 && (
                                <AppButton
                                    label={messages.actions.openCorrections}
                                    onPress={onOpenCorrectionQueue}
                                    fullWidth
                                    style={activitiesStyles.configurationButton}
                                />
                            )}
                        </AppCard>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default function ActivityDetailRoute() {
    const router = useRouter();
    const { activityId } = useLocalSearchParams<{ activityId: string }>();
    const { activities } = useProfessorPrototype();
    const activity = activities.find((item) => item.id === activityId);

    return (
        <ProfessorRouteShell currentDestination="activities">
            {activity ? (
                <ActivityDetailScreen
                    activity={activity}
                    onBack={() => router.back()}
                    onEdit={() => router.push({
                        pathname: PROFESSOR_ROUTES.EDIT_ACTIVITY(activityId),
                        params: { activityId },
                    } as any)}
                    onOpenCorrectionQueue={() => router.push(PROFESSOR_ROUTES.CORRECTIONS as any)}
                />
            ) : (
                <Text>{ACTIVITY_MESSAGES.detail.notFound}</Text>
            )}
        </ProfessorRouteShell>
    );
}