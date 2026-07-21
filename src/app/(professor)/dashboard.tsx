import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';

import { MOCK_STUDENTS, RECENT_SUBMISSIONS } from '@/constants/professor/dashboard';
import { PROFESSOR_DASHBOARD_MESSAGES } from '@/constants/professor/professor';
import { theme } from '@/constants/theme';
import { useEducatorDashboard } from '@/hooks/professor/useEducatorDashboard';
import { useProfessorPrototype } from '@/hooks/professor/useProfessorPrototype';
import { PROFESSOR_ROUTES } from '@/router';
import { dashboardStyles as styles } from '@/styles/professor/dashboard';
import { educatorStyles } from '@/styles/professor/educator';
import type { EducatorDashboardScreenProps } from '@/types/professor';

import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import MetricCard from '@/components/professor/MetricCard';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip from '@/components/professor/StatusChip';
import StudentCard from '@/components/professor/StudentCard';

function EducatorDashboardScreen({
    onOpenActivities,
    onCreateActivity,
    onOpenCorrectionQueue,
    onOpenStudent,
    onOpenReports,
    pendingCorrectionsCount,
    publishedActivitiesCount,
}: EducatorDashboardScreenProps) {
    const { width } = useWindowDimensions();
    const isCompact = width < 760;

    return (
        <ScrollView
            style={educatorStyles.page}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[
                    educatorStyles.screenContainer,
                    { paddingHorizontal: isCompact ? 16 : 24 },
                ]}
            >
                {/* Visão Geral */}
                <AppCard style={styles.overviewCard}>
                    <View
                        style={[
                            styles.overviewContent,
                            {
                                flexDirection: isCompact ? 'column' : 'row',
                                alignItems: isCompact ? 'stretch' : 'center',
                            },
                        ]}
                    >
                        <View style={styles.overviewTextContainer}>
                            <Text style={styles.overviewEyebrow}>
                                {PROFESSOR_DASHBOARD_MESSAGES.overview.eyebrow}
                            </Text>
                            <Text
                                style={[
                                    styles.overviewTitle,
                                    {
                                        fontSize: isCompact ? 25 : 30,
                                        lineHeight: isCompact ? 32 : 38,
                                    },
                                ]}
                            >
                                {PROFESSOR_DASHBOARD_MESSAGES.overview.title}
                            </Text>
                            <Text style={styles.overviewDescription}>
                                {PROFESSOR_DASHBOARD_MESSAGES.overview.description(
                                    pendingCorrectionsCount
                                )}
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.overviewActions,
                                {
                                    width: isCompact ? '100%' : undefined,
                                    justifyContent: isCompact ? 'center' : 'flex-end',
                                },
                            ]}
                        >
                            <AppButton
                                label={PROFESSOR_DASHBOARD_MESSAGES.overview.newMissionButton}
                                size="large"
                                onPress={onCreateActivity}
                                iconLeft={<Plus size={18} strokeWidth={2.4} color={theme.white} />}
                                accessibilityHint={
                                    PROFESSOR_DASHBOARD_MESSAGES.overview.newMissionAccessibilityHint
                                }
                            />
                        </View>
                    </View>
                </AppCard>

                {/* Métricas prioritárias */}
                <View style={educatorStyles.section}>
                    <SectionHeader
                        eyebrow={PROFESSOR_DASHBOARD_MESSAGES.priorities.eyebrow}
                        title={PROFESSOR_DASHBOARD_MESSAGES.priorities.title}
                        subtitle={PROFESSOR_DASHBOARD_MESSAGES.priorities.subtitle}
                    />
                </View>

                <View style={[educatorStyles.metricsGrid, { marginTop: 16 }]}>
                    <MetricCard
                        label={
                            PROFESSOR_DASHBOARD_MESSAGES.priorities.metrics.waitingCorrection.label
                        }
                        value={pendingCorrectionsCount}
                        helper={PROFESSOR_DASHBOARD_MESSAGES.priorities.metrics.waitingCorrection.helper(
                            pendingCorrectionsCount
                        )}
                        tone={pendingCorrectionsCount === 0 ? 'success' : 'warning'}
                        onPress={onOpenCorrectionQueue}
                    />
                    <MetricCard
                        label={PROFESSOR_DASHBOARD_MESSAGES.priorities.metrics.noActivity.label}
                        value={3}
                        helper={PROFESSOR_DASHBOARD_MESSAGES.priorities.metrics.noActivity.helper}
                        tone="danger"
                    />
                    <MetricCard
                        label={
                            PROFESSOR_DASHBOARD_MESSAGES.priorities.metrics.publishedActivities.label
                        }
                        value={publishedActivitiesCount}
                        helper={PROFESSOR_DASHBOARD_MESSAGES.priorities.metrics.publishedActivities.helper(
                            publishedActivitiesCount
                        )}
                        tone="primary"
                        onPress={onOpenActivities}
                    />
                    <MetricCard
                        label={
                            PROFESSOR_DASHBOARD_MESSAGES.priorities.metrics.participation.label
                        }
                        value={
                            PROFESSOR_DASHBOARD_MESSAGES.priorities.metrics.participation.value
                        }
                        helper={
                            PROFESSOR_DASHBOARD_MESSAGES.priorities.metrics.participation.helper
                        }
                        tone="success"
                        onPress={onOpenReports}
                    />
                </View>

                {/* Conteúdo principal em duas colunas */}
                <View style={[educatorStyles.contentGrid, educatorStyles.section]}>
                    {/* Alunos em foco */}
                    <View style={educatorStyles.mainColumn}>
                        <AppCard>
                            <SectionHeader
                                compact
                                title={PROFESSOR_DASHBOARD_MESSAGES.studentsInFocus.title}
                                subtitle={
                                    PROFESSOR_DASHBOARD_MESSAGES.studentsInFocus.subtitle
                                }
                                style={educatorStyles.panelHeaderSpacing}
                                action={
                                    <AppButton
                                        label={
                                            PROFESSOR_DASHBOARD_MESSAGES.studentsInFocus
                                                .seeReportsButton
                                        }
                                        variant="ghost"
                                        size="small"
                                        onPress={onOpenReports}
                                    />
                                }
                            />
                            <View style={educatorStyles.stack}>
                                {MOCK_STUDENTS.map((student) => (
                                    <StudentCard
                                        key={student.id}
                                        student={student}
                                        compact={isCompact}
                                        onPress={() => onOpenStudent(student.id)}
                                    />
                                ))}
                            </View>
                        </AppCard>
                    </View>

                    {/* Coluna lateral */}
                    <View style={educatorStyles.sideColumn}>
                        <AppCard>
                            <SectionHeader
                                compact
                                title={PROFESSOR_DASHBOARD_MESSAGES.quickActions.title}
                                subtitle={PROFESSOR_DASHBOARD_MESSAGES.quickActions.subtitle}
                                style={educatorStyles.panelHeaderSpacing}
                            />
                            <View style={{ gap: 10 }}>
                                <AppButton
                                    label={
                                        PROFESSOR_DASHBOARD_MESSAGES.quickActions
                                            .openCorrectionQueue
                                    }
                                    onPress={onOpenCorrectionQueue}
                                    fullWidth
                                />
                                <AppButton
                                    label={
                                        PROFESSOR_DASHBOARD_MESSAGES.quickActions
                                            .manageActivities
                                    }
                                    onPress={onOpenActivities}
                                    variant="secondary"
                                    fullWidth
                                />
                                <AppButton
                                    label={
                                        PROFESSOR_DASHBOARD_MESSAGES.quickActions
                                            .consultReports
                                    }
                                    onPress={onOpenReports}
                                    variant="ghost"
                                    fullWidth
                                />
                            </View>
                        </AppCard>

                        <AppCard>
                            <SectionHeader
                                compact
                                title={PROFESSOR_DASHBOARD_MESSAGES.classSummary.title}
                                subtitle={PROFESSOR_DASHBOARD_MESSAGES.classSummary.subtitle}
                                style={educatorStyles.panelHeaderSpacing}
                            />
                            <View style={styles.classSummaryContainer}>
                                <View>
                                    <View style={styles.classSummaryRow}>
                                        <Text style={styles.classSummaryName}>5º Ano A</Text>
                                        <Text style={styles.classSummaryValuePrimary}>88%</Text>
                                    </View>
                                    <View style={styles.progressBarTrack}>
                                        <View
                                            style={[
                                                styles.progressBarFillPrimary,
                                                { width: '88%' },
                                            ]}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <View style={styles.classSummaryRow}>
                                        <Text style={styles.classSummaryName}>5º Ano B</Text>
                                        <Text style={styles.classSummaryValueWarning}>76%</Text>
                                    </View>
                                    <View style={styles.progressBarTrack}>
                                        <View
                                            style={[
                                                styles.progressBarFillWarning,
                                                { width: '76%' },
                                            ]}
                                        />
                                    </View>
                                </View>
                            </View>
                        </AppCard>
                    </View>
                </View>

                {/* Últimas entregas */}
                <View style={educatorStyles.section}>
                    <AppCard>
                        <SectionHeader
                            title={PROFESSOR_DASHBOARD_MESSAGES.recentSubmissions.title}
                            subtitle={
                                PROFESSOR_DASHBOARD_MESSAGES.recentSubmissions.subtitle
                            }
                            style={educatorStyles.panelHeaderSpacing}
                            action={
                                <AppButton
                                    label={
                                        PROFESSOR_DASHBOARD_MESSAGES.recentSubmissions
                                            .seeFullQueueButton
                                    }
                                    variant="ghost"
                                    size="small"
                                    onPress={onOpenCorrectionQueue}
                                />
                            }
                        />

                        <View style={styles.submissionsContainer}>
                            {RECENT_SUBMISSIONS.map((submission, index) => (
                                <View
                                    key={submission.id}
                                    style={[
                                        styles.submissionRow,
                                        {
                                            flexDirection: isCompact ? 'column' : 'row',
                                            alignItems: isCompact ? 'stretch' : 'center',
                                            borderTopWidth: index === 0 ? 0 : 1,
                                        },
                                    ]}
                                >
                                    <View style={styles.submissionInfo}>
                                        <View style={styles.submissionAvatar}>
                                            <Text style={styles.submissionAvatarText}>
                                                {submission.initials}
                                            </Text>
                                        </View>
                                        <View style={styles.submissionTextContainer}>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.submissionStudentName}
                                            >
                                                {submission.studentName}
                                            </Text>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.submissionActivityTitle}
                                            >
                                                {submission.activityTitle} · {submission.className}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.submissionActions}>
                                        <StatusChip label={submission.waitingTime} tone="info" />
                                        <AppButton
                                            label={
                                                PROFESSOR_DASHBOARD_MESSAGES.recentSubmissions
                                                    .correctButton
                                            }
                                            size="small"
                                            variant="secondary"
                                            onPress={onOpenCorrectionQueue}
                                        />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </AppCard>
                </View>
            </View>
        </ScrollView>
    );
}

export default function DashboardRoute() {
    const router = useRouter();
    const { activities, submissions } = useProfessorPrototype();
    const { pendingCorrectionsCount, publishedActivitiesCount } = useEducatorDashboard(
        activities,
        submissions,
    );

    return (
        <ProfessorRouteShell>
            <EducatorDashboardScreen
                pendingCorrectionsCount={pendingCorrectionsCount}
                publishedActivitiesCount={publishedActivitiesCount}
                onOpenActivities={() => router.push(PROFESSOR_ROUTES.ACTIVITIES as any)}
                onCreateActivity={() => router.push(PROFESSOR_ROUTES.CREATE_ACTIVITY as any)}
                onOpenCorrectionQueue={() => router.push(PROFESSOR_ROUTES.CORRECTIONS as any)}
                onOpenStudent={(studentId) =>
                    router.push(PROFESSOR_ROUTES.STUDENT_PROFILE(studentId) as any)
                }
                onOpenReports={() => router.push(PROFESSOR_ROUTES.REPORTS as any)}
            />
        </ProfessorRouteShell>
    );
}