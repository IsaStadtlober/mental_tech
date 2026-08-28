import AppButton from "@/components/professor/AppButton";
import AppCard from "@/components/professor/AppCard";
import BackButton from "@/components/professor/BackButton";
import MetricCard from "@/components/professor/MetricCard";
import { ProfessorRouteShell } from "@/components/professor/ProfessorRouteShell";
import SectionHeader from "@/components/professor/SectionHeader";
import StatusChip from "@/components/professor/StatusChip";
import { STUDENT_PROFILE_STATUS_CONFIG } from "@/constants/professor/students";
import { theme } from "@/constants/theme";
import { useStudentProfile } from "@/hooks/professor/useStudentProfile";
import { PROFESSOR_ROUTES } from "@/router/professor.routes";
import { supabase } from "@/service/supabase";
import { studentsStyles } from "@/styles/professor/students";
import type {
    StudentHistoryItem,
    StudentProfile,
    StudentProfileScreenProps,
} from "@/types/professor";
import {
    listProfessorActivities,
    listProfessorStudents,
} from "@/utils/professor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Send } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";

const profileStatus = STUDENT_PROFILE_STATUS_CONFIG;

const EMPTY_STUDENT_PROFILE: StudentProfile = {
  id: "",
  name: "Aluno",
  initials: "AL",
  className: "Turma não encontrada",
  status: "engaged",
  completedActivities: 0,
  pendingActivities: 0,
  revisionActivities: 0,
  participation: "0%",
  trailPosition: 0,
  lastActivityAt: "Sem atividade recente",
};

function formatDate(value?: string | null) {
  if (!value) {
    return "Sem data";
  }

  try {
    return new Date(value).toLocaleDateString("pt-BR");
  } catch {
    return value;
  }
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "ST"
  );
}

function StudentProfileScreen({
  studentId,
  onBack,
  onCreateActivity,
  onOpenCorrectionQueue,
}: StudentProfileScreenProps) {
  const { width } = useWindowDimensions();

  const isCompact = width < 780;
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
    null,
  );
  const [history, setHistory] = useState<StudentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStudentData() {
      if (!studentId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [studentsResponse, activitiesResponse] = await Promise.all([
          listProfessorStudents(),
          listProfessorActivities(),
        ]);

        if (!isMounted) {
          return;
        }

        const selectedStudent = studentsResponse.find(
          (item) => item.id === studentId,
        );

        if (!selectedStudent) {
          setStudentProfile(null);
          setHistory([]);
          return;
        }

        const classActivities = (
          Array.isArray(activitiesResponse) ? activitiesResponse : []
        ).filter((activity) => activity.class_id === selectedStudent.class_id);

        const { data: submissionsData, error: submissionsError } =
          await supabase
            .from("submissions")
            .select("id, status, submitted_at, activity_id")
            .eq("student_id", studentId)
            .order("submitted_at", { ascending: false });

        if (submissionsError) {
          throw submissionsError;
        }

        const activityById = new Map(
          classActivities.map((activity) => [activity.id, activity]),
        );
        const submissions = (submissionsData ?? []).map((submission) => {
          const activity = activityById.get(submission.activity_id);
          return {
            id: submission.id,
            title: activity?.title || "Atividade sem título",
            status: submission.status,
            dateLabel: formatDate(submission.submitted_at),
            grade: submission.status === "corrected" ? "100%" : undefined,
          } satisfies StudentHistoryItem;
        });

        const completedActivities = submissions.filter(
          (submission) => submission.status === "approved",
        ).length;
        const pendingActivities = submissions.filter(
          (submission) =>
            submission.status === "not_submitted" ||
            submission.status === "pending",
        ).length;
        const revisionActivities = submissions.filter(
          (submission) => submission.status === "revision",
        ).length;
        const participation = Math.min(
          100,
          Math.round(
            (completedActivities / Math.max(classActivities.length, 1)) * 100,
          ),
        );
        const trailPosition = Math.min(
          10,
          Math.max(1, completedActivities + 1),
        );
        // ✅ CÓDIGO CORRIGIDO:
        const rawClassDate =
          classActivities[0]?.published_at ?? classActivities[0]?.created_at;
        const lastActivityAt =
          submissions[0]?.dateLabel ||
          (rawClassDate ? formatDate(rawClassDate) : "Sem atividade recente");

        const profile: StudentProfile = {
          id: selectedStudent.id,
          name: selectedStudent.name,
          initials: getInitials(selectedStudent.name),
          className: selectedStudent.class_name || "Turma sem nome",
          status:
            pendingActivities > 1
              ? "attention"
              : completedActivities > 0
                ? "engaged"
                : "inactive",
          completedActivities,
          pendingActivities,
          revisionActivities,
          participation: `${participation}%`,
          trailPosition,
          lastActivityAt,
        };

        setStudentProfile(profile);
        setHistory(submissions);
      } catch (loadError: any) {
        if (!isMounted) {
          return;
        }

        console.error("Erro ao carregar dados do aluno:", loadError);
        setError(
          loadError?.message || "Não foi possível carregar os dados do aluno.",
        );
        setStudentProfile(null);
        setHistory([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadStudentData();

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  const student = studentProfile ?? EMPTY_STUDENT_PROFILE;
  const status = profileStatus[student.status];
  const {
    metrics,
    historyStatusConfig,
    pedagogyMessage,
    heroMeta,
    trailPercentage,
    messages,
  } = useStudentProfile(student);

  if (loading) {
    return (
      <ScrollView
        style={studentsStyles.page}
        contentContainerStyle={{
          paddingHorizontal: isCompact ? 16 : 24,
          paddingTop: 28,
          paddingBottom: 64,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={studentsStyles.screenContainer}>
          <AppCard>
            <Text style={studentsStyles.pedagogyText}>
              Carregando dados do aluno...
            </Text>
          </AppCard>
        </View>
      </ScrollView>
    );
  }

  if (error || !studentProfile) {
    return (
      <ScrollView
        style={studentsStyles.page}
        contentContainerStyle={{
          paddingHorizontal: isCompact ? 16 : 24,
          paddingTop: 28,
          paddingBottom: 64,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={studentsStyles.screenContainer}>
          <AppCard>
            <Text style={studentsStyles.pedagogyText}>
              {error ||
                "Não foi possível localizar o aluno vinculado a esta turma."}
            </Text>
          </AppCard>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={studentsStyles.page}
      contentContainerStyle={{
        paddingHorizontal: isCompact ? 16 : 24,
        paddingTop: 28,
        paddingBottom: 64,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={studentsStyles.screenContainer}>
        <View style={studentsStyles.topBar}>
          <BackButton label={messages.header.backButton} onPress={onBack} />

          <AppButton
            label={
              isCompact
                ? messages.header.createActivityButtonCompact
                : messages.header.createActivityButton
            }
            iconLeft={<Send size={17} color={theme.white} />}
            onPress={() => onCreateActivity(student.name)}
          />
        </View>

        <AppCard>
          <View
            style={{
              flexDirection: isCompact ? "column" : "row",

              alignItems: isCompact ? "stretch" : "center",

              justifyContent: "space-between",

              gap: 22,
            }}
          >
            <View style={studentsStyles.profileHeader}>
              <View style={studentsStyles.avatar}>
                <Text style={studentsStyles.avatarText}>
                  {student.initials}
                </Text>
              </View>

              <View style={studentsStyles.profileText}>
                <Text
                  style={[
                    studentsStyles.profileName,
                    {
                      fontSize: isCompact ? 24 : 29,
                      lineHeight: isCompact ? 31 : 37,
                    },
                  ]}
                >
                  {student.name}
                </Text>

                <Text style={studentsStyles.profileMeta}>
                  {student.className}
                  {" · "}
                  {heroMeta}
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

        <View style={studentsStyles.metricsGrid}>
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              helper={metric.helper}
              tone={metric.tone}
            />
          ))}
        </View>

        <View
          style={[
            studentsStyles.splitLayout,
            { flexDirection: isCompact ? "column" : "row" },
          ]}
        >
          <View style={{ flex: 1.4, width: isCompact ? "100%" : undefined }}>
            <AppCard>
              <SectionHeader
                compact
                title={messages.sections.history.title}
                subtitle={messages.sections.history.subtitle}
                style={{
                  marginBottom: 18,
                }}
              />

              {history.map((item, index) => {
                const itemStatus = historyStatusConfig[item.status];

                return (
                  <View
                    key={item.id}
                    style={[
                      studentsStyles.historyItem,
                      { borderTopWidth: index === 0 ? 0 : 1 },
                    ]}
                  >
                    <View
                      style={[
                        studentsStyles.historyRow,
                        {
                          flexDirection: isCompact ? "column" : "row",
                          alignItems: isCompact ? "stretch" : "center",
                        },
                      ]}
                    >
                      <View
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Text style={studentsStyles.historyTitle}>
                          {item.title}
                        </Text>

                        <Text style={studentsStyles.historyMeta}>
                          {item.dateLabel}

                          {item.grade ? ` · Nota: ${item.grade}` : ""}
                        </Text>
                      </View>

                      <StatusChip
                        label={itemStatus.label}
                        tone={itemStatus.tone}
                      />
                    </View>
                  </View>
                );
              })}

              {history.some((item) => item.status === "pending") && (
                <AppButton
                  label={messages.actions.openCorrections}
                  variant="secondary"
                  onPress={onOpenCorrectionQueue}
                  style={{
                    alignSelf: "flex-start",
                    marginTop: 16,
                  }}
                />
              )}
            </AppCard>
          </View>

          <View
            style={{ flex: 1, width: isCompact ? "100%" : undefined, gap: 20 }}
          >
            <AppCard>
              <SectionHeader
                compact
                title={messages.sections.trail.title}
                subtitle={messages.sections.trail.subtitle}
                style={{
                  marginBottom: 18,
                }}
              />

              <View style={studentsStyles.trailCard}>
                <Text style={studentsStyles.trailTitle}>
                  Marco {student.trailPosition}
                </Text>

                <Text style={studentsStyles.trailBody}>
                  O avatar avança conforme as missões são enviadas e aprovadas.
                </Text>

                <View style={studentsStyles.trailBarTrack}>
                  <View
                    style={[
                      studentsStyles.trailBarFill,
                      { width: `${trailPercentage}%` },
                    ]}
                  />
                </View>
              </View>
            </AppCard>

            <AppCard>
              <SectionHeader
                compact
                title={messages.sections.pedagogy.title}
                subtitle={messages.sections.pedagogy.subtitle}
                style={{
                  marginBottom: 16,
                }}
              />

              <Text style={studentsStyles.pedagogyText}>{pedagogyMessage}</Text>
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
        onCreateActivity={(studentName) =>
          router.push({
            pathname: PROFESSOR_ROUTES.CREATE_ACTIVITY,
            params: { studentName },
          } as any)
        }
        onOpenCorrectionQueue={() =>
          router.push(PROFESSOR_ROUTES.CORRECTIONS as any)
        }
      />
    </ProfessorRouteShell>
  );
}
