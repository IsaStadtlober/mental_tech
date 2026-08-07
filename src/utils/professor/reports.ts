import { theme } from "@/constants/theme";
import type {
  Activity,
  Class,
  ReportAttentionStudent,
  ReportClassItem,
  ReportPeriod,
  ReportStudentSummary,
  ReportSummary,
  Student,
  Submission,
} from "@/types/professor";

// Função auxiliar (mantida)
export function getReportPeriodLabel(period: ReportPeriod) {
  return `${period} dias`;
}

// Atualizamos a função para receber os arrays reais do banco
export function getReportSummary(
  activities: Activity[] = [],
  submissions: Submission[] = [],
  students: Student[] = [],
  classes: Class[] = [],
  period: ReportPeriod = "30",
): ReportSummary {
  // 1. Contagens reais (sem os falsos "+ 1" e "+ 2")
  const publishedActivitiesCount = activities.filter(
    (activity) => activity.status === "published",
  ).length;
  const completedActivitiesCount = activities.reduce(
    (total, activity) => total + (activity.correctedCount || 0),
    0,
  );
  const revisionCount = submissions.filter(
    (submission) => submission.status === "revision",
  ).length;
  const pendingCount = submissions.filter(
    (submission) => submission.status === "pending",
  ).length;

  // 2. Participação das Turmas Real
  const classParticipation: ReportClassItem[] = classes.map((cls) => {
    const participationValue = cls.participation_rate ?? 0;
    return {
      label: cls.name,
      value: participationValue,
      color: participationValue >= 80 ? theme.primary : theme.warning, // Muda a cor se a taxa for baixa
    };
  });

  // 3. Média geral de participação real
  const overallParticipationValue = classParticipation.length
    ? Math.round(
        classParticipation.reduce((acc, c) => acc + c.value, 0) /
          classParticipation.length,
      )
    : 0;
  const participation = `${overallParticipationValue}%`;

  // 4. Média de notas reais (Mockado para 0,0 até ter o cálculo real de notas no BD)
  const average = "0,0";

  // 5. Alunos que precisam de atenção (Filtramos alunos com participação menor que 75%, por exemplo)
  // *Nota: Assumindo que o estudante tenha uma prop "participation_rate" no futuro,
  // ou você pode mudar a lógica para checar inatividade.
  const attentionStudents: ReportAttentionStudent[] = students
    .map((student) => {
      // Simulando uma taxa caso não tenha no banco ainda, troque por `student.participation_rate ?? 0` se tiver.
      const studentParticipation = 0;
      return {
        name: student.name,
        participation: studentParticipation,
        tone:
          studentParticipation < 50
            ? "danger"
            : ("warning" as "danger" | "warning"),
      };
    })
    .filter((student) => student.participation < 75)
    .slice(0, 5); // Pega os 5 piores

  // 6. Lista Real de Estudantes
  const realStudents: ReportStudentSummary[] = students.map(
    (student) =>
      ({
        ...student,
        participation: 0, // Substitua pela propriedade real do banco futuramente
        average: "0,0",
      }) as unknown as ReportStudentSummary,
  );

  return {
    participation,
    completedActivities: completedActivitiesCount,
    revisionCount,
    publishedActivities: publishedActivitiesCount,
    pendingActivities: pendingCount,
    average,
    classParticipation,
    attentionStudents,
    students: realStudents,
  };
}
