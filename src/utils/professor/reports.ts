import { theme } from "@/constants/theme";
import type {
  Activity,
  Class,
  EducatorStudentOption,
  ReportAttentionStudent,
  ReportClassItem,
  ReportPeriod,
  ReportStudentSummary,
  ReportSummary,
  Submission,
} from "@/types/professor";

export function getReportPeriodLabel(period: ReportPeriod) {
  return `${period} dias`;
}

export function getReportSummary(
  activities: Activity[] = [],
  submissions: Submission[] = [],
  students: EducatorStudentOption[] = [],
  classes: Class[] = [],
  period: ReportPeriod = "30",
): ReportSummary {
  // 1. Filtro de Data por período
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - parseInt(period, 10));

  const recentSubmissions = submissions.filter((sub) => {
    const rawDate = sub.submittedAt || (sub as any).createdAt;
    if (!rawDate) return true;
    const date = new Date(rawDate);
    return isNaN(date.getTime()) ? true : date >= cutoffDate;
  });

  // 2. Contagens Gerais
  const publishedActivitiesCount = activities.filter((a) => a.status === "published").length || 1;
  
  const completedCount = recentSubmissions.filter(
    (s) => (s.status as string) === "corrected" || (s.status as string) === "approved"
  ).length;
  const revisionCount = recentSubmissions.filter((s) => s.status === "revision").length;
  const pendingCount = recentSubmissions.filter((s) => s.status === "pending").length;

  // 3. Helper para Média de Notas
  const calculateAverage = (subs: Submission[]) => {
    const graded = subs.filter(
      (s) => ((s.status as string) === "corrected" || (s.status as string) === "approved") && s.grade !== undefined && s.grade !== null
    );
    if (graded.length === 0) return "0,0";
    const sum = graded.reduce((acc, s) => {
      const numericGrade = typeof s.grade === "number" ? s.grade : parseFloat(String(s.grade).replace(",", "."));
      return acc + (isNaN(numericGrade) ? 0 : numericGrade);
    }, 0);
    return (sum / graded.length).toFixed(1).replace(".", ",");
  };

  const overallAverage = calculateAverage(recentSubmissions);

  // 4. Mapeamento Real de Alunos (Métricas Individuais)
  const realStudents: ReportStudentSummary[] = students.map((student) => {
    const studentSubs = recentSubmissions.filter((s) => s.studentId === student.id);
    const completed = studentSubs.filter(
      (s) => (s.status as string) === "corrected" || (s.status as string) === "approved"
    ).length;
    const pending = studentSubs.filter((s) => s.status === "pending" || s.status === "not_submitted").length;
    
    // Taxa de participação
    const totalDelivered = studentSubs.filter((s) => s.status !== "not_submitted").length;
    const participationRate = Math.min(
      Math.round((totalDelivered / publishedActivitiesCount) * 100),
      100
    );

    // Gráfico de evolução: últimas 6 notas normalizadas em % (ex: nota 8,5 = 85%)
    const recentGrades = studentSubs
      .filter(
        (s) => ((s.status as string) === "corrected" || (s.status as string) === "approved") && s.grade !== undefined && s.grade !== null
      )
      .sort((a, b) => {
        const timeA = new Date(a.submittedAt || (a as any).createdAt || 0).getTime();
        const timeB = new Date(b.submittedAt || (b as any).createdAt || 0).getTime();
        return timeA - timeB;
      })
      .slice(-6)
      .map((s) => {
        const val = typeof s.grade === "number" ? s.grade : parseFloat(String(s.grade).replace(",", "."));
        return Math.round((isNaN(val) ? 0 : val) * 10);
      });

    const evolution = [...Array(Math.max(0, 6 - recentGrades.length)).fill(0), ...recentGrades];

    return {
      id: student.id,
      name: student.name,
      participation: participationRate,
      completed,
      pending,
      average: calculateAverage(studentSubs),
      evolution,
      classId: (student as any).classId || (student as any).class_id,
    };
  });

  // 5. Participação Real das Turmas
  const classParticipation: ReportClassItem[] = classes.map((cls) => {
    const classStudents = realStudents.filter(
      (s) => s.classId === cls.id || (s as any).className === cls.name
    );
    const avgParticipation = classStudents.length
      ? Math.round(classStudents.reduce((acc, s) => acc + s.participation, 0) / classStudents.length)
      : 0;

    return {
      label: cls.name,
      value: avgParticipation,
      color: avgParticipation >= 70 ? theme.primary : theme.warning,
    };
  });

  const overallParticipationValue = classParticipation.length
    ? Math.round(classParticipation.reduce((acc, c) => acc + c.value, 0) / classParticipation.length)
    : 0;

  // 6. Alunos em Atenção (Participação < 60% ou Média < 6,0)
  const attentionStudents: ReportAttentionStudent[] = realStudents
    .filter((student) => student.participation < 60 || parseFloat(student.average.replace(",", ".")) < 6.0)
    .sort((a, b) => a.participation - b.participation)
    .slice(0, 5)
    .map((student) => ({
      name: student.name,
      participation: student.participation,
      tone: student.participation < 40 ? "danger" : "warning",
    }));

  return {
    participation: `${overallParticipationValue}%`,
    completedActivities: completedCount,
    revisionCount,
    publishedActivities: publishedActivitiesCount,
    pendingActivities: pendingCount,
    average: overallAverage,
    classParticipation,
    attentionStudents,
    students: realStudents,
  };
} 