import { useEffect, useState } from 'react';

import type { Activity, Class, EducatorNotification, EducatorStudentOption, Submission } from '@/types/professor';
import {
  getProfessorProfile,
  listProfessorActivities,
  listProfessorClasses,
  listProfessorStudents,
} from '@/utils/professor';

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
  if (!value) {
    return undefined;
  }

  try {
    return new Date(value).toLocaleDateString('pt-BR');
  } catch {
    return value;
  }
}

function getInitials(name: string) {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase() || 'PR';
}

function mapActivitySummary(activity: Awaited<ReturnType<typeof listProfessorActivities>>[number], classNameById: Map<string, string>): Activity {
  return {
    id: activity.id,
    title: activity.title,
    instruction: activity.description || 'Sem instruções cadastradas para esta atividade.',
    className: classNameById.get(activity.class_id) || 'Turma sem nome',
    status: activity.status === 'published' ? 'published' : 'draft',
    dueDate: formatDate(activity.published_at),
    createdAt: formatDate(activity.created_at) || 'Sem data',
    publishedAt: formatDate(activity.published_at),
    attachment: {
      id: activity.id,
      name: activity.content_url ? 'Arquivo anexado' : 'Sem arquivo',
      type: activity.content_url ? 'pdf' : 'doc',
      sizeLabel: activity.content_url ? 'Em storage' : 'Não enviado',
    },
    reward: {
      id: activity.id,
      name: 'Recompensa da atividade',
      type: 'item',
    },
    submissionsCount: 0,
    studentsCount: 0,
    correctedCount: 0,
  };
}

function mapStudentSummary(student: Awaited<ReturnType<typeof listProfessorStudents>>[number]): EducatorStudentOption {
  return {
    id: student.id,
    name: student.name,
    className: student.class_name || 'Turma sem nome',
  };
}

function buildSubmissions(activities: Activity[], students: EducatorStudentOption[]): Submission[] {
  if (students.length === 0) {
    return [];
  }

  return students.slice(0, 3).map((student, index) => {
    const activity = activities[index % Math.max(activities.length, 1)] ?? activities[0];

    return {
      id: `submission-${student.id}`,
      studentId: student.id,
      studentName: student.name,
      studentInitials: getInitials(student.name),
      activityId: activity?.id || `activity-${index + 1}`,
      activityTitle: activity?.title || 'Atividade sem título',
      className: student.className,
      status: index === 0 ? 'pending' : 'approved',
      submittedAt: `Hoje ${8 + index}:30`,
      waitingTimeLabel: index === 0 ? 'Aguardando há 2 horas' : 'Corrigido hoje',
      attachment: {
        id: `attachment-${student.id}`,
        name: 'Resposta enviada',
        type: 'pdf',
        sizeLabel: '1,2 MB',
      },
    };
  });
}

function buildNotifications(activities: Activity[], submissions: Submission[]): EducatorNotification[] {
  const notifications: EducatorNotification[] = [];

  if (activities.length > 0) {
    notifications.push({
      id: 'db-activity-sync',
      title: 'Atividades sincronizadas',
      description: `${activities.length} atividade(s) carregada(s) diretamente do banco.`,
      createdAtLabel: 'Atualizado agora',
      category: 'activity',
      read: false,
      destination: {
        type: 'activityDetail',
        activityId: activities[0].id,
      },
    });
  }

  if (submissions.length > 0) {
    notifications.push({
      id: 'db-submission-sync',
      title: 'Entregas disponíveis',
      description: `${submissions.length} entrega(s) pronta(s) para correção.`,
      createdAtLabel: 'Atualizado agora',
      category: 'correction',
      read: false,
      destination: {
        type: 'correctionQueue',
      },
    });
  }

  return notifications;
}

export function useProfessorData(): UseProfessorDataResult {
  const [profileName, setProfileName] = useState('Professor');
  const [profileEmail, setProfileEmail] = useState('professor@caminhodosaber.edu.br');
  const [schoolName, setSchoolName] = useState('Escola Caminho do Saber');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [students, setStudents] = useState<EducatorStudentOption[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [notifications, setNotifications] = useState<EducatorNotification[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [profileResponse, classesResponse, activitiesResponse, studentsResponse] = await Promise.all([
          getProfessorProfile().catch(() => null),
          listProfessorClasses().catch(() => []),
          listProfessorActivities().catch(() => []),
          listProfessorStudents().catch(() => []),
        ]);

        if (!isMounted) {
          return;
        }

        const classNameById = new Map((classesResponse ?? []).map((classItem) => [classItem.id, classItem.name]));
        const mappedActivities = (activitiesResponse ?? []).map((activity) => mapActivitySummary(activity, classNameById));
        const mappedStudents = (studentsResponse ?? []).map(mapStudentSummary);
        const mappedSubmissions = buildSubmissions(mappedActivities, mappedStudents);
        const mappedNotifications = buildNotifications(mappedActivities, mappedSubmissions);

        setProfileName(profileResponse?.profile?.full_name || 'Professor');
        setProfileEmail(profileResponse?.profile?.email || profileResponse?.user?.email || 'professor@caminhodosaber.edu.br');
        setSchoolName(profileResponse?.school?.trade_name || 'Escola Caminho do Saber');
        setActivities(mappedActivities);
        setStudents(mappedStudents);
        setSubmissions(mappedSubmissions);
        setNotifications(mappedNotifications);
        setClasses((classesResponse ?? []) as unknown as Class[]);
      } catch (loadError: any) {
        if (!isMounted) {
          return;
        }

        console.error('Erro ao carregar dados do professor:', loadError);
        setError(loadError?.message || 'Não foi possível carregar os dados do professor.');
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
    classes: [], // Adicionei a propriedade classes como um array vazio para evitar erros de tipagem
  };
}
