import AppButton from "@/components/professor/AppButton";
import AppCard from "@/components/professor/AppCard";
import BackButton from "@/components/professor/BackButton";
import EmptyState from "@/components/professor/EmptyState";
import { ProfessorRouteShell } from "@/components/professor/ProfessorRouteShell";
import StatusChip from "@/components/professor/StatusChip";
import {
  FILE_TYPE_LABELS,
  STATUS_FILTER_OPTIONS,
} from "@/constants/professor/corrections";
import {
  getHorizontalPadding,
  isCompactWidth,
} from "@/constants/professor/prof_Layout";
import { theme } from "@/constants/theme";
import { useCorrectionsScreen } from "@/hooks/professor/useCorrectionsScreen";
import { useProfessorData } from "@/hooks/professor/useProfessorData";
import { PROFESSOR_ROUTES } from "@/router/professor.routes";
import { correctionsStyles } from "@/styles/professor/corrections";
import type { CorrectionQueueScreenProps } from "@/types/professor/corrections";
import { useRouter } from "expo-router";
import { CheckSquare2 } from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

const fileTypeLabels = FILE_TYPE_LABELS;

function CorrectionQueueScreen({
  submissions,
  onBack,
  onOpenSubmission,
}: CorrectionQueueScreenProps) {
  const { width } = useWindowDimensions();

  const isCompact = isCompactWidth(width);

  const horizontalPadding = getHorizontalPadding(width);

  const {
    query,
    setQuery,
    classFilter,
    setClassFilter,
    classFilters,
    statusFilter,
    setStatusFilter,
    filteredSubmissions,
    resultsLabel,
    messages,
  } = useCorrectionsScreen(submissions);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={correctionsStyles.page}
      contentContainerStyle={[
        correctionsStyles.contentContainer,
        { paddingHorizontal: horizontalPadding },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={correctionsStyles.screenContainer}>
        <View style={correctionsStyles.topBar}>
          <BackButton label={messages.header.backButton} onPress={onBack} />

          <StatusChip
            label={resultsLabel}
            tone={filteredSubmissions.length > 0 ? "warning" : "success"}
            dot
          />
        </View>

        {/* Identificação da tela */}

        <View style={correctionsStyles.headerSection}>
          <Text
            style={[
              correctionsStyles.title,
              isCompact
                ? correctionsStyles.titleCompact
                : correctionsStyles.titleExpanded,
            ]}
          >
            {messages.header.title}
          </Text>
          <Text style={correctionsStyles.subtitle}>
            {messages.header.subtitle}
          </Text>
        </View>

        {/* Busca e filtros */}

        <AppCard style={correctionsStyles.filterCard}>
          <Text style={correctionsStyles.fieldLabel}>
            {messages.search.label}
          </Text>

          <TextInput
            accessibilityLabel={messages.search.label}
            value={query}
            onChangeText={setQuery}
            placeholder={messages.search.placeholder}
            placeholderTextColor={theme.textFaint}
            autoCorrect={false}
            style={correctionsStyles.textInput}
          />

          <Text
            style={[
              correctionsStyles.fieldLabel,
              { marginTop: 18, marginBottom: 9 },
            ]}
          >
            {messages.filters.label}
          </Text>

          <View style={correctionsStyles.filterList}>
            {classFilters.map((option) => {
              const active = classFilter === option.value;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: active,
                  }}
                  onPress={() => setClassFilter(option.value)}
                  style={({ pressed }) => [
                    correctionsStyles.filterChipButton,
                    active && correctionsStyles.filterChipButtonActive,
                    pressed && correctionsStyles.filterChipButtonPressed,
                  ]}
                >
                  <Text
                    style={[
                      correctionsStyles.filterChipText,
                      active && correctionsStyles.filterChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text
            style={[
              correctionsStyles.fieldLabel,
              { marginTop: 18, marginBottom: 9 },
            ]}
          >
            {messages.filters.statusLabel}
          </Text>

          <View style={correctionsStyles.filterList}>
            {STATUS_FILTER_OPTIONS.map((option) => {
              const active = statusFilter === option.value;

              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  accessibilityState={{
                    selected: active,
                  }}
                  onPress={() => setStatusFilter(option.value)}
                  style={({ pressed }) => [
                    correctionsStyles.filterChipButton,
                    active && correctionsStyles.filterChipButtonActive,
                    pressed && correctionsStyles.filterChipButtonPressed,
                  ]}
                >
                  <Text
                    style={[
                      correctionsStyles.filterChipText,
                      active && correctionsStyles.filterChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </AppCard>

        {/* Resultado da busca */}

        <Text style={correctionsStyles.countText}>
          {filteredSubmissions.length} {resultsLabel}
        </Text>

        {filteredSubmissions.length === 0 ? (
          <AppCard>
            <EmptyState
              title={messages.emptyState.title}
              description={messages.emptyState.description}
            />
          </AppCard>
        ) : (
          <View style={correctionsStyles.listStack}>
            {filteredSubmissions.map((submission, index) => (
              <AppCard key={submission.id} elevated={false}>
                <View
                  style={[
                    correctionsStyles.cardContent,
                    isCompact
                      ? correctionsStyles.cardContentCompact
                      : correctionsStyles.cardContentRow,
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      minWidth: 0,

                      flexDirection: "row",

                      alignItems: "center",

                      gap: 13,
                    }}
                  >
                    <View
                      style={[
                        correctionsStyles.avatar,
                        index === 0
                          ? correctionsStyles.avatarPrimary
                          : correctionsStyles.avatarNeutral,
                      ]}
                    >
                      <Text
                        style={
                          index === 0
                            ? correctionsStyles.avatarTextActive
                            : correctionsStyles.avatarText
                        }
                      >
                        {submission.studentInitials ??
                          submission.studentName
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((part) => part.charAt(0))
                            .join("")
                            .toUpperCase()}
                      </Text>
                    </View>

                    <View style={correctionsStyles.submissionMeta}>
                      <View
                        style={{
                          flexDirection: "row",

                          alignItems: "center",

                          flexWrap: "wrap",

                          gap: 8,
                        }}
                      >
                        <Text style={correctionsStyles.submissionTitle}>
                          {submission.studentName}
                        </Text>

                        {index === 0 && (
                          <StatusChip
                            label={messages.actions.moreOld}
                            tone="warning"
                          />
                        )}
                      </View>

                      <Text
                        numberOfLines={1}
                        style={correctionsStyles.submissionSubtitle}
                      >
                        {submission.activityTitle}
                        {" · "}
                        {submission.className}
                      </Text>

                      <View style={correctionsStyles.chipsRow}>
                        <StatusChip
                          label={submission.waitingTimeLabel}
                          tone={index === 0 ? "warning" : "info"}
                          dot
                        />

                        {submission.attachment?.uri ? (
                          <>
                            <StatusChip
                              label={fileTypeLabels[submission.attachment.type]}
                              tone="neutral"
                            />

                            <Text
                              numberOfLines={1}
                              style={correctionsStyles.attachmentText}
                            >
                              {submission.attachment.name}
                            </Text>
                          </>
                        ) : (
                          <Text
                            numberOfLines={1}
                            style={correctionsStyles.attachmentText}
                          >
                            Nenhum arquivo enviado
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>

                  {/* Checa se existe a URL do arquivo ou se foi enviado de fato */}
                  {submission.attachment?.uri ? (
                    <AppButton
                      label={messages.actions.correct}
                      onPress={() => onOpenSubmission(submission.id)}
                      iconLeft={<CheckSquare2 size={17} color={theme.white} />}
                    />
                  ) : (
                    <Text
                      style={{
                        color: theme.textFaint,
                        fontSize: 13,
                        fontStyle: "italic",
                      }}
                    >
                      Aguardando envio do aluno...
                    </Text>
                  )}
                </View>
              </AppCard>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default function CorrectionQueueRoute() {
  const router = useRouter();
  const { submissions } = useProfessorData();

  return (
    <ProfessorRouteShell currentDestination="correctionQueue">
      <CorrectionQueueScreen
        submissions={submissions}
        onBack={() => router.back()}
        onOpenSubmission={(submissionId) =>
          router.push(PROFESSOR_ROUTES.SUBMISSION_DETAIL(submissionId) as any)
        }
      />
    </ProfessorRouteShell>
  );
}
