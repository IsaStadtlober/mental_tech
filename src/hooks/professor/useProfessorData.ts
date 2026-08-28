import { useEffect, useState } from "react";

import type {
  Activity,
  Class,
  EducatorNotification,
  EducatorStudentOption,
  Submission,
} from "@/types/professor";
import {
  getProfessorProfile,
  getStudentSubmissionFileUrl,
  listProfessorActivities,
  listProfessorClasses,
  listProfessorStudents,
  listProfessorSubmissions,
  type ProfessorSubmissionSummary,
} from "@/utils/professor";

interface UseProfessorDataResult {
  profileName: string;
  profileEmail: string;
  schoolName: string;
  activities: Activity[];
  students: EducatorStudentOption[];
  submissions: Submission[];
  notifications: EducatorNotification[];
  loading: boolean;
  error: string | null;
  classes: Class[];
}

function formatDate(value?: string | null) {
  if (!value) return undefined;
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
      .toUpperCase() || "PR"
  );
}

function mapActivitySummary(
  activity: Awaited<ReturnType<typeof listProfessorActivities>>[number],
  classNameById: Map<string, string>,
): Activity {
  return {
    id: activity.id,
    title: activity.title,
    instruction:
      activity.description || "Sem instruções cadastradas para esta atividade.",
    className: classNameById.get(activity.class_id) || "Turma sem nome",
    status: activity.status === "published" ? "published" : "draft",
    dueDate: formatDate(activity.published_at),
    createdAt: formatDate(activity.created_at) || "Sem data",
    publishedAt: formatDate(activity.published_at),
    attachment: {
      id: activity.id,
      name: activity.content_url ? "Arquivo anexado" : "Sem arquivo",
      type: activity.content_url ? "pdf" : "doc",
      sizeLabel: activity.content_url ? "Em storage" : "Não enviado",
      uri: activity.content_url || undefined,
    },
    reward: {
      id: activity.id,
      name: "Recompensa da atividade",
      type: "item",
    },
    submissionsCount: 0,
    studentsCount: 0,
    correctedCount: 0,
  };
}

function mapStudentSummary(
  student: Awaited<ReturnType<typeof listProfessorStudents>>[number],
): EducatorStudentOption {
  return {
    id: student.id,
    name: student.name,
    className: student.class_name || "Turma sem nome",
  };
}

async function mapRealSubmissions(
  dbSubmissions: ProfessorSubmissionSummary[],
  activities: Activity[],
  students: EducatorStudentOption[],
): Promise<Submission[]> {
  const activityById = new Map(activities.map((a) => [a.id, a]));
  const studentById = new Map(students.map((s) => [s.id, s]));

  // Usamos Promise.all pois a busca no storage é assíncrona
  return Promise.all(
    dbSubmissions.map(async (sub) => {
      const student = studentById.get(sub.student_id);
      const activity = activityById.get(sub.activity_id);
      const studentName = student?.name || "Aluno desvinculado";

      // Tenta pegar a URL do banco ou busca diretamente no bucket 'respostas'
      let fileUrl =
        typeof sub.student_answers === "string"
          ? sub.student_answers
          : sub.student_answers?.url || undefined;

      // Se não veio no banco, busca na pasta 'respostas/{student_id}/{activity_id}'
      if (!fileUrl && sub.status !== "not_submitted") {
        fileUrl =
          (await getStudentSubmissionFileUrl(
            sub.student_id,
            sub.activity_id,
          )) || undefined;
      }

      return {
        id: sub.id,
        studentId: sub.student_id,
        studentName,
        studentInitials: getInitials(studentName),
        activityId: sub.activity_id,
        activityTitle: activity?.title || "Atividade sem título",
        className: student?.className || "Turma sem nome",
        status: sub.status as Submission["status"],
        submittedAt: formatDate(sub.submitted_at) || "Não entregue",
        waitingTimeLabel:
          sub.status === "not_submitted"
            ? "Não respondido"
            : sub.status === "pending"
              ? "Aguardando correção"
              : sub.status === "revision"
                ? "Revisão solicitada"
                : "Corrigido",
        attachment: {
          id: `attachment-${sub.id}`,
          name: fileUrl ? "Resposta anexada" : "Sem arquivo anexado",
          type: "pdf",
          sizeLabel: fileUrl ? "Ver arquivo" : "N/A",
          url: fileUrl,
        },
      };
    }),
  );
}

function buildNotifications(
  activities: Activity[],
  submissions: Submission[],
): EducatorNotification[] {
  const notifications: EducatorNotification[] = [];

  if (activities.length > 0) {
    notifications.push({
      id: "db-activity-sync",
      title: "Atividades sincronizadas",
      description: `${activities.length} atividade(s) carregada(s) diretamente do banco.`,
      createdAtLabel: "Atualizado agora",
      category: "activity",
      read: false,
      destination: {
        type: "activityDetail",
        activityId: activities[0].id,
      },
    });
  }

  const pendingSubmissions = submissions.filter((s) => s.status === "pending");
  if (pendingSubmissions.length > 0) {
    notifications.push({
      id: "db-submission-sync",
      title: "Entregas pendentes",
      description: `${pendingSubmissions.length} entrega(s) aguardando correção.`,
      createdAtLabel: "Atualizado agora",
      category: "correction",
      read: false,
      destination: {
        type: "correctionQueue",
      },
    });
  }

  return notifications;
}

export function useProfessorData(): UseProfessorDataResult {
  const [profileName, setProfileName] = useState("Professor");
  const [profileEmail, setProfileEmail] = useState(
    "professor@caminhodosaber.edu.br",
  );
  const [schoolName, setSchoolName] = useState("Escola Caminho do Saber");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [students, setStudents] = useState<EducatorStudentOption[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [notifications, setNotifications] = useState<EducatorNotification[]>(
    [],
  );
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [
          profileResponse,
          classesResponse,
          activitiesResponse,
          studentsResponse,
          submissionsResponse,
        ] = await Promise.all([
          getProfessorProfile().catch(() => null),
          listProfessorClasses().catch(() => []),
          listProfessorActivities().catch(() => []),
          listProfessorStudents().catch(() => []),
          listProfessorSubmissions().catch(() => []),
        ]);

        if (!isMounted) return;

        const classNameById = new Map(
          (classesResponse ?? []).map((classItem) => [
            classItem.id,
            classItem.name,
          ]),
        );
        const mappedActivities = (activitiesResponse ?? []).map((activity) =>
          mapActivitySummary(activity, classNameById),
        );
        const mappedStudents = (studentsResponse ?? []).map(mapStudentSummary);
        const mappedSubmissions = await mapRealSubmissions(
          submissionsResponse ?? [],
          mappedActivities,
          mappedStudents,
        );
        const mappedNotifications = buildNotifications(
          mappedActivities,
          mappedSubmissions,
        );

        setProfileName(profileResponse?.profile?.full_name || "Professor");
        setProfileEmail(
          profileResponse?.profile?.email ||
            profileResponse?.user?.email ||
            "professor@caminhodosaber.edu.br",
        );
        setSchoolName(
          profileResponse?.school?.trade_name || "Escola Caminho do Saber",
        );
        setActivities(mappedActivities);
        setStudents(mappedStudents);
        setSubmissions(mappedSubmissions);
        setNotifications(mappedNotifications);
        setClasses((classesResponse ?? []) as unknown as Class[]);
      } catch (loadError: any) {
        if (!isMounted) return;

        console.error("Erro ao carregar dados do professor:", loadError);
        setError(
          loadError?.message ||
            "Não foi possível carregar os dados do professor.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    profileName,
    profileEmail,
    schoolName,
    activities,
    students,
    submissions,
    notifications,
    loading,
    error,
    classes,
  };
}
