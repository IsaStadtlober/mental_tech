import type { Activity, EducatorNotification, EducatorStudentOption, Submission } from '@/types/professor';
import type { ActivityFormData } from '@/types/professor/activityForm';
import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';

// Dados simulados para o protótipo.
const students: EducatorStudentOption[] = [
  { id: 'student-1', name: 'Carlos Lima', className: '5º Ano A' },
  { id: 'student-2', name: 'Maria Souza', className: '5º Ano B' },
  { id: 'student-3', name: 'Ravi Martins', className: '5º Ano A' },
  { id: 'student-4', name: 'Ana Clara', className: '5º Ano A' },
];

// Dados simulados para o protótipo.
const initialActivities: Activity[] = [
  {
    id: 'activity-1',
    title: 'Descobrindo os biomas brasileiros',
    instruction: 'Leia o material e produza um resumo ilustrado sobre um dos biomas brasileiros.',
    className: '5º Ano A',
    status: 'published',
    dueDate: '18/07/2026',
    createdAt: '10/07/2026',
    publishedAt: '10/07/2026',
    attachment: {
      id: 'attachment-1',
      name: 'biomas-brasileiros.pdf',
      type: 'pdf',
      sizeLabel: '2,4 MB',
    },
    reward: {
      id: 'reward-1',
      name: 'Medalha Explorador',
      type: 'medal',
    },
    submissionsCount: 4,
    studentsCount: 28,
    correctedCount: 1,
  },
  {
    id: 'activity-2',
    title: 'Frações no dia a dia',
    instruction: 'Resolva os exercícios usando exemplos de compras, receitas e divisões.',
    className: '5º Ano A',
    status: 'published',
    dueDate: '20/07/2026',
    createdAt: '11/07/2026',
    attachment: {
      id: 'attachment-2',
      name: 'atividade-fracoes.docx',
      type: 'doc',
      sizeLabel: '840 KB',
    },
    reward: {
      id: 'reward-2',
      name: 'Mochila Verde',
      type: 'item',
    },
    submissionsCount: 2,
    studentsCount: 28,
    correctedCount: 0,
  },
  {
    id: 'activity-3',
    title: 'Mapa afetivo do bairro',
    instruction: 'Crie um mapa destacando os lugares mais importantes do seu bairro.',
    className: '5º Ano B',
    status: 'draft',
    dueDate: '22/07/2026',
    createdAt: '12/07/2026',
    attachment: {
      id: 'attachment-3',
      name: 'exemplo-mapa.png',
      type: 'image',
      sizeLabel: '1,2 MB',
    },
    reward: {
      id: 'reward-3',
      name: 'Item surpresa',
      type: 'item',
    },
    submissionsCount: 0,
    studentsCount: 25,
    correctedCount: 0,
  },
];

const initialSubmissions: Submission[] = students.slice(0, 3).map((student, index) => ({
  id: `submission-${index + 1}`,
  studentId: student.id,
  studentName: student.name,
  studentInitials: student.name
    .split(' ')
    .map((part) => part[0])
    .join(''),
  activityId: index === 1 ? 'activity-2' : 'activity-1',
  activityTitle: index === 1 ? 'Frações no dia a dia' : 'Descobrindo os biomas brasileiros',
  className: student.className,
  status: 'pending',
  submittedAt: `13/07/2026 ${8 + index}:30`,
  waitingTimeLabel: index === 0 ? 'Aguardando há 28 horas' : 'Aguardando há 3 horas',
  attachment: {
    id: `student-file-${index + 1}`,
    name: `resposta-${student.id}.pdf`,
    type: 'pdf',
    sizeLabel: '1,4 MB',
  },
}));

const initialNotifications: EducatorNotification[] = [
  {
    id: 'notification-1',
    title: 'Ana Clara enviou uma resposta',
    description: 'Uma atividade está aguardando correção.',
    createdAtLabel: 'Hoje, há 1 hora',
    category: 'correction',
    read: false,
    destination: { type: 'correctionQueue' },
  },
  {
    id: 'notification-2',
    title: 'Maria Souza precisa de atenção',
    description: 'A aluna está há 9 dias sem concluir uma nova atividade.',
    createdAtLabel: 'Hoje, às 09:10',
    category: 'student',
    read: false,
    destination: { type: 'studentProfile', studentId: 'student-2' },
  },
  {
    id: 'notification-3',
    title: 'Resumo semanal disponível',
    description: 'A participação geral das turmas foi de 84%.',
    createdAtLabel: 'Segunda-feira, às 08:00',
    category: 'system',
    read: true,
    destination: { type: 'reports' },
  },
];

interface ProfessorPrototypeValue {
  activities: Activity[];
  submissions: Submission[];
  notifications: EducatorNotification[];
  students: EducatorStudentOption[];
  saveActivity: (data: ActivityFormData, id?: string) => void;
  deleteActivity: (id: string) => void;
  confirmCorrection: (
    id: string,
    result: { decision: 'approved' | 'revision'; grade: string; comment: string; revisionFeedback: string }
  ) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  deleteNotification: (id: string) => void;
  clearRead: () => void;
}

const ProfessorPrototypeContext = createContext<ProfessorPrototypeValue | null>(null);

export function ProfessorPrototypeProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState(initialActivities);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Mock de dados e ações para protótipo da área do professor.
  const value = useMemo<ProfessorPrototypeValue>(
    () => ({
      activities,
      submissions,
      notifications,
      students,
      saveActivity(data, id) {
        setActivities((current) =>
          id
            ? current.map((item) =>
              item.id === id
                ? {
                  ...item,
                  ...data,
                  attachment: {
                    ...item.attachment,
                    name: data.attachmentName,
                    type: data.attachmentType,
                  },
                  reward: {
                    ...item.reward,
                    name: data.rewardName,
                    type: data.rewardType,
                  },
                }
                : item
            )
            : [
              ...current,
              {
                id: `activity-${Date.now()}`,
                title: data.title,
                instruction: data.instruction,
                className: data.className,
                studentNames: data.studentNames,
                status: data.status,
                dueDate: data.dueDate,
                createdAt: new Date().toLocaleDateString('pt-BR'),
                attachment: {
                  id: `attachment-${Date.now()}`,
                  name: data.attachmentName,
                  type: data.attachmentType,
                },
                reward: {
                  id: `reward-${Date.now()}`,
                  name: data.rewardName,
                  type: data.rewardType,
                },
                submissionsCount: 0,
                studentsCount: data.studentNames.length || 28,
                correctedCount: 0,
              },
            ]
        );
      },
      deleteActivity(id) {
        setActivities((current) => current.filter((item) => item.id !== id));
      },
      confirmCorrection(id, result) {
        setSubmissions((current) =>
          current.map((item) =>
            item.id === id ? { ...item, ...result, status: result.decision } : item
          )
        );
      },
      markRead(id) {
        setNotifications((current) =>
          current.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
      },
      markAllRead() {
        setNotifications((current) =>
          current.map((item) => ({ ...item, read: true }))
        );
      },
      deleteNotification(id) {
        setNotifications((current) => current.filter((item) => item.id !== id));
      },
      clearRead() {
        setNotifications((current) => current.filter((item) => !item.read));
      },
    }),
    [activities, submissions, notifications]
  );

  return (
    <ProfessorPrototypeContext.Provider value={value}>
      {children}
    </ProfessorPrototypeContext.Provider>
  );
}

export function useProfessorPrototype() {
  const value = useContext(ProfessorPrototypeContext);
  if (!value) {
    throw new Error('useProfessorPrototype deve ser usado dentro do provider');
  }
  return value;
}