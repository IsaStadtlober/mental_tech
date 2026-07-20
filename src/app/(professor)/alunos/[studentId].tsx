import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import MetricCard from '@/components/professor/MetricCard';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip, {
    StatusChipTone,
} from '@/components/professor/StatusChip';
import { borderRadius, fonts, theme } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Send,
} from 'lucide-react-native';
import {
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

type ProfileStatus =
    | 'engaged'
    | 'attention'
    | 'inactive';

interface StudentProfile {
    id: string;
    name: string;
    initials: string;
    className: string;
    status: ProfileStatus;

    completedActivities: number;
    pendingActivities: number;
    revisionActivities: number;

    participation: string;
    trailPosition: number;
    lastActivityAt: string;
}

interface HistoryItem {
    id: string;
    title: string;

    status:
    | 'approved'
    | 'pending'
    | 'revision';

    dateLabel: string;
    grade?: string;
}

export interface StudentProfileScreenProps {
    studentId: string;

    onBack: () => void;

    onCreateActivity: (
        studentName: string
    ) => void;

    onOpenCorrectionQueue: () => void;
}

const students: StudentProfile[] = [
    {
        id: 'student-1',
        name: 'Carlos Lima',
        initials: 'CL',
        className: '5º Ano A',
        status: 'attention',

        completedActivities: 7,
        pendingActivities: 3,
        revisionActivities: 1,

        participation: '72%',
        trailPosition: 7,
        lastActivityAt: 'há 4 dias',
    },
    {
        id: 'student-2',
        name: 'Maria Souza',
        initials: 'MS',
        className: '5º Ano B',
        status: 'inactive',

        completedActivities: 3,
        pendingActivities: 5,
        revisionActivities: 0,

        participation: '48%',
        trailPosition: 3,
        lastActivityAt: 'há 9 dias',
    },
    {
        id: 'student-3',
        name: 'Ravi Martins',
        initials: 'RM',
        className: '5º Ano A',
        status: 'attention',

        completedActivities: 8,
        pendingActivities: 2,
        revisionActivities: 1,

        participation: '81%',
        trailPosition: 8,
        lastActivityAt: 'há 3 dias',
    },
];

const historyByStudent: Record<
    string,
    HistoryItem[]
> = {
    'student-1': [
        {
            id: 'history-4',
            title:
                'Mapa afetivo do bairro',
            status: 'pending',
            dateLabel:
                'Enviada em 13/07/2026',
        },
        {
            id: 'history-2',
            title: 'Frações no dia a dia',
            status: 'revision',
            dateLabel:
                'Revisão solicitada em 12/07/2026',
            grade: '6,5',
        },
        {
            id: 'history-3',
            title:
                'Leitura e interpretação',
            status: 'approved',
            dateLabel:
                'Concluída em 08/07/2026',
            grade: '8,0',
        },
    ],

    'student-2': [
        {
            id: 'history-4',
            title:
                'Descobrindo os biomas brasileiros',
            status: 'pending',
            dateLabel:
                'Enviada em 13/07/2026',
        },
        {
            id: 'history-5',
            title:
                'Leitura e interpretação',
            status: 'approved',
            dateLabel:
                'Concluída em 05/07/2026',
            grade: '7,0',
        },
    ],

    'student-3': [
        {
            id: 'history-6',
            title:
                'Descobrindo os biomas brasileiros',
            status: 'pending',
            dateLabel:
                'Enviada em 14/07/2026',
        },
        {
            id: 'history-7',
            title: 'Frações no dia a dia',
            status: 'approved',
            dateLabel:
                'Concluída em 10/07/2026',
            grade: '9,0',
        },
        {
            id: 'history-8',
            title:
                'Leitura e interpretação',
            status: 'revision',
            dateLabel:
                'Revisão solicitada em 09/07/2026',
            grade: '7,5',
        },
    ],
};

const profileStatus: Record<
    ProfileStatus,
    {
        label: string;
        tone: StatusChipTone;
    }
> = {
    engaged: {
        label: 'Em dia',
        tone: 'success',
    },

    attention: {
        label: 'Precisa de atenção',
        tone: 'warning',
    },

    inactive: {
        label: 'Sem atividade há +7 dias',
        tone: 'danger',
    },
};

const historyStatus = {
    approved: {
        label: 'Aprovada',
        tone: 'success' as const,
    },

    pending: {
        label: 'Aguardando correção',
        tone: 'warning' as const,
    },

    revision: {
        label: 'Em revisão',
        tone: 'info' as const,
    },
};

/**
 * USER FLOW P5:
 * Oferece uma visão longitudinal do aluno.
 *
 * PROTOTYPE:
 * Os dados pedagógicos são simulados localmente.
 */
function StudentProfileScreen({
    studentId,
    onBack,
    onCreateActivity,
    onOpenCorrectionQueue,
}: StudentProfileScreenProps) {
    const { width } = useWindowDimensions();

    const isCompact = width < 780;

    const student =
        students.find(
            (item) => item.id === studentId
        ) ?? students[0];

    const history =
        historyByStudent[student.id] ?? [];

    const status =
        profileStatus[student.status];

    const trailPercentage = Math.min(
        student.trailPosition * 10,
        100
    );

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor:
                    theme.bgSubtle,
            }}
            contentContainerStyle={{
                paddingHorizontal: isCompact
                    ? 16
                    : 24,
                paddingTop: 28,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    width: '100%',
                    maxWidth: 1180,
                    alignSelf: 'center',
                }}
            >
                <View
                    style={{
                        width: '100%',

                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',

                        flexWrap: 'wrap',
                        gap: 12,

                        marginBottom: 20,
                    }}
                >
                    <BackButton
                        label="Dashboard"
                        onPress={onBack}
                    />

                    <AppButton
                        label={
                            isCompact
                                ? 'Enviar missão'
                                : 'Enviar missão para este aluno'
                        }
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
                        <View
                            style={{
                                flex: 1,
                                minWidth: 0,

                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 16,
                            }}
                        >
                            <View
                                style={{
                                    width: 68,
                                    height: 68,

                                    flexShrink: 0,

                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    borderRadius: 22,

                                    backgroundColor:
                                        theme.primary,
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            theme.white,

                                        fontFamily:
                                            fonts.headlineBold,

                                        fontSize: 20,
                                    }}
                                >
                                    {student.initials}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            theme.textDark,

                                        fontFamily:
                                            fonts.headlineBold,

                                        fontSize: isCompact
                                            ? 24
                                            : 29,

                                        lineHeight: isCompact
                                            ? 31
                                            : 37,
                                    }}
                                >
                                    {student.name}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 4,

                                        color:
                                            theme.textMuted,

                                        fontFamily:
                                            fonts.bodyRegular,

                                        fontSize: 14,
                                    }}
                                >
                                    {student.className}
                                    {' · '}
                                    Última atividade:{' '}
                                    {student.lastActivityAt}
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

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 16,
                        marginTop: 20,
                    }}
                >
                    <MetricCard
                        label="Concluídas"
                        value={
                            student.completedActivities
                        }
                        helper="Nos últimos 30 dias"
                        tone="success"
                    />

                    <MetricCard
                        label="Pendentes"
                        value={
                            student.pendingActivities
                        }
                        helper="Missões em aberto"
                        tone="warning"
                    />

                    <MetricCard
                        label="Em revisão"
                        value={
                            student.revisionActivities
                        }
                        helper="Respostas devolvidas"
                        tone="info"
                    />

                    <MetricCard
                        label="Participação"
                        value={student.participation}
                        helper="Participação recente"
                        tone={
                            student.status === 'inactive'
                                ? 'danger'
                                : 'primary'
                        }
                    />
                </View>

                <View
                    style={{
                        flexDirection: isCompact
                            ? 'column'
                            : 'row',

                        alignItems: 'flex-start',

                        gap: 20,
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            flex: 1.4,

                            width: isCompact
                                ? '100%'
                                : undefined,
                        }}
                    >
                        <AppCard>
                            <SectionHeader
                                compact
                                title="Histórico recente"
                                subtitle="Atividades e avaliações mais recentes."
                                style={{
                                    marginBottom: 18,
                                }}
                            />

                            {history.map(
                                (item, index) => {
                                    const itemStatus =
                                        historyStatus[
                                        item.status
                                        ];

                                    return (
                                        <View
                                            key={item.id}
                                            style={{
                                                paddingVertical: 15,

                                                borderTopWidth:
                                                    index === 0
                                                        ? 0
                                                        : 1,

                                                borderTopColor:
                                                    theme.border,
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

                                                    gap: 12,
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
                                                                theme.textDark,

                                                            fontFamily:
                                                                fonts.bodyBold,

                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Text>

                                                    <Text
                                                        style={{
                                                            marginTop: 4,

                                                            color:
                                                                theme.textMuted,

                                                            fontFamily:
                                                                fonts.bodyRegular,

                                                            fontSize: 12,
                                                        }}
                                                    >
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
                                        label="Ver correções pendentes"
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

                    <View
                        style={{
                            flex: 1,

                            width: isCompact
                                ? '100%'
                                : undefined,

                            gap: 20,
                        }}
                    >
                        <AppCard>
                            <SectionHeader
                                compact
                                title="Posição na trilha"
                                subtitle="Progresso atual do explorador."
                                style={{
                                    marginBottom: 18,
                                }}
                            />

                            <View
                                style={{
                                    padding: 18,

                                    borderRadius:
                                        borderRadius.xl,

                                    backgroundColor:
                                        theme.bgSoft,
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            theme.primary,

                                        fontFamily:
                                            fonts.headlineBold,

                                        fontSize: 28,
                                    }}
                                >
                                    Marco{' '}
                                    {student.trailPosition}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 5,

                                        color:
                                            theme.textMuted,

                                        fontFamily:
                                            fonts.bodyRegular,

                                        fontSize: 13,
                                        lineHeight: 20,
                                    }}
                                >
                                    O avatar avança conforme as
                                    missões são enviadas e
                                    aprovadas.
                                </Text>

                                <View
                                    style={{
                                        height: 10,
                                        marginTop: 18,

                                        overflow: 'hidden',

                                        borderRadius:
                                            borderRadius.pill,

                                        backgroundColor:
                                            theme.card,
                                    }}
                                >
                                    <View
                                        style={{
                                            width:
                                                `${trailPercentage}%`,

                                            height: '100%',

                                            borderRadius:
                                                borderRadius.pill,

                                            backgroundColor:
                                                theme.primary,
                                        }}
                                    />
                                </View>
                            </View>
                        </AppCard>

                        <AppCard>
                            <SectionHeader
                                compact
                                title="Leitura pedagógica"
                                subtitle="Resumo simulado dos últimos 30 dias."
                                style={{
                                    marginBottom: 16,
                                }}
                            />

                            <Text
                                style={{
                                    color:
                                        theme.textMuted,

                                    fontFamily:
                                        fonts.bodyRegular,

                                    fontSize: 14,
                                    lineHeight: 22,
                                }}
                            >
                                {student.status ===
                                    'inactive'
                                    ? 'O aluno está há mais de sete dias sem concluir uma atividade. Considere enviar uma nova missão ou verificar se existe alguma dificuldade de acesso.'
                                    : 'O aluno mantém participação recorrente, mas ainda possui atividades pendentes. Uma missão individual pode ajudar a retomar o ritmo.'}
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
                onCreateActivity={(studentName) => router.push(({ pathname: '/(professor)/atividades/nova', params: { studentName } } as any))}
                onOpenCorrectionQueue={() => router.push('/(professor)/correcoes' as any)}
            />
        </ProfessorRouteShell>
    );
}