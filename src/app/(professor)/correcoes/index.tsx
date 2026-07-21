import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import EmptyState from '@/components/professor/EmptyState';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import StatusChip from '@/components/professor/StatusChip';
import { CORRECTION_CLASS_FILTERS, CORRECTION_MESSAGES, FILE_TYPE_LABELS } from '@/constants/professor/corrections';
import { getHorizontalPadding, isCompactWidth } from '@/constants/professor/prof_Layout';
import { borderRadius, fonts, theme } from '@/constants/theme';
import { useProfessorPrototype } from '@/hooks/professor/useProfessorPrototype';
import { correctionsStyles } from '@/styles/professor/corrections';
import type { Submission } from '@/types/professor';
import { useRouter } from 'expo-router';
import { CheckSquare2 } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';

export interface CorrectionQueueScreenProps {
    submissions: Submission[];

    onBack: () => void;

    onOpenSubmission: (
        submissionId: string
    ) => void;
}

type ClassFilter =
    | 'all'
    | '5º Ano A'
    | '5º Ano B';

const classFilters = CORRECTION_CLASS_FILTERS;
const fileTypeLabels = FILE_TYPE_LABELS;

function CorrectionQueueScreen({
    submissions,
    onBack,
    onOpenSubmission,
}: CorrectionQueueScreenProps) {
    const { width } =
        useWindowDimensions();

    const isCompact =
        isCompactWidth(width);

    const horizontalPadding =
        getHorizontalPadding(width);

    const [query, setQuery] =
        useState('');

    const [
        classFilter,
        setClassFilter,
    ] = useState<ClassFilter>('all');

    const pendingSubmissions =
        useMemo(() => {
            const normalizedQuery =
                query.trim().toLowerCase();

            return submissions.filter(
                (submission) => {
                    const needsCorrection =
                        submission.status ===
                        'pending';

                    const matchesClass =
                        classFilter === 'all' ||
                        submission.className ===
                        classFilter;

                    const matchesQuery =
                        !normalizedQuery ||
                        submission.studentName
                            .toLowerCase()
                            .includes(
                                normalizedQuery
                            ) ||
                        submission.activityTitle
                            .toLowerCase()
                            .includes(
                                normalizedQuery
                            );

                    return (
                        needsCorrection &&
                        matchesClass &&
                        matchesQuery
                    );
                }
            );
        }, [
            submissions,
            query,
            classFilter,
        ]);

    const pendingLabel =
        pendingSubmissions.length === 1
            ? '1 pendente'
            : `${pendingSubmissions.length} pendentes`;

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={correctionsStyles.page}
            contentContainerStyle={{
                paddingHorizontal: horizontalPadding,
                paddingTop: 28,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={correctionsStyles.screenContainer}>
                {/*
          Conforme a regra escolhida:
          pendências à esquerda e voltar à direita.
        */}
                <View style={correctionsStyles.topBar}>
                    <BackButton label={CORRECTION_MESSAGES.header.backButton} onPress={onBack} />

                    <StatusChip
                        label={pendingLabel}
                        tone={
                            pendingSubmissions.length > 0
                                ? 'warning'
                                : 'success'
                        }
                        dot
                    />
                </View>

                {/* Identificação da tela */}

                <View style={correctionsStyles.headerSection}>
                    <Text style={[correctionsStyles.title, { fontSize: isCompact ? 25 : 30, lineHeight: isCompact ? 32 : 38 }]}>{CORRECTION_MESSAGES.header.title}</Text>
                    <Text style={correctionsStyles.subtitle}>{CORRECTION_MESSAGES.header.subtitle}</Text>
                </View>

                {/* Busca e filtros */}

                <AppCard style={correctionsStyles.filterCard}>
                    <Text style={correctionsStyles.fieldLabel}>{CORRECTION_MESSAGES.search.label}</Text>

                    <TextInput
                        accessibilityLabel={CORRECTION_MESSAGES.search.label}
                        value={query}
                        onChangeText={setQuery}
                        placeholder={CORRECTION_MESSAGES.search.placeholder}
                        placeholderTextColor={
                            theme.textFaint
                        }
                        autoCorrect={false}
                        style={correctionsStyles.textInput}
                    />

                    <Text style={[correctionsStyles.fieldLabel, { marginTop: 18, marginBottom: 9 }]}>{CORRECTION_MESSAGES.filters.label}</Text>

                    <View style={correctionsStyles.filterList}>
                        {classFilters.map(
                            (option) => {
                                const active =
                                    classFilter ===
                                    option.value;

                                return (
                                    <Pressable
                                        key={option.value}
                                        accessibilityRole="button"
                                        accessibilityState={{
                                            selected: active,
                                        }}
                                        onPress={() =>
                                            setClassFilter(
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
                                        <Text style={[correctionsStyles.filterChipText, active && correctionsStyles.filterChipTextActive]}>
                                            {option.label}
                                        </Text>
                                    </Pressable>
                                );
                            }
                        )}
                    </View>
                </AppCard>

                {/* Resultado da busca */}

                <Text style={correctionsStyles.countText}>{pendingSubmissions.length}{' '}{pendingSubmissions.length === 1 ? CORRECTION_MESSAGES.count.one : CORRECTION_MESSAGES.count.many}</Text>

                {pendingSubmissions.length ===
                    0 ? (
                    <AppCard>
                        <EmptyState
                            title="Nada para corrigir"
                            description="Seus alunos estão em dia ou nenhum envio corresponde aos filtros selecionados."
                        />
                    </AppCard>
                ) : (
                    <View style={correctionsStyles.listStack}>
                        {pendingSubmissions.map(
                            (
                                submission,
                                index
                            ) => (
                                <AppCard
                                    key={submission.id}
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

                                                flexDirection:
                                                    'row',

                                                alignItems:
                                                    'center',

                                                gap: 13,
                                            }}
                                        >
                                            <View style={[correctionsStyles.avatar, { backgroundColor: index === 0 ? theme.warningSoft : theme.bgSoft }]}> 
                                                <Text style={{ color: index === 0 ? theme.warning : theme.primary, fontFamily: fonts.headlineBold, fontSize: 14 }}>
                                                    {submission.studentInitials ??
                                                        submission.studentName
                                                            .split(' ')
                                                            .filter(
                                                                Boolean
                                                            )
                                                            .slice(0, 2)
                                                            .map(
                                                                (part) =>
                                                                    part.charAt(
                                                                        0
                                                                    )
                                                            )
                                                            .join('')
                                                            .toUpperCase()}
                                                </Text>
                                            </View>

                                            <View style={correctionsStyles.submissionMeta}>
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
                                                    <Text style={correctionsStyles.submissionTitle}>
                                                        {
                                                            submission.studentName
                                                        }
                                                    </Text>

                                                    {index === 0 && (
                                                        <StatusChip
                                                            label="Mais antigo"
                                                            tone="warning"
                                                        />
                                                    )}
                                                </View>

                                                <Text numberOfLines={1} style={correctionsStyles.submissionSubtitle}>
                                                    {
                                                        submission.activityTitle
                                                    }
                                                    {' · '}
                                                    {
                                                        submission.className
                                                    }
                                                </Text>

                                                <View style={correctionsStyles.chipsRow}>
                                                    <StatusChip
                                                        label={
                                                            submission.waitingTimeLabel
                                                        }
                                                        tone={
                                                            index === 0
                                                                ? 'warning'
                                                                : 'info'
                                                        }
                                                        dot
                                                    />

                                                    <StatusChip
                                                        label={
                                                            fileTypeLabels[
                                                            submission
                                                                .attachment
                                                                .type
                                                            ]
                                                        }
                                                        tone="neutral"
                                                    />

                                                    <Text numberOfLines={1} style={correctionsStyles.attachmentText}>
                                                        {
                                                            submission
                                                                .attachment
                                                                .name
                                                        }
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        <AppButton
                                            label={CORRECTION_MESSAGES.actions.correct}
                                            onPress={() =>
                                                onOpenSubmission(
                                                    submission.id
                                                )
                                            }
                                            iconLeft={
                                                <CheckSquare2
                                                    size={17}
                                                    color={
                                                        theme.white
                                                    }
                                                />
                                            }
                                        />
                                    </View>
                                </AppCard>
                            )
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

export default function CorrectionQueueRoute() {
    const router = useRouter();
    const { submissions } = useProfessorPrototype();

    return (
        <ProfessorRouteShell currentDestination="correctionQueue">
            <CorrectionQueueScreen
                submissions={submissions}
                onBack={() => router.back()}
                onOpenSubmission={(submissionId) => router.push(({ pathname: '/(professor)/correcoes/[submissionId]', params: { submissionId } } as any))}
            />
        </ProfessorRouteShell>
    );
}