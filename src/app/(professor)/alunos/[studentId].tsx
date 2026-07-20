import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import MetricCard from '@/components/professor/MetricCard';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip from '@/components/professor/StatusChip';
import { STUDENT_HISTORY_BY_ID, STUDENT_PROFILE_DATA } from '@/constants/professor/studentProfileData';
import { STUDENT_PROFILE_STATUS_CONFIG } from '@/constants/professor/students';
import { theme } from '@/constants/theme';
import { useStudentProfile } from '@/hooks/useStudentProfile';
import { PROFESSOR_ROUTES } from '@/router/professor.routes';
import { studentsStyles } from '@/styles/professor/students';
import type { StudentProfileScreenProps } from '@/types/professor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Send } from 'lucide-react-native';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';

const profileStatus = STUDENT_PROFILE_STATUS_CONFIG;

function StudentProfileScreen({
    studentId,
    onBack,
    onCreateActivity,
    onOpenCorrectionQueue,
}: StudentProfileScreenProps) {
    const { width } = useWindowDimensions();

    const isCompact = width < 780;

    const student =
        STUDENT_PROFILE_DATA.find(
            (item) => item.id === studentId
        ) ?? STUDENT_PROFILE_DATA[0];

    const history =
        STUDENT_HISTORY_BY_ID[student.id] ?? [];

    const status = profileStatus[student.status];
    const {
        metrics,
        historyStatusConfig,
        pedagogyMessage,
        heroMeta,
        trailPercentage,
        messages,
    } = useStudentProfile(student);

    return (
        <ScrollView
            style={studentsStyles.page}
            contentContainerStyle={{
                paddingHorizontal: isCompact ? 16 : 24,
                paddingTop: 28,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={studentsStyles.screenContainer}>
                <View style={studentsStyles.topBar}>
                    <BackButton label={messages.header.backButton} onPress={onBack} />

                    <AppButton
                        label={isCompact ? messages.header.createActivityButtonCompact : messages.header.createActivityButton}
                        iconLeft={
                            <Send
                                size={17}
                                color={theme.white}
                            />
                        }
                        onPress={() =>
                            onCreateActivity(student.name)
                        }
                    />
                </View>

                <AppCard>
                    <View
                        style={{
                            flexDirection: isCompact
                                ? 'column'
                                : 'row',

                            alignItems: isCompact
                                ? 'stretch'
                                : 'center',

                            justifyContent:
                                'space-between',

                            gap: 22,
                        }}
                    >
                        <View style={studentsStyles.profileHeader}>
                            <View style={studentsStyles.avatar}>
                                <Text style={studentsStyles.avatarText}>
                                    {student.initials}
                                </Text>
                            </View>

                            <View style={studentsStyles.profileText}>
                                <Text style={[studentsStyles.profileName, { fontSize: isCompact ? 24 : 29, lineHeight: isCompact ? 31 : 37 }]}>
                                    {student.name}
                                </Text>

                                <Text style={studentsStyles.profileMeta}>
                                    {student.className}
                                    {' · '}
                                    {heroMeta}
                                </Text>

                                <StatusChip
                                    label={status.label}
                                    tone={status.tone}
                                    dot
                                    style={{
                                        marginTop: 10,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </AppCard>

                <View style={studentsStyles.metricsGrid}>
                    {metrics.map((metric) => (
                        <MetricCard
                            key={metric.label}
                            label={metric.label}
                            value={metric.value}
                            helper={metric.helper}
                            tone={metric.tone}
                        />
                    ))}
                </View>

                <View style={[studentsStyles.splitLayout, { flexDirection: isCompact ? 'column' : 'row' }]}> 
                    <View style={{ flex: 1.4, width: isCompact ? '100%' : undefined }}>
                        <AppCard>
                            <SectionHeader
                                compact
                                title={messages.sections.history.title}
                                subtitle={messages.sections.history.subtitle}
                                style={{
                                    marginBottom: 18,
                                }}
                            />

                            {history.map(
                                (item, index) => {
                                    const itemStatus = historyStatusConfig[item.status];

                                    return (
                                        <View key={item.id} style={[studentsStyles.historyItem, { borderTopWidth: index === 0 ? 0 : 1 }]}> 
                                            <View style={[studentsStyles.historyRow, { flexDirection: isCompact ? 'column' : 'row', alignItems: isCompact ? 'stretch' : 'center' }]}> 
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <Text style={studentsStyles.historyTitle}>
                                                        {item.title}
                                                    </Text>

                                                    <Text style={studentsStyles.historyMeta}>
                                                        {item.dateLabel}

                                                        {item.grade
                                                            ? ` · Nota: ${item.grade}`
                                                            : ''}
                                                    </Text>
                                                </View>

                                                <StatusChip
                                                    label={
                                                        itemStatus.label
                                                    }
                                                    tone={
                                                        itemStatus.tone
                                                    }
                                                />
                                            </View>
                                        </View>
                                    );
                                }
                            )}

                            {history.some(
                                (item) =>
                                    item.status === 'pending'
                            ) && (
                                    <AppButton
                                        label={messages.actions.openCorrections}
                                        variant="secondary"
                                        onPress={
                                            onOpenCorrectionQueue
                                        }
                                        style={{
                                            alignSelf:
                                                'flex-start',
                                            marginTop: 16,
                                        }}
                                    />
                                )}
                        </AppCard>
                    </View>

                    <View style={{ flex: 1, width: isCompact ? '100%' : undefined, gap: 20 }}>
                        <AppCard>
                            <SectionHeader
                                compact
                                title={messages.sections.trail.title}
                                subtitle={messages.sections.trail.subtitle}
                                style={{
                                    marginBottom: 18,
                                }}
                            />

                            <View style={studentsStyles.trailCard}>
                                <Text style={studentsStyles.trailTitle}>
                                    Marco{' '}
                                    {student.trailPosition}
                                </Text>

                                <Text style={studentsStyles.trailBody}>
                                    O avatar avança conforme as
                                    missões são enviadas e
                                    aprovadas.
                                </Text>

                                <View style={studentsStyles.trailBarTrack}>
                                    <View style={[studentsStyles.trailBarFill, { width: `${trailPercentage}%` }]} />
                                </View>
                            </View>
                        </AppCard>

                        <AppCard>
                            <SectionHeader
                                compact
                                title={messages.sections.pedagogy.title}
                                subtitle={messages.sections.pedagogy.subtitle}
                                style={{
                                    marginBottom: 16,
                                }}
                            />

                            <Text style={studentsStyles.pedagogyText}>
                                {pedagogyMessage}
                            </Text>
                        </AppCard>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default function StudentRoute() {
    const router = useRouter();
    const { studentId } = useLocalSearchParams<{ studentId: string }>();

    return (
        <ProfessorRouteShell>
            <StudentProfileScreen
                studentId={studentId}
                onBack={() => router.back()}
                onCreateActivity={(studentName) => router.push({
                    pathname: PROFESSOR_ROUTES.CREATE_ACTIVITY,
                    params: { studentName },
                } as any)}
                onOpenCorrectionQueue={() => router.push(PROFESSOR_ROUTES.CORRECTIONS as any)}
            />
        </ProfessorRouteShell>
    );
}