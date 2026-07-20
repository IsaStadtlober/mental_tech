import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import MetricCard from '@/components/professor/MetricCard';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import { borderRadius, fonts, theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import {
    Download,
    Share2,
} from 'lucide-react-native';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

type ReportMode =
    | 'class'
    | 'individual';

type ReportPeriod =
    | '7'
    | '30'
    | '90';

export interface ReportsScreenProps {
    onBack: () => void;
}

const reportModes: {
    value: ReportMode;
    label: string;
}[] = [
        {
            value: 'class',
            label: 'Visão da turma',
        },
        {
            value: 'individual',
            label: 'Visão individual',
        },
    ];

const reportPeriods: {
    value: ReportPeriod;
    label: string;
}[] = [
        {
            value: '7',
            label: '7 dias',
        },
        {
            value: '30',
            label: '30 dias',
        },
        {
            value: '90',
            label: '90 dias',
        },
    ];

const students = [
    {
        id: 'student-1',
        name: 'Carlos Lima',
        participation: 72,
        completed: 7,
        pending: 3,
        average: '7,4',
    },
    {
        id: 'student-2',
        name: 'Maria Souza',
        participation: 48,
        completed: 3,
        pending: 5,
        average: '6,8',
    },
    {
        id: 'student-3',
        name: 'Ravi Martins',
        participation: 81,
        completed: 8,
        pending: 2,
        average: '8,7',
    },
];

function ReportsScreen({
    onBack,
}: ReportsScreenProps) {
    const { width } = useWindowDimensions();

    const isCompact = width < 780;

    const [mode, setMode] =
        useState<ReportMode>('class');

    const [period, setPeriod] =
        useState<ReportPeriod>('30');

    const [selectedStudentId, setSelectedStudentId] =
        useState('student-1');

    const [shareMessage, setShareMessage] = useState('');
    const [exportMessage, setExportMessage] = useState('');

    const selectedStudent =
        students.find(
            (student) =>
                student.id ===
                selectedStudentId
        ) ?? students[0];

    function simulateShare() {
        setExportMessage('');

        setShareMessage(
            'Compartilhamento simulado: o link seguro do relatório seria disponibilizado.'
        );
    }

    function simulateExport() {
        setShareMessage('');

        setExportMessage(
            'Exportação simulada: o relatório seria gerado em PDF.'
        );
    }

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

                        marginBottom: 24,
                    }}
                >
                    <BackButton
                        label="Dashboard"
                        onPress={onBack}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',

                            flexWrap: 'wrap',
                            gap: 8,
                        }}
                    >
                        <AppButton
                            label="Compartilhar"
                            variant="ghost"
                            size="small"
                            iconLeft={
                                <Share2
                                    size={17}
                                    color={
                                        theme.primary
                                    }
                                />
                            }
                            onPress={simulateShare}
                        />

                        <AppButton
                            label="Exportar"
                            variant="secondary"
                            size="small"
                            iconLeft={
                                <Download
                                    size={17}
                                    color={
                                        theme.primary
                                    }
                                />
                            }
                            onPress={simulateExport}
                        />
                    </View>
                </View>

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
                        Relatórios
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
                        Acompanhe participação, desempenho e evolução das turmas.
                    </Text>
                </View>

                {!!exportMessage && (
                    <View
                        style={{
                            marginBottom: 18,
                            paddingHorizontal: 14,
                            paddingVertical: 11,

                            borderRadius:
                                borderRadius.lg,

                            backgroundColor:
                                theme.successSoft,
                        }}
                    >
                        <Text
                            style={{
                                color:
                                    theme.success,

                                fontFamily:
                                    fonts.bodyBold,

                                fontSize: 12,
                                lineHeight: 18,
                            }}
                        >
                            {exportMessage}
                        </Text>
                    </View>
                )}

                {!!shareMessage && (
                    <View
                        style={{
                            marginBottom: 18,
                            paddingHorizontal: 14,
                            paddingVertical: 11,

                            borderRadius:
                                borderRadius.lg,

                            backgroundColor:
                                theme.infoSoft,
                        }}
                    >
                        <Text
                            style={{
                                color:
                                    theme.info,

                                fontFamily:
                                    fonts.bodyBold,

                                fontSize: 12,
                                lineHeight: 18,
                            }}
                        >
                            {shareMessage}
                        </Text>
                    </View>
                )}

                <AppCard
                    style={{
                        marginTop: 24,
                    }}
                >
                    <Text
                        style={{
                            marginBottom: 9,

                            color:
                                theme.textDark,

                            fontFamily:
                                fonts.bodyBold,

                            fontSize: 13,
                        }}
                    >
                        Tipo de relatório
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 8,
                        }}
                    >
                        {reportModes.map(
                            (option) => {
                                const active =
                                    mode === option.value;

                                return (
                                    <Pressable
                                        key={option.value}
                                        onPress={() =>
                                            setMode(option.value)
                                        }
                                        style={({ pressed }) => ({
                                            paddingHorizontal: 14,
                                            paddingVertical: 9,

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
                        Período
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 8,
                        }}
                    >
                        {reportPeriods.map(
                            (option) => {
                                const active =
                                    period ===
                                    option.value;

                                return (
                                    <Pressable
                                        key={option.value}
                                        onPress={() =>
                                            setPeriod(
                                                option.value
                                            )
                                        }
                                        style={({ pressed }) => ({
                                            paddingHorizontal: 13,
                                            paddingVertical: 8,

                                            borderWidth: 1,
                                            borderColor: active
                                                ? theme.info
                                                : theme.border,

                                            borderRadius:
                                                borderRadius.pill,

                                            backgroundColor:
                                                active
                                                    ? theme.infoSoft
                                                    : theme.card,

                                            opacity: pressed
                                                ? 0.82
                                                : 1,
                                        })}
                                    >
                                        <Text
                                            style={{
                                                color: active
                                                    ? theme.info
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

                {mode === 'class' ? (
                    <>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 16,
                                marginTop: 20,
                            }}
                        >
                            <MetricCard
                                label="Participação geral"
                                value="84%"
                                helper={`Últimos ${period} dias`}
                                tone="success"
                            />

                            <MetricCard
                                label="Atividades concluídas"
                                value={86}
                                helper="Somando as duas turmas"
                                tone="primary"
                            />

                            <MetricCard
                                label="Em revisão"
                                value={5}
                                helper="Respostas devolvidas"
                                tone="warning"
                            />

                            <MetricCard
                                label="Média geral"
                                value="8,1"
                                helper="Desempenho consolidado"
                                tone="info"
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
                                    flex: 1.25,
                                    width: isCompact
                                        ? '100%'
                                        : undefined,
                                }}
                            >
                                <AppCard>
                                    <SectionHeader
                                        compact
                                        title="Participação por turma"
                                        subtitle={`Comparativo dos últimos ${period} dias.`}
                                        style={{
                                            marginBottom: 20,
                                        }}
                                    />

                                    <View
                                        style={{
                                            gap: 22,
                                        }}
                                    >
                                        {[
                                            {
                                                label:
                                                    '5º Ano A',
                                                value: 88,
                                                color:
                                                    theme.primary,
                                            },
                                            {
                                                label:
                                                    '5º Ano B',
                                                value: 76,
                                                color:
                                                    theme.warning,
                                            },
                                        ].map(
                                            (classItem) => (
                                                <View
                                                    key={
                                                        classItem.label
                                                    }
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                'row',

                                                            justifyContent:
                                                                'space-between',

                                                            gap: 12,
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
                                                            {
                                                                classItem.label
                                                            }
                                                        </Text>

                                                        <Text
                                                            style={{
                                                                color:
                                                                    classItem.color,

                                                                fontFamily:
                                                                    fonts.bodyBold,

                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {
                                                                classItem.value
                                                            }
                                                            %
                                                        </Text>
                                                    </View>

                                                    <View
                                                        style={{
                                                            height: 12,
                                                            marginTop: 9,

                                                            overflow:
                                                                'hidden',

                                                            borderRadius:
                                                                borderRadius.pill,

                                                            backgroundColor:
                                                                theme.bgSoft,
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                width: `${classItem.value}%`,
                                                                height: '100%',

                                                                borderRadius:
                                                                    borderRadius.pill,

                                                                backgroundColor:
                                                                    classItem.color,
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            )
                                        )}
                                    </View>
                                </AppCard>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    width: isCompact
                                        ? '100%'
                                        : undefined,
                                }}
                            >
                                <AppCard>
                                    <SectionHeader
                                        compact
                                        title="Pontos de atenção"
                                        subtitle="Alunos com menor participação."
                                        style={{
                                            marginBottom: 17,
                                        }}
                                    />

                                    <View
                                        style={{
                                            gap: 12,
                                        }}
                                    >
                                        <View
                                            style={{
                                                padding: 14,

                                                borderRadius:
                                                    borderRadius.lg,

                                                backgroundColor:
                                                    theme.dangerSoft,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color:
                                                        theme.danger,

                                                    fontFamily:
                                                        fonts.bodyBold,

                                                    fontSize: 13,
                                                }}
                                            >
                                                Maria Souza
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
                                                48% de participação
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                padding: 14,

                                                borderRadius:
                                                    borderRadius.lg,

                                                backgroundColor:
                                                    theme.warningSoft,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color:
                                                        theme.warning,

                                                    fontFamily:
                                                        fonts.bodyBold,

                                                    fontSize: 13,
                                                }}
                                            >
                                                Carlos Lima
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
                                                72% de participação
                                            </Text>
                                        </View>
                                    </View>
                                </AppCard>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <AppCard
                            style={{
                                marginTop: 20,
                            }}
                        >
                            <Text
                                style={{
                                    marginBottom: 9,

                                    color:
                                        theme.textDark,

                                    fontFamily:
                                        fonts.bodyBold,

                                    fontSize: 13,
                                }}
                            >
                                Selecionar aluno
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 8,
                                }}
                            >
                                {students.map(
                                    (student) => {
                                        const active =
                                            selectedStudentId ===
                                            student.id;

                                        return (
                                            <Pressable
                                                key={student.id}
                                                onPress={() =>
                                                    setSelectedStudentId(
                                                        student.id
                                                    )
                                                }
                                                style={({ pressed }) => ({
                                                    paddingHorizontal: 13,
                                                    paddingVertical: 9,

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
                                                    {student.name}
                                                </Text>
                                            </Pressable>
                                        );
                                    }
                                )}
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
                                label="Participação"
                                value={`${selectedStudent.participation}%`}
                                helper={`Últimos ${period} dias`}
                                tone={
                                    selectedStudent.participation <
                                        60
                                        ? 'danger'
                                        : 'success'
                                }
                            />

                            <MetricCard
                                label="Concluídas"
                                value={
                                    selectedStudent.completed
                                }
                                helper="Atividades finalizadas"
                                tone="primary"
                            />

                            <MetricCard
                                label="Pendentes"
                                value={
                                    selectedStudent.pending
                                }
                                helper="Atividades em aberto"
                                tone="warning"
                            />

                            <MetricCard
                                label="Média"
                                value={
                                    selectedStudent.average
                                }
                                helper="Desempenho recente"
                                tone="info"
                            />
                        </View>

                        <AppCard
                            style={{
                                marginTop: 20,
                            }}
                        >
                            <SectionHeader
                                compact
                                title={`Evolução de ${selectedStudent.name}`}
                                subtitle={`Resumo individual dos últimos ${period} dias.`}
                                style={{
                                    marginBottom: 18,
                                }}
                            />

                            <View
                                style={{
                                    height: 160,
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                    gap: 16,

                                    paddingHorizontal: 12,
                                    paddingTop: 20,

                                    borderRadius:
                                        borderRadius.xl,

                                    backgroundColor:
                                        theme.bgSubtle,
                                }}
                            >
                                {[42, 58, 51, 71, 78, 84].map(
                                    (value, index) => (
                                        <View
                                            key={`${value}-${index}`}
                                            style={{
                                                flex: 1,

                                                alignItems:
                                                    'center',

                                                justifyContent:
                                                    'flex-end',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    marginBottom: 6,

                                                    color:
                                                        theme.textMuted,

                                                    fontFamily:
                                                        fonts.bodyRegular,

                                                    fontSize: 10,
                                                }}
                                            >
                                                {value}%
                                            </Text>

                                            <View
                                                style={{
                                                    width: '100%',
                                                    maxWidth: 64,

                                                    height: `${value}%`,

                                                    borderTopLeftRadius:
                                                        8,

                                                    borderTopRightRadius:
                                                        8,

                                                    backgroundColor:
                                                        theme.primary,
                                                }}
                                            />
                                        </View>
                                    )
                                )}
                            </View>
                        </AppCard>
                    </>
                )}
            </View>
        </ScrollView>
    );
}

export default function ReportsRoute() { const router = useRouter(); return <ProfessorRouteShell currentDestination="reports"><ReportsScreen onBack={() => router.back()} /></ProfessorRouteShell>; }