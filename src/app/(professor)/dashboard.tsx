
import { educatorStyles } from '@/components/professor/../../styles/professor/educatorStyles';
import type { Student } from '@/components/professor/../../types/professor';
import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import MetricCard from '@/components/professor/MetricCard';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip from '@/components/professor/StatusChip';
import StudentCard from '@/components/professor/StudentCard';
import { borderRadius, fonts, theme } from '@/constants/theme';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { useRouter } from 'expo-router';
import {
    Plus,
} from 'lucide-react-native';
import {
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

export interface EducatorDashboardScreenProps {
    onOpenActivities: () => void;
    onCreateActivity: () => void;
    onOpenCorrectionQueue: () => void;
    onOpenStudent: (studentId: string) => void;
    onOpenReports: () => void;
    pendingCorrectionsCount: number;
    publishedActivitiesCount: number;
}

/**
 * PROTOTYPE:
 * Dados locais usados somente para demonstrar os diferentes
 * estados do Dashboard sem API ou banco de dados.
 */
const students: Student[] = [
    {
        id: 'student-1',
        name: 'Carlos Lima',
        initials: 'CL',
        className: '5º Ano A',
        engagementStatus: 'attention',
        completedActivities: 7,
        pendingActivities: 3,
        revisionActivities: 1,
        pendingCorrections: 2,
        lastActivityAt: 'há 4 dias',
        trailPosition: 7,
    },
    {
        id: 'student-2',
        name: 'Maria Souza',
        initials: 'MS',
        className: '5º Ano B',
        engagementStatus: 'inactive',
        completedActivities: 3,
        pendingActivities: 5,
        revisionActivities: 0,
        pendingCorrections: 0,
        lastActivityAt: 'há 9 dias',
        trailPosition: 3,
    },
    {
        id: 'student-3',
        name: 'Ravi Martins',
        initials: 'RM',
        className: '5º Ano A',
        engagementStatus: 'attention',
        completedActivities: 8,
        pendingActivities: 2,
        revisionActivities: 1,
        pendingCorrections: 1,
        lastActivityAt: 'há 3 dias',
        trailPosition: 8,
    },
];

const recentSubmissions = [
    {
        id: 'submission-1',
        initials: 'AC',
        studentName: 'Ana Clara',
        activityTitle: 'Descobrindo os biomas brasileiros',
        className: '5º Ano A',
        waitingTime: 'Enviado há 1 hora',
    },
    {
        id: 'submission-2',
        initials: 'LM',
        studentName: 'Lucas Mendes',
        activityTitle: 'Frações no dia a dia',
        className: '5º Ano A',
        waitingTime: 'Enviado há 2 horas',
    },
    {
        id: 'submission-3',
        initials: 'RM',
        studentName: 'Ravi Martins',
        activityTitle:
            'Descobrindo os biomas brasileiros',
        className: '5º Ano A',
        waitingTime:
            'Enviado há 4 horas',
    },
];

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
            contentContainerStyle={{
                flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={[
                    educatorStyles.screenContainer,
                    {
                        paddingHorizontal: isCompact ? 16 : 24,
                    },
                ]}
            >

                <AppCard
                    style={{
                        overflow: 'hidden',
                    }}
                >
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
                            }}
                        >
                            <Text
                                style={{
                                    color:
                                        theme.primaryLight,

                                    fontFamily:
                                        fonts.bodyBold,

                                    fontSize: 11,
                                    letterSpacing: 1.4,

                                    textTransform:
                                        'uppercase',
                                }}
                            >
                                Visão geral
                            </Text>

                            <Text
                                style={{
                                    marginTop: 8,

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
                                Acompanhe suas turmas
                            </Text>

                            <Text
                                style={{
                                    maxWidth: 650,
                                    marginTop: 7,

                                    color:
                                        theme.textMuted,

                                    fontFamily:
                                        fonts.bodyRegular,

                                    fontSize: 15,
                                    lineHeight: 22,
                                }}
                            >
                                Você possui{' '}
                                {pendingCorrectionsCount}{' '}
                                {pendingCorrectionsCount === 1
                                    ? 'envio aguardando correção'
                                    : 'envios aguardando correção'}{' '}
                                e pode acompanhar as prioridades
                                abaixo.
                            </Text>
                        </View>

                        <View
                            style={{
                                width: isCompact
                                    ? '100%'
                                    : undefined,

                                flexDirection: 'row',
                                alignItems: 'center',

                                justifyContent: isCompact
                                    ? 'center'
                                    : 'flex-end',

                                flexWrap: 'wrap',
                                gap: 10,
                            }}
                        >
                            <AppButton
                                label="Nova missão"
                                size="large"
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
                                accessibilityHint="Abre o formulário para criar uma nova atividade"
                            />
                        </View>
                    </View>
                </AppCard>

                {/* Métricas prioritárias */}

                <View style={educatorStyles.section}>
                    <SectionHeader
                        eyebrow="Prioridades"
                        title="O que precisa de atenção"
                        subtitle="Indicadores principais das suas turmas."
                    />
                </View>

                <View
                    style={[
                        educatorStyles.metricsGrid,
                        {
                            marginTop: 16,
                        },
                    ]}
                >
                    <MetricCard
                        label="Aguardando correção"
                        value={pendingCorrectionsCount}
                        helper={
                            pendingCorrectionsCount === 0
                                ? 'Nenhum envio exige ação agora'
                                : 'Priorize os envios mais antigos'
                        }
                        tone={
                            pendingCorrectionsCount === 0
                                ? 'success'
                                : 'warning'
                        }
                        onPress={onOpenCorrectionQueue}
                    />

                    <MetricCard
                        label="Sem atividade há +7 dias"
                        value={3}
                        helper="Alunos que podem precisar de apoio"
                        tone="danger"
                    />

                    <MetricCard
                        label="Atividades publicadas"
                        value={publishedActivitiesCount}
                        helper={
                            publishedActivitiesCount === 1
                                ? '1 missão disponível para os alunos'
                                : `${publishedActivitiesCount} missões disponíveis para os alunos`
                        }
                        tone="primary"
                        onPress={onOpenActivities}
                    />

                    <MetricCard
                        label="Participação da turma"
                        value="84%"
                        helper="Aumento de 6% nos últimos 30 dias"
                        tone="success"
                        onPress={onOpenReports}
                    />
                </View>

                {/* Conteúdo principal em duas colunas */}

                <View
                    style={[
                        educatorStyles.contentGrid,
                        educatorStyles.section,
                    ]}
                >
                    {/* Alunos que precisam de atenção */}

                    <View style={educatorStyles.mainColumn}>
                        <AppCard>
                            <SectionHeader
                                compact
                                title="Alunos em foco"
                                subtitle="Alunos que necessitam de intervenção ou feedback."
                                style={educatorStyles.panelHeaderSpacing}
                                action={
                                    <AppButton
                                        label="Ver relatórios"
                                        variant="ghost"
                                        size="small"
                                        onPress={onOpenReports}
                                    />
                                }
                            />

                            <View style={educatorStyles.stack}>
                                {students.map((student) => (
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
                                title="Ações rápidas"
                                subtitle="Acesse as tarefas mais frequentes."
                                style={educatorStyles.panelHeaderSpacing}
                            />

                            <View
                                style={{
                                    gap: 10,
                                }}
                            >
                                <AppButton
                                    label="Abrir fila de correção"
                                    onPress={onOpenCorrectionQueue}
                                    fullWidth
                                />

                                <AppButton
                                    label="Gerenciar atividades"
                                    onPress={onOpenActivities}
                                    variant="secondary"
                                    fullWidth
                                />

                                <AppButton
                                    label="Consultar relatórios"
                                    onPress={onOpenReports}
                                    variant="ghost"
                                    fullWidth
                                />
                            </View>
                        </AppCard>

                        <AppCard>
                            <SectionHeader
                                compact
                                title="Resumo das turmas"
                                subtitle="Participação nos últimos 30 dias."
                                style={educatorStyles.panelHeaderSpacing}
                            />

                            <View
                                style={{
                                    gap: 18,
                                }}
                            >
                                {/* 5º Ano A */}

                                <View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            gap: 12,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: theme.textDark,
                                                fontFamily: fonts.bodyBold,
                                                fontSize: 13,
                                            }}
                                        >
                                            5º Ano A
                                        </Text>

                                        <Text
                                            style={{
                                                color: theme.primary,
                                                fontFamily: fonts.bodyBold,
                                                fontSize: 13,
                                            }}
                                        >
                                            88%
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            height: 8,
                                            marginTop: 8,
                                            overflow: 'hidden',
                                            borderRadius: borderRadius.pill,
                                            backgroundColor:
                                                theme.bgSoft,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: '88%',
                                                height: '100%',
                                                borderRadius: borderRadius.pill,
                                                backgroundColor:
                                                    theme.primary,
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* 5º Ano B */}

                                <View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            gap: 12,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: theme.textDark,
                                                fontFamily: fonts.bodyBold,
                                                fontSize: 13,
                                            }}
                                        >
                                            5º Ano B
                                        </Text>

                                        <Text
                                            style={{
                                                color: theme.warning,
                                                fontFamily: fonts.bodyBold,
                                                fontSize: 13,
                                            }}
                                        >
                                            76%
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            height: 8,
                                            marginTop: 8,
                                            overflow: 'hidden',
                                            borderRadius: borderRadius.pill,
                                            backgroundColor:
                                                theme.bgSoft,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: '76%',
                                                height: '100%',
                                                borderRadius: borderRadius.pill,
                                                backgroundColor:
                                                    theme.warning,
                                            }}
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
                            title="Últimas entregas"
                            subtitle="Trabalhos enviados recentemente que precisam de avaliação."
                            style={educatorStyles.panelHeaderSpacing}
                            action={
                                <AppButton
                                    label="Ver fila completa"
                                    variant="ghost"
                                    size="small"
                                    onPress={onOpenCorrectionQueue}
                                />
                            }
                        />

                        <View
                            style={{
                                gap: 4,
                            }}
                        >
                            {recentSubmissions.map(
                                (submission, index) => (
                                    <View
                                        key={submission.id}
                                        style={{
                                            flexDirection: isCompact
                                                ? 'column'
                                                : 'row',

                                            alignItems: isCompact
                                                ? 'stretch'
                                                : 'center',

                                            justifyContent: 'space-between',
                                            gap: 12,

                                            paddingVertical: 14,

                                            borderTopWidth:
                                                index === 0 ? 0 : 1,

                                            borderTopColor:
                                                theme.border,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                minWidth: 0,

                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 12,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    flexShrink: 0,

                                                    alignItems: 'center',
                                                    justifyContent: 'center',

                                                    borderRadius: 13,

                                                    backgroundColor:
                                                        theme.bgSoft,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: theme.primary,
                                                        fontFamily:
                                                            fonts.headlineBold,
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    {submission.initials}
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    flex: 1,
                                                    minWidth: 0,
                                                }}
                                            >
                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        color: theme.textDark,
                                                        fontFamily:
                                                            fonts.bodyBold,
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    {submission.studentName}
                                                </Text>

                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        marginTop: 3,
                                                        color: theme.textMuted,
                                                        fontFamily:
                                                            fonts.bodyRegular,
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {submission.activityTitle}
                                                    {' · '}
                                                    {submission.className}
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: 10,
                                            }}
                                        >
                                            <StatusChip
                                                label={submission.waitingTime}
                                                tone="info"
                                            />

                                            <AppButton
                                                label="Corrigir"
                                                size="small"
                                                variant="secondary"
                                                onPress={onOpenCorrectionQueue}
                                            />
                                        </View>
                                    </View>
                                )
                            )}
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

    return (
        <ProfessorRouteShell>
            <EducatorDashboardScreen
                pendingCorrectionsCount={submissions.filter((item) => item.status === 'pending').length}
                publishedActivitiesCount={activities.filter((item) => item.status === 'published').length}
                onOpenActivities={() => router.push('/(professor)/atividades' as any)}
                onCreateActivity={() => router.push('/(professor)/atividades/nova' as any)}
                onOpenCorrectionQueue={() => router.push('/(professor)/correcoes' as any)}
                onOpenStudent={(studentId) => router.push(({ pathname: '/(professor)/alunos/[studentId]', params: { studentId } } as any))}
                onOpenReports={() => router.push('/(professor)/relatorios' as any)}
            />
        </ProfessorRouteShell>
    );
}