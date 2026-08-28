import AppButton from "@/components/professor/AppButton";
import AppCard from "@/components/professor/AppCard";
import BackButton from "@/components/professor/BackButton";
import { ProfessorRouteShell } from "@/components/professor/ProfessorRouteShell";
import SectionHeader from "@/components/professor/SectionHeader";
import StatusChip from "@/components/professor/StatusChip";
import { CORRECTION_MESSAGES } from "@/constants/professor/corrections";
import { theme } from "@/constants/theme";
import { PROFESSOR_ROUTES } from "@/router/professor.routes";
import { correctionsStyles } from "@/styles/professor/corrections";
import type { CorrectionScreenProps } from "@/types/professor/corrections";
import type { Reward } from "@/types/professor/activities";
import { getAttachmentTypeLabel } from "@/utils/professor/corrections";
import { useProfessorData } from "@/hooks/professor/useProfessorData";
import { supabase } from "@/service/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Download } from "lucide-react-native";
import { useState } from "react";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import {
  Alert,
  Linking,
  Pressable,
  Platform,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

function CorrectionScreen({
  submission,
  reward,
  onBack,
  onConfirm,
}: CorrectionScreenProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 800;

  const [decision, setDecision] = useState<"approved" | "revision">("approved");
  const [grade, setGrade] = useState("");
  const [comment, setComment] = useState("");
  const [revisionFeedback, setRevisionFeedback] = useState("");

  // 1. Função para abrir o arquivo no navegador/leitor do celular
  async function handleOpenAttachment() {
    console.log("=== 1. INICIANDO handleOpenAttachment ===");
    console.log(
      "Attachment completo:",
      JSON.stringify(submission.attachment, null, 2),
    );

    const fileUrl = submission.attachment?.url || submission.attachment?.uri;

    console.log("=== 2. URL ENCONTRADA ===", fileUrl);

    if (!fileUrl) {
      console.log(
        "❌ ERRO: Nenhuma URL de arquivo encontrada no submission.attachment",
      );
      Alert.alert(
        "Aviso",
        "Nenhum link de arquivo foi encontrado para esta entrega.",
      );
      return;
    }

    try {
      console.log("=== 3. PLATAFORMA ===", Platform.OS);

      if (Platform.OS === "web") {
        console.log("Tentando abrir via Linking no navegador...");
        await Linking.openURL(fileUrl);
        return;
      }

      // Processamento de nome e extensao
      const extension =
        fileUrl.split(".").pop()?.split("?")[0]?.toLowerCase() || "pdf";
      const fileName = `resposta_${submission.id}.${extension}`;
      const localUri = `${FileSystem.documentDirectory}${fileName}`;

      console.log("=== 4. CAMINHO LOCAL PREPARADO ===");
      console.log("Extensão:", extension);
      console.log("Destino local:", localUri);

      console.log("=== 5. INICIANDO DOWNLOAD... ===");
      const downloadResult = await FileSystem.downloadAsync(fileUrl, localUri);

      console.log("=== 6. DOWNLOAD CONCLUÍDO ===");
      console.log("Status HTTP:", downloadResult.status);
      console.log("URI gerada:", downloadResult.uri);

      if (downloadResult.status !== 200) {
        console.log("❌ ERRO HTTP NO DOWNLOAD:", downloadResult.status);
        Alert.alert(
          "Erro",
          `Falha ao baixar arquivo. Status HTTP: ${downloadResult.status}`,
        );
        return;
      }

      console.log("=== 7. VERIFICANDO EXPO SHARING ===");
      const isAvailable = await Sharing.isAvailableAsync();
      console.log("Sharing.isAvailableAsync():", isAvailable);

      if (isAvailable) {
        console.log("=== 8. ABRINDO SHARING NATIVO ===");
        await Sharing.shareAsync(downloadResult.uri, {
          dialogTitle: "Abrir resposta do aluno",
        });
        console.log("=== 9. SHARING EXECUTADO COM SUCESSO ===");
      } else {
        console.log("⚠️ Sharing não disponível neste dispositivo");
        Alert.alert("Baixado", `Salvo em: ${downloadResult.uri}`);
      }
    } catch (error: any) {
      console.error("❌ CAPTURADO NO CATCH:", error);
      Alert.alert(
        "Erro ao abrir",
        error?.message || "Erro desconhecido ao processar arquivo",
      );
    }
  }

  const revisionIsValid =
    decision !== "revision" || revisionFeedback.trim().length >= 5;
  const canConfirm = revisionIsValid;

  function handleConfirm() {
    if (!canConfirm) {
      return;
    }

    onConfirm(submission.id, {
      decision,
      grade: grade.trim(),
      comment: comment.trim(),
      revisionFeedback: revisionFeedback.trim(),
      reward,
    });
  }

  const messages = CORRECTION_MESSAGES;
  const attachmentTypeLabel = getAttachmentTypeLabel(
    submission.attachment.type,
  );

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

        <View
          style={[
            correctionsStyles.detailLayout,
            isCompact ? correctionsStyles.detailLayoutCompact : undefined,
          ]}
        >
          {/* Coluna da entrega */}
          <View
            style={[
              correctionsStyles.detailMainColumn,
              isCompact ? correctionsStyles.detailMainColumnCompact : undefined,
            ]}
          >
            <AppCard>
              <SectionHeader
                compact
                title={submission.studentName}
                subtitle={`${submission.activityTitle} · ${submission.className}`}
                style={{ marginBottom: 16 }}
              />

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                <StatusChip
                  label={submission.waitingTimeLabel}
                  tone="warning"
                  dot
                />
                <StatusChip label={attachmentTypeLabel} tone="info" />
              </View>
            </AppCard>

            <AppCard>
              <SectionHeader
                compact
                title={messages.detail.attachmentTitle}
                subtitle={messages.detail.attachmentSubtitle}
                style={{ marginBottom: 16 }}
              />

              <View style={correctionsStyles.attachmentPreview}>
                <View style={correctionsStyles.attachmentBadge}>
                  <Text style={correctionsStyles.attachmentBadgeText}>
                    {submission.attachment.type.toUpperCase()}
                  </Text>
                </View>

                <Text style={correctionsStyles.attachmentName}>
                  {submission.attachment.name}
                </Text>

                <Text style={correctionsStyles.attachmentHint}>
                  Toque no botão abaixo para abrir e visualizar a resposta
                  enviada pelo aluno.
                </Text>

                <View style={correctionsStyles.attachmentActions}>
                  {/* 2. Botão atualizado acionando handleOpenAttachment */}
                  <AppButton
                    label="Abrir / Baixar Arquivo"
                    variant="secondary"
                    size="small"
                    iconLeft={<Download size={17} color={theme.primary} />}
                    onPress={handleOpenAttachment}
                  />
                </View>
              </View>
            </AppCard>
          </View>

          {/* Coluna de avaliação */}
          <View
            style={[
              correctionsStyles.detailEvaluationColumn,
              isCompact
                ? correctionsStyles.detailEvaluationColumnCompact
                : undefined,
            ]}
          >
            <AppCard>
              <SectionHeader
                compact
                title={messages.detail.evaluationTitle}
                subtitle={messages.detail.evaluationSubtitle}
                style={{ marginBottom: 18 }}
              />

              <View
                style={[
                  correctionsStyles.choiceRow,
                  isCompact ? correctionsStyles.choiceRowCompact : undefined,
                ]}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: decision === "approved" }}
                  onPress={() => setDecision("approved")}
                  style={({ pressed }) => [
                    correctionsStyles.choiceOption,
                    decision === "approved"
                      ? correctionsStyles.choiceOptionActive
                      : correctionsStyles.choiceOptionInactive,
                    pressed && correctionsStyles.choiceOptionPressed,
                  ]}
                >
                  <Text
                    style={
                      decision === "approved"
                        ? correctionsStyles.choiceTitleActive
                        : correctionsStyles.choiceTitle
                    }
                  >
                    {messages.detail.approve}
                  </Text>
                  <Text style={correctionsStyles.choiceSubtitle}>
                    Conclui a missão
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: decision === "revision" }}
                  onPress={() => setDecision("revision")}
                  style={({ pressed }) => [
                    correctionsStyles.choiceOption,
                    decision === "revision"
                      ? correctionsStyles.choiceOptionActiveRevision
                      : correctionsStyles.choiceOptionInactive,
                    pressed && correctionsStyles.choiceOptionPressed,
                  ]}
                >
                  <Text
                    style={
                      decision === "revision"
                        ? correctionsStyles.choiceTitleActiveRevision
                        : correctionsStyles.choiceTitle
                    }
                  >
                    {messages.detail.requestRevision}
                  </Text>
                  <Text style={correctionsStyles.choiceSubtitle}>
                    Devolve ao aluno
                  </Text>
                </Pressable>
              </View>

              <Text style={correctionsStyles.fieldLabel}>
                {messages.detail.gradeLabel}
              </Text>
              <TextInput
                value={grade}
                onChangeText={setGrade}
                placeholder={messages.detail.gradePlaceholder}
                placeholderTextColor={theme.textFaint}
                maxLength={5}
                style={correctionsStyles.textInput}
              />

              <Text
                style={[
                  correctionsStyles.fieldLabel,
                  { marginTop: 18, marginBottom: 7 },
                ]}
              >
                {messages.detail.commentLabel}
              </Text>
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder={messages.detail.placeholder}
                placeholderTextColor={theme.textFaint}
                multiline
                maxLength={200}
                textAlignVertical="top"
                style={correctionsStyles.textArea}
              />

              {decision === "revision" && (
                <>
                  <Text
                    style={[
                      correctionsStyles.fieldLabel,
                      { marginTop: 18, marginBottom: 7 },
                    ]}
                  >
                    {messages.detail.revisionLabel} *
                  </Text>
                  <TextInput
                    value={revisionFeedback}
                    onChangeText={setRevisionFeedback}
                    placeholder={messages.detail.revisionPlaceholder}
                    placeholderTextColor={theme.textFaint}
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
                    {revisionFeedback.length}/200
                  </Text>
                </>
              )}

              {decision === "approved" && (
                <View style={correctionsStyles.rewardCard}>
                  <Text style={correctionsStyles.rewardTitle}>
                    Recompensa que será liberada
                  </Text>
                  <Text style={correctionsStyles.rewardValue}>
                    {reward.name}
                  </Text>
                  <Text style={correctionsStyles.rewardHint}>
                    Nenhuma moeda é concedida nesta etapa. As moedas já foram
                    creditadas no envio da resposta.
                  </Text>
                </View>
              )}

              {!revisionIsValid && (
                <View style={correctionsStyles.validationHint}>
                  <Text style={correctionsStyles.validationHintText}>
                    Escreva um feedback para que o aluno saiba o que deve
                    revisar.
                  </Text>
                </View>
              )}

              <AppButton
                label={
                  decision === "approved"
                    ? messages.detail.confirm
                    : messages.detail.requestRevision
                }
                variant={decision === "approved" ? "primary" : "secondary"}
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

  const { submissions, activities } = useProfessorData();

  const submission = submissions.find((item) => item.id === submissionId);
  const activity = activities.find(
    (item) => item.id === submission?.activityId,
  );

  // Cast duplo via 'unknown' para contornar a incompatibilidade do tipo 'type'
  const reward = (activity?.reward ?? {
    id: "default-coin-reward",
    type: "coin",
    name: "Moedas",
  }) as unknown as Reward;

  return (
    <ProfessorRouteShell currentDestination="correctionQueue">
      {submission ? (
        <CorrectionScreen
          submission={submission}
          reward={reward}
          onBack={() => router.back()}
          onConfirm={async (id, result) => {
            const status =
              result.decision === "approved" ? "corrected" : "revision";
            const { error } = await supabase
              .from("submissions")
              .update({
                status,
                performance_rating: result.grade || null,
                teacher_feedback:
                  result.decision === "revision"
                    ? result.revisionFeedback || null
                    : result.comment || null,
                corrected_at:
                  result.decision === "approved"
                    ? new Date().toISOString()
                    : null,
              })
              .eq("id", id);

            if (error) {
              Alert.alert(
                "Erro ao salvar correção",
                "Não foi possível atualizar o status desta submissão.",
              );
              return;
            }

            router.replace(PROFESSOR_ROUTES.CORRECTIONS);
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ color: theme.textFaint, fontSize: 16 }}>
            Envio não encontrado ou ainda carregando...
          </Text>
        </View>
      )}
    </ProfessorRouteShell>
  );
}
