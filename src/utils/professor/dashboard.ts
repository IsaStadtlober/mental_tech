import type {
  Activity,
  Class,
  DashboardMetricConfig,
  DashboardMetricInput,
  Student,
  Submission,
} from "@/types/professor";

// Helper para converter datas (tanto 'DD/MM/AAAA' quanto ISO) para timestamp
function parseDateToTimestamp(dateStr?: string | null): number {
  if (!dateStr) return 0;
  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const time = new Date(
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
      ).getTime();
      return isNaN(time) ? 0 : time;
    }
  }
  const time = new Date(dateStr).getTime();
  return isNaN(time) ? 0 : time;
}

// 1. Contagem de entregas aguardando correção (status 'pending' ou 'revision')
export function getPendingCorrectionsCount(
  submissions: Submission[] = [],
): number {
  return (submissions || []).filter(
    (item) => item.status === "pending" || item.status === "revision",
  ).length;
}

// 2. Contagem de atividades publicadas
export function getPublishedActivitiesCount(
  activities: Activity[] = [],
): number {
  return (activities || []).filter((item) => item.status === "published")
    .length;
}

// 3. Alunos sem atividade entregue há mais de 7 dias (calculado pelas submissões reais)
export function getInactiveStudentsCount(
  students: Student[] = [],
  submissions: Submission[] = [],
): number {
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  // Mapeia a data da última entrega real de cada aluno
  const lastSubmissionByStudent = new Map<string, number>();

  for (const sub of submissions) {
    if (sub.status !== "not_submitted" && sub.submittedAt) {
      const time = parseDateToTimestamp(sub.submittedAt);
      if (time > 0) {
        const currentMax = lastSubmissionByStudent.get(sub.studentId) || 0;
        if (time > currentMax) {
          lastSubmissionByStudent.set(sub.studentId, time);
        }
      }
    }
  }

  // Aluno é inativo se nunca entregou nada OU se a última entrega tem mais de 7 dias
  return (students || []).filter((student) => {
    const lastTime = lastSubmissionByStudent.get(student.id);
    if (!lastTime) return true;
    return now - lastTime > SEVEN_DAYS_MS;
  }).length;
}

// 4. Resumo de participação dinâmico por turma (% de entregas realizadas vs esperadas)
export function getClassSummaries(
  classes: Class[] = [],
  students: Student[] = [],
  submissions: Submission[] = [],
  activities: Activity[] = [],
) {
  return classes.map((cls) => {
    const classStudents = students.filter((s) => s.className === cls.name);
    const classActivities = activities.filter(
      (a) => a.className === cls.name && a.status === "published",
    );

    if (classStudents.length === 0 || classActivities.length === 0) {
      return {
        id: cls.id,
        name: cls.name,
        participation: 0,
      };
    }

    const classSubmissions = submissions.filter(
      (sub) => sub.className === cls.name && sub.status !== "not_submitted",
    );

    const totalExpected = classActivities.length * classStudents.length;
    const totalDelivered = classSubmissions.length;

    const participation =
      totalExpected > 0
        ? Math.min(Math.round((totalDelivered / totalExpected) * 100), 100)
        : 0;

    return {
      id: cls.id,
      name: cls.name,
      participation,
    };
  });
}

// Configuração das métricas visuais
export function getDashboardMetricConfig({
  pendingCorrectionsCount,
  publishedActivitiesCount,
  inactiveStudentsCount = 0,
  overallParticipation = 0,
}: DashboardMetricInput): DashboardMetricConfig {
  return {
    waitingCorrectionLabel: "Aguardando correção",
    waitingCorrectionHelper:
      pendingCorrectionsCount === 0
        ? "Nenhum envio exige ação agora"
        : "Priorize os envios mais antigos",
    publishedActivitiesLabel: "Atividades publicadas",
    publishedActivitiesHelper:
      publishedActivitiesCount === 1
        ? "1 missão disponível para os alunos"
        : `${publishedActivitiesCount} missões disponíveis para os alunos`,
    noActivityLabel: "Sem atividade há +7 dias",
    noActivityHelper: "Alunos que podem precisar de apoio",
    participationLabel: "Participação da turma",
    participationValue: `${overallParticipation}%`,
    participationHelper: "Média geral de engajamento",
  };
}
