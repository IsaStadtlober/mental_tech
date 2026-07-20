import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import MetricCard from '@/components/professor/MetricCard';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import { PROFESSOR_REPORTS_MESSAGES } from '@/constants/professor/professor';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Download, Share2, } from 'lucide-react-native';
import {
    Pressable, ScrollView, Text, useWindowDimensions, View,
} from 'react-native';

import { useEducatorReports } from '@/hooks/useEducatorReports';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { reportsStyles as styles } from '@/styles/professor/reports';
import type { ReportsScreenProps } from '@/types/professor';

function ReportsScreen({
    onBack,
}: ReportsScreenProps) {
    const { width } = useWindowDimensions();
    const isCompact = width < 780;

    const { activities, submissions } = useProfessorPrototype();
    const {
        mode,
        setMode,
        period,
        setPeriod,
        selectedStudentId,
        setSelectedStudentId,
        shareMessage,
        exportMessage,
        messages,
        reportModes,
        reportPeriods,
        summary,
        simulateShare,
        simulateExport,
    } = useEducatorReports(activities, submissions);

    const selectedStudent = summary.students.find((student) => student.id === selectedStudentId) ?? summary.students[0];

    return (
        <ScrollView
            style={styles.page}
            contentContainerStyle={{
                paddingHorizontal: isCompact ? 16 : 24,
                paddingTop: 28,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.screenContainer}>
                <View style={styles.topBar}>
                    <BackButton
                        label={PROFESSOR_REPORTS_MESSAGES.header.backButton}
                        onPress={onBack}
                    />

                    <View style={styles.headerActions}>
                        <AppButton
                            label={messages.actions.share}
                            variant="ghost"
                            size="small"
                            iconLeft={<Share2 size={17} color={theme.primary} />}
                            onPress={simulateShare}
                        />

                        <AppButton
                            label={messages.actions.export}
                            variant="secondary"
                            size="small"
                            iconLeft={<Download size={17} color={theme.primary} />}
                            onPress={simulateExport}
                        />
                    </View>
                </View>

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
                        {messages.header.title}
                    </Text>

                    <Text style={styles.subtitle}>
                        {messages.header.subtitle}
                    </Text>
                </View>

                {!!exportMessage && (
                    <View
                        style={[
                            styles.messageBanner,
                            { backgroundColor: theme.successSoft },
                        ]}
                    >
                        <Text style={[styles.messageText, { color: theme.success }]}>
                            {exportMessage}
                        </Text>
                    </View>
                )}

                {!!shareMessage && (
                    <View
                        style={[
                            styles.messageBanner,
                            { backgroundColor: theme.infoSoft },
                        ]}
                    >
                        <Text style={[styles.messageText, { color: theme.info }]}>
                            {shareMessage}
                        </Text>
                    </View>
                )}

                <AppCard style={styles.filtersCard}>
                    <Text style={styles.sectionLabel}>{messages.filters.modeLabel}</Text>

                    <View style={styles.filterList}>
                        {reportModes.map((option) => {
                            const active = mode === option.value;

                            return (
                                <Pressable
                                    key={option.value}
                                    onPress={() => setMode(option.value)}
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

                    <Text style={[styles.sectionLabel, { marginTop: 18 }]}>{messages.filters.periodLabel}</Text>

                    <View style={styles.filterList}>
                        {reportPeriods.map((option) => {
                            const active = period === option.value;

                            return (
                                <Pressable
                                    key={option.value}
                                    onPress={() => setPeriod(option.value)}
                                    style={({ pressed }) => [
                                        styles.periodChip,
                                        active && styles.periodChipActive,
                                        { opacity: pressed ? 0.82 : 1 },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.periodChipText,
                                            active && styles.periodChipTextActive,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </AppCard>

                {mode === 'class' ? (
                    <>
                        <View style={styles.metricsGrid}>
                            <MetricCard
                                label={messages.metrics.participation.label}
                                value={summary.participation}
                                helper={`${messages.overview.periodLabel}${period} dias`}
                                tone="success"
                            />

                            <MetricCard
                                label={messages.metrics.completed.label}
                                value={summary.completedActivities}
                                helper={messages.metrics.completed.helper}
                                tone="primary"
                            />

                            <MetricCard
                                label={messages.metrics.revision.label}
                                value={summary.revisionCount}
                                helper={messages.metrics.revision.helper}
                                tone="warning"
                            />

                            <MetricCard
                                label={messages.metrics.average.label}
                                value={summary.average}
                                helper={messages.metrics.average.helper}
                                tone="info"
                            />
                        </View>

                        <View style={styles.splitLayout}>
                            <View style={[styles.splitPanel, { flexBasis: isCompact ? '100%' : 620 }]}>
                                <AppCard>
                                    <SectionHeader
                                        compact
                                        title={messages.sections.classParticipation.title}
                                        subtitle={`${messages.sections.classParticipation.subtitle}${period} dias.`}
                                        style={{ marginBottom: 20 }}
                                    />

                                    <View style={styles.panelContent}>
                                        {summary.classParticipation.map((classItem) => (
                                            <View key={classItem.label}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                                                    <Text style={{ color: theme.textDark, fontFamily: 'Quicksand_700Bold', fontSize: 14 }}>
                                                        {classItem.label}
                                                    </Text>

                                                    <Text style={{ color: classItem.color, fontFamily: 'Quicksand_700Bold', fontSize: 14 }}>
                                                        {classItem.value}%
                                                    </Text>
                                                </View>

                                                <View style={{ height: 12, marginTop: 9, overflow: 'hidden', borderRadius: 999, backgroundColor: theme.bgSoft }}>
                                                    <View style={{ width: `${classItem.value}%`, height: '100%', borderRadius: 999, backgroundColor: classItem.color }} />
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </AppCard>
                            </View>

                            <View style={[styles.splitPanel, { flexBasis: isCompact ? '100%' : 320 }]}>
                                <AppCard>
                                    <SectionHeader
                                        compact
                                        title={messages.sections.attention.title}
                                        subtitle={messages.sections.attention.subtitle}
                                        style={{ marginBottom: 17 }}
                                    />

                                    <View style={styles.attentionList}>
                                        {summary.attentionStudents.map((student) => (
                                            <View
                                                key={student.name}
                                                style={[
                                                    styles.attentionItem,
                                                    {
                                                        backgroundColor: student.tone === 'danger' ? theme.dangerSoft : theme.warningSoft,
                                                    },
                                                ]}
                                            >
                                                <Text style={[styles.attentionTitle, { color: student.tone === 'danger' ? theme.danger : theme.warning }]}>
                                                    {student.name}
                                                </Text>

                                                <Text style={styles.attentionDescription}>
                                                    {student.participation}% de participação
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </AppCard>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <AppCard style={styles.studentSelectorCard}>
                            <Text style={styles.sectionLabel}>Selecionar aluno</Text>

                            <View style={styles.filterList}>
                                {summary.students.map((student) => {
                                    const active = selectedStudentId === student.id;

                                    return (
                                        <Pressable
                                            key={student.id}
                                            onPress={() => setSelectedStudentId(student.id)}
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
                                                {student.name}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </AppCard>

                        <View style={styles.metricsGrid}>
                            <MetricCard
                                label={messages.metrics.participation.label}
                                value={`${selectedStudent.participation}%`}
                                helper={`${messages.overview.periodLabel}${period} dias`}
                                tone={selectedStudent.participation < 60 ? 'danger' : 'success'}
                            />

                            <MetricCard
                                label={messages.metrics.completed.label}
                                value={selectedStudent.completed}
                                helper={messages.metrics.completed.helper}
                                tone="primary"
                            />

                            <MetricCard
                                label={messages.metrics.pending.label}
                                value={selectedStudent.pending}
                                helper={messages.metrics.pending.helper}
                                tone="warning"
                            />

                            <MetricCard
                                label={messages.metrics.average.label}
                                value={selectedStudent.average}
                                helper={messages.metrics.average.helper}
                                tone="info"
                            />
                        </View>

                        <AppCard style={styles.evolutionCard}>
                            <SectionHeader
                                compact
                                title={`${messages.sections.studentEvolution.title}${selectedStudent.name}`}
                                subtitle={`${messages.sections.studentEvolution.subtitle}${period} dias.`}
                                style={{ marginBottom: 18 }}
                            />

                            <View style={styles.chartContainer}>
                                {[42, 58, 51, 71, 78, 84].map((value, index) => (
                                    <View key={`${value}-${index}`} style={styles.chartBarColumn}>
                                        <Text style={styles.chartBarValue}>{value}%</Text>

                                        <View style={[styles.chartBar, { height: `${value}%` }]} />
                                    </View>
                                ))}
                            </View>
                        </AppCard>
                    </>
                )}
            </View>
        </ScrollView>
    );
}

export default function ReportsRoute() {
    const router = useRouter();
    return <ProfessorRouteShell currentDestination="reports">
        <ReportsScreen onBack={() => router.back()} />
    </ProfessorRouteShell>;
}