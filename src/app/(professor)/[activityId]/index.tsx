import type {
    Activity,
    ActivityStatus,
} from '@/components/professor/../../types/professor';
import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import MetricCard from '@/components/professor/MetricCard';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip, {
    type StatusChipTone,
} from '@/components/professor/StatusChip';
import { borderRadius, fonts, theme } from '@/constants/theme';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Download,
    Edit3,
} from 'lucide-react-native';
import { useState } from 'react';
import {
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

export interface ActivityDetailScreenProps {
    activity: Activity;

    onBack: () => void;
    onEdit: () => void;
    onOpenCorrectionQueue: () => void;
}

const statusConfig: Record<
    ActivityStatus,
    {
        label: string;
        tone: StatusChipTone;
    }
> = {
    published: {
        label: 'Publicada',
        tone: 'success',
    },

    draft: {
        label: 'Rascunho',
        tone: 'warning',
    },

    closed: {
        label: 'Encerrada',
        tone: 'neutral',
    },
};

/**
 * USER FLOW:
 * Esta tela complementa P2 e concentra o acompanhamento
 * da atividade publicada.
 */
function ActivityDetailScreen({
    activity,
    onBack,
    onEdit,
    onOpenCorrectionQueue,
}: ActivityDetailScreenProps) {
    const { width } = useWindowDimensions();

    const isCompact = width < 760;

    const [downloadMessage, setDownloadMessage] = useState('');

    const status =
        statusConfig[activity.status];

    const pendingCorrections = Math.max(
        activity.submissionsCount -
        activity.correctedCount,
        0
    );

    const participation =
        activity.studentsCount > 0
            ? Math.round(
                (activity.submissionsCount /
                    activity.studentsCount) *
                100
            )
            : 0;

    function simulateDownload() {
        setDownloadMessage(
            `Download simulado: ${activity.attachment.name}`
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
                paddingHorizontal: isCompact ? 16 : 24,
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
                        label="Atividades"
                        onPress={onBack}
                    />

                    <AppButton
                        label="Editar atividade"
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

                            gap: 20,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                minWidth: 0,
                            }}
                        >
                            <StatusChip
                                label={status.label}
                                tone={status.tone}
                            />

                            <Text
                                style={{
                                    marginTop: 13,

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
                                {activity.title}
                            </Text>

                            <Text
                                style={{
                                    marginTop: 7,

                                    color:
                                        theme.textMuted,

                                    fontFamily:
                                        fonts.bodyRegular,

                                    fontSize: 14,
                                    lineHeight: 21,
                                }}
                            >
                                {activity.className}
                                {' · '}
                                {activity.dueDate
                                    ? `Entrega em ${activity.dueDate}`
                                    : 'Sem prazo definido'}
                            </Text>
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
                        label="Entregas"
                        value={`${activity.submissionsCount}/${activity.studentsCount}`}
                        helper={`${participation}% da turma`}
                        tone="info"
                    />

                    <MetricCard
                        label="Corrigidas"
                        value={activity.correctedCount}
                        helper="Respostas já avaliadas"
                        tone="success"
                    />

                    <MetricCard
                        label="Aguardando correção"
                        value={pendingCorrections}
                        helper="Envios que precisam de ação"
                        tone="warning"
                        onPress={onOpenCorrectionQueue}
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

                            gap: 20,
                        }}
                    >
                        <AppCard>
                            <SectionHeader
                                compact
                                title="Instrução da missão"
                                subtitle="Orientação visível para os alunos."
                                style={{
                                    marginBottom: 16,
                                }}
                            />

                            <Text
                                style={{
                                    color:
                                        theme.textDark,

                                    fontFamily:
                                        fonts.bodyRegular,

                                    fontSize: 15,
                                    lineHeight: 23,
                                }}
                            >
                                {activity.instruction}
                            </Text>
                        </AppCard>

                        <AppCard>
                            <SectionHeader
                                compact
                                title="Material publicado"
                                subtitle="Arquivo disponibilizado para download."
                                style={{
                                    marginBottom: 16,
                                }}
                            />

                            <View
                                style={{
                                    minHeight: 190,
                                    padding: 24,

                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    borderRadius:
                                        borderRadius.xl,

                                    backgroundColor:
                                        theme.bgSubtle,
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            theme.primary,

                                        fontFamily:
                                            fonts.headlineSemibold,

                                        fontSize: 16,
                                        textAlign: 'center',
                                    }}
                                >
                                    {activity.attachment.name}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 6,

                                        color:
                                            theme.textMuted,

                                        fontFamily:
                                            fonts.bodyRegular,

                                        fontSize: 13,
                                    }}
                                >
                                    Tipo:{' '}
                                    {activity.attachment.type.toUpperCase()}
                                </Text>

                                <View
                                    style={{
                                        width: '100%',
                                        alignItems: 'center',
                                        marginTop: 18,
                                    }}
                                >
                                    <AppButton
                                        label="Baixar arquivo"
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
                                    <View
                                        style={{
                                            marginTop: 14,
                                            paddingHorizontal: 14,
                                            paddingVertical: 10,

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
                                                textAlign: 'center',
                                            }}
                                        >
                                            {downloadMessage}
                                        </Text>
                                    </View>
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
                                title="Configuração"
                                subtitle="Resumo da publicação."
                                style={{
                                    marginBottom: 18,
                                }}
                            />

                            <View
                                style={{
                                    gap: 16,
                                }}
                            >
                                <View>
                                    <Text
                                        style={{
                                            color:
                                                theme.textMuted,

                                            fontFamily:
                                                fonts.bodyRegular,

                                            fontSize: 12,
                                        }}
                                    >
                                        Destinatários
                                    </Text>

                                    <Text
                                        style={{
                                            marginTop: 3,

                                            color:
                                                theme.textDark,

                                            fontFamily:
                                                fonts.bodyBold,

                                            fontSize: 14,
                                        }}
                                    >
                                        {activity.className}
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            color:
                                                theme.textMuted,

                                            fontFamily:
                                                fonts.bodyRegular,

                                            fontSize: 12,
                                        }}
                                    >
                                        Recompensa ao aprovar
                                    </Text>

                                    <Text
                                        style={{
                                            marginTop: 3,

                                            color:
                                                theme.textDark,

                                            fontFamily:
                                                fonts.bodyBold,

                                            fontSize: 14,
                                        }}
                                    >
                                        {activity.reward.name}
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            color:
                                                theme.textMuted,

                                            fontFamily:
                                                fonts.bodyRegular,

                                            fontSize: 12,
                                        }}
                                    >
                                        Criada em
                                    </Text>

                                    <Text
                                        style={{
                                            marginTop: 3,

                                            color:
                                                theme.textDark,

                                            fontFamily:
                                                fonts.bodyBold,

                                            fontSize: 14,
                                        }}
                                    >
                                        {activity.createdAt}
                                    </Text>
                                </View>

                                {activity.publishedAt && (
                                    <View>
                                        <Text
                                            style={{
                                                color:
                                                    theme.textMuted,

                                                fontFamily:
                                                    fonts.bodyRegular,

                                                fontSize: 12,
                                            }}
                                        >
                                            Publicada em
                                        </Text>

                                        <Text
                                            style={{
                                                marginTop: 3,

                                                color:
                                                    theme.textDark,

                                                fontFamily:
                                                    fonts.bodyBold,

                                                fontSize: 14,
                                            }}
                                        >
                                            {
                                                activity.publishedAt
                                            }
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {pendingCorrections > 0 && (
                                <AppButton
                                    label="Abrir fila de correção"
                                    onPress={
                                        onOpenCorrectionQueue
                                    }
                                    fullWidth
                                    style={{
                                        marginTop: 22,
                                    }}
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
                    onEdit={() => router.push(({ pathname: '/[activityId]/editar', params: { activityId } } as any))}
                    onOpenCorrectionQueue={() => router.push('/correcoes' as any)}
                />
            ) : (
                <Text>Atividade não encontrada.</Text>
            )}
        </ProfessorRouteShell>
    );
}