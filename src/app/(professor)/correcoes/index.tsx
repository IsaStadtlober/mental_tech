import {
    getHorizontalPadding,
    isCompactWidth,
} from '@/components/professor/../../constants/professorLayout';
import type {
    FileType,
    Submission,
} from '@/components/professor/../../types/professor';
import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import EmptyState from '@/components/professor/EmptyState';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import StatusChip from '@/components/professor/StatusChip';
import { borderRadius, fonts, theme } from '@/constants/theme';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { useRouter } from 'expo-router';
import {
    CheckSquare2,
} from 'lucide-react-native';
import {
    useMemo,
    useState,
} from 'react';
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';

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

const classFilters: {
    value: ClassFilter;
    label: string;
}[] = [
        {
            value: 'all',
            label: 'Todas as turmas',
        },
        {
            value: '5º Ano A',
            label: '5º Ano A',
        },
        {
            value: '5º Ano B',
            label: '5º Ano B',
        },
    ];

const fileTypeLabels: Record<
    FileType,
    string
> = {
    pdf: 'PDF',
    doc: 'Word',
    image: 'Imagem',
};

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
                    maxWidth: 1180,
                    alignSelf: 'center',
                }}
            >
                {/*
          Conforme a regra escolhida:
          pendências à esquerda e voltar à direita.
        */}
                <View
                    style={{
                        width: '100%',

                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',

                        flexWrap: 'wrap',
                        gap: 12,

                        marginBottom: 24,
                    }}
                >
                    <BackButton
                        label="Dashboard"
                        onPress={onBack}
                    />

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
                        Fila de correção
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
                        Priorize os envios mais
                        antigos e acompanhe as
                        atividades que precisam de
                        avaliação.
                    </Text>
                </View>

                {/* Busca e filtros */}

                <AppCard>
                    <Text
                        style={{
                            marginBottom: 8,

                            color:
                                theme.textDark,

                            fontFamily:
                                fonts.bodyBold,

                            fontSize: 13,
                        }}
                    >
                        Pesquisar na fila
                    </Text>

                    <TextInput
                        accessibilityLabel="Pesquisar na fila de correção"
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Nome do aluno ou atividade"
                        placeholderTextColor={
                            theme.textFaint
                        }
                        autoCorrect={false}
                        style={{
                            minHeight: 48,

                            paddingHorizontal: 15,

                            borderWidth: 1,
                            borderColor:
                                theme.border,

                            borderRadius:
                                borderRadius.lg,

                            backgroundColor:
                                theme.bgSubtle,

                            color:
                                theme.textDark,

                            fontFamily:
                                fonts.bodyRegular,

                            fontSize: 14,
                        }}
                    />

                    <Text
                        style={{
                            marginTop: 18,
                            marginBottom: 9,

                            color:
                                theme.textDark,

                            fontFamily:
                                fonts.bodyBold,

                            fontSize: 13,
                        }}
                    >
                        Filtrar por turma
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 8,
                        }}
                    >
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
                            }
                        )}
                    </View>
                </AppCard>

                {/* Resultado da busca */}

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
                    {pendingSubmissions.length}{' '}
                    {pendingSubmissions.length ===
                        1
                        ? 'envio aguardando'
                        : 'envios aguardando'}
                </Text>

                {pendingSubmissions.length ===
                    0 ? (
                    <AppCard>
                        <EmptyState
                            title="Nada para corrigir"
                            description="Seus alunos estão em dia ou nenhum envio corresponde aos filtros selecionados."
                        />
                    </AppCard>
                ) : (
                    <View
                        style={{
                            gap: 14,
                        }}
                    >
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
                                                        index === 0
                                                            ? theme.warningSoft
                                                            : theme.bgSoft,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color:
                                                            index === 0
                                                                ? theme.warning
                                                                : theme.primary,

                                                        fontFamily:
                                                            fonts.headlineBold,

                                                        fontSize: 14,
                                                    }}
                                                >
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

                                                        gap: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color:
                                                                theme.textDark,

                                                            fontFamily:
                                                                fonts.headlineSemibold,

                                                            fontSize: 16,
                                                        }}
                                                    >
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

                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        marginTop: 5,

                                                        color:
                                                            theme.textMuted,

                                                        fontFamily:
                                                            fonts.bodyRegular,

                                                        fontSize: 13,
                                                    }}
                                                >
                                                    {
                                                        submission.activityTitle
                                                    }
                                                    {' · '}
                                                    {
                                                        submission.className
                                                    }
                                                </Text>

                                                <View
                                                    style={{
                                                        marginTop: 10,

                                                        flexDirection:
                                                            'row',

                                                        alignItems:
                                                            'center',

                                                        flexWrap:
                                                            'wrap',

                                                        gap: 8,
                                                    }}
                                                >
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

                                                    <Text
                                                        numberOfLines={1}
                                                        style={{
                                                            flexShrink: 1,

                                                            color:
                                                                theme.textFaint,

                                                            fontFamily:
                                                                fonts.bodyRegular,

                                                            fontSize: 12,
                                                        }}
                                                    >
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
                                            label="Corrigir"
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