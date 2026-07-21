import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import StatusChip from '@/components/professor/StatusChip';
import { CORRECTION_MESSAGES } from '@/constants/professor/corrections';
import { theme } from '@/constants/theme';
import { useProfessorPrototype } from '@/hooks/professor/useProfessorPrototype';
import { PROFESSOR_ROUTES } from '@/router/professor.routes';
import { correctionsStyles } from '@/styles/professor/corrections';
import type { CorrectionScreenProps } from '@/types/professor/corrections';
import { getAttachmentTypeLabel } from '@/utils/corrections';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Download } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';

function CorrectionScreen({
    submission,
    reward,
    onBack,
    onConfirm,
}: CorrectionScreenProps) {
    const { width } = useWindowDimensions();

    const isCompact = width < 800;

    const [decision, setDecision] = useState<'approved' | 'revision'>('approved');

    const [grade, setGrade] = useState('');
    const [comment, setComment] = useState('');
    const [revisionFeedback, setRevisionFeedback] = useState('');
    const [downloadMessage, setDownloadMessage] = useState('');

    function simulateDownload() {
        setDownloadMessage(
            `Download simulado: ${submission.attachment.name}`
        );
    }

    const revisionIsValid = decision !== 'revision' || revisionFeedback.trim().length >= 5;
    const canConfirm = revisionIsValid;

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

    const messages = CORRECTION_MESSAGES;
    const attachmentTypeLabel = getAttachmentTypeLabel(submission.attachment.type);

    return (
        <ScrollView
            style={correctionsStyles.page}
            contentContainerStyle={[
                correctionsStyles.contentContainer,
                { paddingHorizontal: isCompact ? 16 : 24 },
            ]}
            showsVerticalScrollIndicator={false}
        >
            <View style={correctionsStyles.screenContainer}>
                <BackButton
                    label={messages.header.detailBackLabel}
                    onPress={onBack}
                    style={{ marginBottom: 20 }}
                />

                <View style={[correctionsStyles.detailLayout, isCompact ? correctionsStyles.detailLayoutCompact : undefined]}>
                    {/* Coluna da entrega */}

                    <View style={[correctionsStyles.detailMainColumn, isCompact ? correctionsStyles.detailMainColumnCompact : undefined]}>
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
                                    label={attachmentTypeLabel}
                                    tone="info"
                                />
                            </View>
                        </AppCard>

                        <AppCard>
                            <SectionHeader
                                compact
                                title={messages.detail.attachmentTitle}
                                subtitle={messages.detail.attachmentSubtitle}
                                style={{
                                    marginBottom: 16,
                                }}
                            />

                            <View style={correctionsStyles.attachmentPreview}>
                                <View style={correctionsStyles.attachmentBadge}>
                                    <Text style={correctionsStyles.attachmentBadgeText}>
                                        {submission.attachment.type.toUpperCase()}
                                    </Text>
                                </View>

                                <Text style={correctionsStyles.attachmentName}>
                                    {
                                        submission.attachment
                                            .name
                                    }
                                </Text>

                                <Text style={correctionsStyles.attachmentHint}>
                                    No produto real, esta área
                                    receberá o visualizador de
                                    imagem, PDF ou documento.
                                </Text>

                                <View style={correctionsStyles.attachmentActions}>
                                    <AppButton
                                        label={messages.actions.download}
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
                                    <View style={correctionsStyles.downloadFeedback}>
                                        <Text style={correctionsStyles.downloadFeedbackText}>
                                            {downloadMessage}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </AppCard>
                    </View>

                    {/* Coluna de avaliação */}

                    <View style={[correctionsStyles.detailEvaluationColumn, isCompact ? correctionsStyles.detailEvaluationColumnCompact : undefined]}>
                        <AppCard>
                            <SectionHeader
                                compact
                                title={messages.detail.evaluationTitle}
                                subtitle={messages.detail.evaluationSubtitle}
                                style={{
                                    marginBottom: 18,
                                }}
                            />

                            <View style={[correctionsStyles.choiceRow, isCompact ? correctionsStyles.choiceRowCompact : undefined]}>
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
                                    style={({ pressed }) => [
                                        correctionsStyles.choiceOption,
                                        decision === 'approved' ? correctionsStyles.choiceOptionActive : correctionsStyles.choiceOptionInactive,
                                        pressed && correctionsStyles.choiceOptionPressed,
                                    ]}
                                >
                                    <Text style={decision === 'approved' ? correctionsStyles.choiceTitleActive : correctionsStyles.choiceTitle}>
                                        {messages.detail.approve}
                                    </Text>

                                    <Text style={correctionsStyles.choiceSubtitle}>
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
                                    style={({ pressed }) => [
                                        correctionsStyles.choiceOption,
                                        decision === 'revision' ? correctionsStyles.choiceOptionActiveRevision : correctionsStyles.choiceOptionInactive,
                                        pressed && correctionsStyles.choiceOptionPressed,
                                    ]}
                                >
                                    <Text style={decision === 'revision' ? correctionsStyles.choiceTitleActiveRevision : correctionsStyles.choiceTitle}>
                                        {messages.detail.requestRevision}
                                    </Text>

                                    <Text style={correctionsStyles.choiceSubtitle}>
                                        Devolve ao aluno
                                    </Text>
                                </Pressable>
                            </View>

                            <Text style={correctionsStyles.fieldLabel}>{messages.detail.gradeLabel}</Text>

                            <TextInput
                                value={grade}
                                onChangeText={setGrade}
                                placeholder={messages.detail.gradePlaceholder}
                                placeholderTextColor={
                                    theme.textFaint
                                }
                                maxLength={5}
                                style={correctionsStyles.textInput}
                            />

                            <Text style={[correctionsStyles.fieldLabel, { marginTop: 18, marginBottom: 7 }]}>{messages.detail.commentLabel}</Text>

                            <TextInput
                                value={comment}
                                onChangeText={setComment}
                                placeholder={messages.detail.placeholder}
                                placeholderTextColor={
                                    theme.textFaint
                                }
                                multiline
                                maxLength={200}
                                textAlignVertical="top"
                                style={correctionsStyles.textArea}
                            />

                            {decision === 'revision' && (
                                <>
                                    <Text style={[correctionsStyles.fieldLabel, { marginTop: 18, marginBottom: 7 }]}>{messages.detail.revisionLabel} *</Text>

                                    <TextInput
                                        value={revisionFeedback}
                                        onChangeText={
                                            setRevisionFeedback
                                        }
                                        placeholder={messages.detail.revisionPlaceholder}
                                        placeholderTextColor={
                                            theme.textFaint
                                        }
                                        multiline
                                        maxLength={200}
                                        textAlignVertical="top"
                                        style={[
                                            correctionsStyles.textArea,
                                            revisionFeedback.length > 0 && !revisionIsValid
                                                ? correctionsStyles.textAreaInvalid
                                                : correctionsStyles.textAreaWarning,
                                        ]}
                                    />

                                    <Text style={correctionsStyles.helperText}>
                                        {
                                            revisionFeedback.length
                                        }
                                        /200
                                    </Text>
                                </>
                            )}

                            {decision ===
                                'approved' && (
                                    <View style={correctionsStyles.rewardCard}>
                                        <Text style={correctionsStyles.rewardTitle}>
                                            Recompensa que será
                                            liberada
                                        </Text>

                                        <Text style={correctionsStyles.rewardValue}>
                                            {reward.name}
                                        </Text>

                                        <Text style={correctionsStyles.rewardHint}>
                                            Nenhuma moeda é concedida
                                            nesta etapa. As moedas já
                                            foram creditadas no envio
                                            da resposta.
                                        </Text>
                                    </View>
                                )}

                            {!revisionIsValid && (
                                <View style={correctionsStyles.validationHint}>
                                    <Text style={correctionsStyles.validationHintText}>
                                        Escreva um feedback para
                                        que o aluno saiba o que
                                        deve revisar.
                                    </Text>
                                </View>
                            )}

                            <AppButton
                                label={
                                    decision === 'approved'
                                        ? messages.detail.confirm
                                        : messages.detail.requestRevision
                                }
                                variant={
                                    decision === 'approved'
                                        ? 'primary'
                                        : 'secondary'
                                }
                                disabled={!canConfirm}
                                onPress={handleConfirm}
                                fullWidth
                                style={correctionsStyles.confirmButton}
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
                        router.replace(PROFESSOR_ROUTES.CORRECTIONS);
                    }}
                />
            ) : (
                <Text>Envio não encontrado.</Text>
            )}
        </ProfessorRouteShell>
    );
}