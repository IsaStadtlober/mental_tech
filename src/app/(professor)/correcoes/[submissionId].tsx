import type {
    Reward,
    Submission,
} from '@/components/professor/../../types/professor';
import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip from '@/components/professor/StatusChip';
import { borderRadius, fonts, theme } from '@/constants/theme';
import { useProfessorPrototype } from '@/hooks/useProfessorPrototype';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Download,
} from 'lucide-react-native';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';

type CorrectionDecision =
    | 'approved'
    | 'revision';

interface CorrectionResult {
    decision: CorrectionDecision;
    grade: string;
    comment: string;
    revisionFeedback: string;
    reward: Reward;
}

export interface CorrectionScreenProps {
    submission: Submission;
    reward: Reward;

    onBack: () => void;

    onConfirm: (
        submissionId: string,
        result: CorrectionResult
    ) => void;
}

/**
 * USER FLOW P4:
 * A correção permite aprovar ou solicitar revisão.
 *
 * Aprovação libera somente o asset configurado.
 * Nenhuma moeda é entregue durante a correção.
 *
 * Se o professor solicitar revisão, o feedback é obrigatório.
 */
function CorrectionScreen({
    submission,
    reward,
    onBack,
    onConfirm,
}: CorrectionScreenProps) {
    const { width } = useWindowDimensions();

    const isCompact = width < 800;

    const [decision, setDecision] =
        useState<CorrectionDecision>(
            'approved'
        );

    const [grade, setGrade] =
        useState('');

    const [comment, setComment] =
        useState('');

    const [
        revisionFeedback,
        setRevisionFeedback,
    ] = useState('');

    const [
        downloadMessage,
        setDownloadMessage,
    ] = useState('');

    function simulateDownload() {
        setDownloadMessage(
            `Download simulado: ${submission.attachment.name}`
        );
    }

    const revisionIsValid =
        decision !== 'revision' ||
        revisionFeedback.trim().length >=
        5;

    const canConfirm =
        revisionIsValid;

    function handleConfirm() {
        if (!canConfirm) {
            return;
        }

        onConfirm(submission.id, {
            decision,
            grade: grade.trim(),
            comment: comment.trim(),
            revisionFeedback:
                revisionFeedback.trim(),
            reward,
        });
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
                <BackButton
                    label="Fila de correção"
                    onPress={onBack}
                    style={{
                        marginBottom: 20,
                    }}
                />

                <View
                    style={{
                        marginTop: 24,

                        flexDirection: isCompact
                            ? 'column'
                            : 'row',

                        alignItems: 'flex-start',
                        gap: 20,
                    }}
                >
                    {/* Coluna da entrega */}

                    <View
                        style={{
                            flex: 1.25,
                            width: isCompact
                                ? '100%'
                                : undefined,

                            gap: 20,
                        }}
                    >
                        <AppCard>
                            <SectionHeader
                                compact
                                title={submission.studentName}
                                subtitle={`${submission.activityTitle} · ${submission.className}`}
                                style={{
                                    marginBottom: 16,
                                }}
                            />

                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 8,
                                }}
                            >
                                <StatusChip
                                    label={
                                        submission.waitingTimeLabel
                                    }
                                    tone="warning"
                                    dot
                                />

                                <StatusChip
                                    label={
                                        submission.attachment.type ===
                                            'image'
                                            ? 'Imagem'
                                            : submission.attachment.type ===
                                                'doc'
                                                ? 'Word'
                                                : 'PDF'
                                    }
                                    tone="info"
                                />
                            </View>
                        </AppCard>

                        <AppCard>
                            <SectionHeader
                                compact
                                title="Arquivo enviado"
                                subtitle="Visualizador universal representado no protótipo."
                                style={{
                                    marginBottom: 16,
                                }}
                            />

                            <View
                                style={{
                                    minHeight: 390,
                                    padding: 28,

                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    borderRadius:
                                        borderRadius.xl,

                                    borderWidth: 1,
                                    borderColor:
                                        theme.border,

                                    backgroundColor:
                                        theme.bgSubtle,
                                }}
                            >
                                <View
                                    style={{
                                        width: 76,
                                        height: 76,

                                        alignItems: 'center',
                                        justifyContent: 'center',

                                        borderRadius: 24,

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

                                            fontSize: 18,
                                        }}
                                    >
                                        {submission.attachment.type.toUpperCase()}
                                    </Text>
                                </View>

                                <Text
                                    style={{
                                        marginTop: 18,

                                        color:
                                            theme.textDark,

                                        fontFamily:
                                            fonts.headlineSemibold,

                                        fontSize: 16,
                                        textAlign: 'center',
                                    }}
                                >
                                    {
                                        submission.attachment
                                            .name
                                    }
                                </Text>

                                <Text
                                    style={{
                                        maxWidth: 460,
                                        marginTop: 8,

                                        color:
                                            theme.textMuted,

                                        fontFamily:
                                            fonts.bodyRegular,

                                        fontSize: 13,
                                        lineHeight: 20,
                                        textAlign: 'center',
                                    }}
                                >
                                    No produto real, esta área
                                    receberá o visualizador de
                                    imagem, PDF ou documento.
                                </Text>

                                <View
                                    style={{
                                        width: '100%',
                                        alignItems: 'center',
                                        marginTop: 20,
                                    }}
                                >
                                    <AppButton
                                        label="Baixar resposta"
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

                    {/* Coluna de avaliação */}

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
                                title="Resultado da avaliação"
                                subtitle="Escolha entre aprovar ou devolver para revisão."
                                style={{
                                    marginBottom: 18,
                                }}
                            />

                            <View
                                style={{
                                    flexDirection:
                                        isCompact
                                            ? 'column'
                                            : 'row',

                                    gap: 10,
                                }}
                            >
                                <Pressable
                                    accessibilityRole="button"
                                    accessibilityState={{
                                        selected:
                                            decision ===
                                            'approved',
                                    }}
                                    onPress={() =>
                                        setDecision('approved')
                                    }
                                    style={({ pressed }) => ({
                                        flex: 1,
                                        minHeight: 72,
                                        padding: 14,

                                        justifyContent: 'center',

                                        borderWidth: 2,
                                        borderColor:
                                            decision ===
                                                'approved'
                                                ? theme.success
                                                : theme.border,

                                        borderRadius:
                                            borderRadius.lg,

                                        backgroundColor:
                                            decision ===
                                                'approved'
                                                ? theme.successSoft
                                                : theme.card,

                                        opacity: pressed
                                            ? 0.84
                                            : 1,
                                    })}
                                >
                                    <Text
                                        style={{
                                            color:
                                                decision ===
                                                    'approved'
                                                    ? theme.success
                                                    : theme.textDark,

                                            fontFamily:
                                                fonts.headlineSemibold,

                                            fontSize: 14,
                                        }}
                                    >
                                        Aprovar
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
                                        Conclui a missão
                                    </Text>
                                </Pressable>

                                <Pressable
                                    accessibilityRole="button"
                                    accessibilityState={{
                                        selected:
                                            decision ===
                                            'revision',
                                    }}
                                    onPress={() =>
                                        setDecision('revision')
                                    }
                                    style={({ pressed }) => ({
                                        flex: 1,
                                        minHeight: 72,
                                        padding: 14,

                                        justifyContent: 'center',

                                        borderWidth: 2,
                                        borderColor:
                                            decision ===
                                                'revision'
                                                ? theme.warning
                                                : theme.border,

                                        borderRadius:
                                            borderRadius.lg,

                                        backgroundColor:
                                            decision ===
                                                'revision'
                                                ? theme.warningSoft
                                                : theme.card,

                                        opacity: pressed
                                            ? 0.84
                                            : 1,
                                    })}
                                >
                                    <Text
                                        style={{
                                            color:
                                                decision ===
                                                    'revision'
                                                    ? theme.warning
                                                    : theme.textDark,

                                            fontFamily:
                                                fonts.headlineSemibold,

                                            fontSize: 14,
                                        }}
                                    >
                                        Solicitar revisão
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
                                        Devolve ao aluno
                                    </Text>
                                </Pressable>
                            </View>

                            <Text
                                style={{
                                    marginTop: 20,
                                    marginBottom: 7,

                                    color:
                                        theme.textDark,

                                    fontFamily:
                                        fonts.bodyBold,

                                    fontSize: 13,
                                }}
                            >
                                Nota
                            </Text>

                            <TextInput
                                value={grade}
                                onChangeText={setGrade}
                                placeholder="Ex: 8,5"
                                placeholderTextColor={
                                    theme.textFaint
                                }
                                maxLength={5}
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
                                    marginBottom: 7,

                                    color:
                                        theme.textDark,

                                    fontFamily:
                                        fonts.bodyBold,

                                    fontSize: 13,
                                }}
                            >
                                Comentário geral
                            </Text>

                            <TextInput
                                value={comment}
                                onChangeText={setComment}
                                placeholder="Escreva uma observação para o aluno"
                                placeholderTextColor={
                                    theme.textFaint
                                }
                                multiline
                                maxLength={200}
                                textAlignVertical="top"
                                style={{
                                    minHeight: 96,
                                    paddingHorizontal: 15,
                                    paddingVertical: 13,

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

                            {decision === 'revision' && (
                                <>
                                    <Text
                                        style={{
                                            marginTop: 18,
                                            marginBottom: 7,

                                            color:
                                                theme.textDark,

                                            fontFamily:
                                                fonts.bodyBold,

                                            fontSize: 13,
                                        }}
                                    >
                                        Feedback para revisão *
                                    </Text>

                                    <TextInput
                                        value={revisionFeedback}
                                        onChangeText={
                                            setRevisionFeedback
                                        }
                                        placeholder="Explique claramente o que precisa ser corrigido"
                                        placeholderTextColor={
                                            theme.textFaint
                                        }
                                        multiline
                                        maxLength={200}
                                        textAlignVertical="top"
                                        style={{
                                            minHeight: 105,
                                            paddingHorizontal: 15,
                                            paddingVertical: 13,

                                            borderWidth: 1,
                                            borderColor:
                                                revisionFeedback.length >
                                                    0 &&
                                                    !revisionIsValid
                                                    ? theme.danger
                                                    : theme.warning,

                                            borderRadius:
                                                borderRadius.lg,

                                            backgroundColor:
                                                theme.warningSoft,

                                            color:
                                                theme.textDark,

                                            fontFamily:
                                                fonts.bodyRegular,

                                            fontSize: 14,
                                        }}
                                    />

                                    <Text
                                        style={{
                                            marginTop: 6,
                                            alignSelf:
                                                'flex-end',

                                            color:
                                                theme.textFaint,

                                            fontFamily:
                                                fonts.bodyRegular,

                                            fontSize: 11,
                                        }}
                                    >
                                        {
                                            revisionFeedback.length
                                        }
                                        /200
                                    </Text>
                                </>
                            )}

                            {decision ===
                                'approved' && (
                                    <View
                                        style={{
                                            marginTop: 20,
                                            padding: 15,

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

                                                fontSize: 13,
                                            }}
                                        >
                                            Recompensa que será
                                            liberada
                                        </Text>

                                        <Text
                                            style={{
                                                marginTop: 5,

                                                color:
                                                    theme.textDark,

                                                fontFamily:
                                                    fonts.headlineSemibold,

                                                fontSize: 15,
                                            }}
                                        >
                                            {reward.name}
                                        </Text>

                                        <Text
                                            style={{
                                                marginTop: 7,

                                                color:
                                                    theme.textMuted,

                                                fontFamily:
                                                    fonts.bodyRegular,

                                                fontSize: 12,
                                                lineHeight: 18,
                                            }}
                                        >
                                            Nenhuma moeda é concedida
                                            nesta etapa. As moedas já
                                            foram creditadas no envio
                                            da resposta.
                                        </Text>
                                    </View>
                                )}

                            {!revisionIsValid && (
                                <View
                                    style={{
                                        marginTop: 16,
                                        padding: 13,

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

                                            fontSize: 12,
                                        }}
                                    >
                                        Escreva um feedback para
                                        que o aluno saiba o que
                                        deve revisar.
                                    </Text>
                                </View>
                            )}

                            <AppButton
                                label={
                                    decision === 'approved'
                                        ? 'Confirmar aprovação'
                                        : 'Enviar para revisão'
                                }
                                variant={
                                    decision === 'approved'
                                        ? 'primary'
                                        : 'secondary'
                                }
                                disabled={!canConfirm}
                                onPress={handleConfirm}
                                fullWidth
                                style={{
                                    marginTop: 22,
                                }}
                            />
                        </AppCard>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default function CorrectionRoute() {
    const router = useRouter();
    const { submissionId } = useLocalSearchParams<{ submissionId: string }>();
    const { submissions, activities, confirmCorrection } = useProfessorPrototype();
    const submission = submissions.find((item) => item.id === submissionId);
    const reward = activities.find((item) => item.id === submission?.activityId)?.reward;

    return (
        <ProfessorRouteShell currentDestination="correctionQueue">
            {submission && reward ? (
                <CorrectionScreen
                    submission={submission}
                    reward={reward}
                    onBack={() => router.back()}
                    onConfirm={(id, result) => {
                        confirmCorrection(id, result);
                        router.replace('/(professor)/correcoes' as any);
                    }}
                />
            ) : (
                <Text>Envio não encontrado.</Text>
            )}
        </ProfessorRouteShell>
    );
}