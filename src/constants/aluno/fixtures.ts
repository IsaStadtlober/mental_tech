import type {
  RecentActivity, StudentNotification, StudentPrototypeState
} from '../../types/aluno';
import { INITIAL_COINS, INITIAL_MISSION } from './mission';
import { INITIAL_OWNED_ITEMS } from './shop';

/** Dados exclusivamente demonstrativos. O produto oficial deve injetar fontes reais. */
export const PROTOTYPE_HISTORY: RecentActivity[] = [
  {
    id: 'history-1',
    title: 'Mapa dos Biomas',
    status: 'approved',
    grade: 10,
    dateLabel: 'Ontem',
  },
  {
    id: 'history-2',
    title: 'Cadeia Alimentar',
    status: 'approved',
    grade: 9,
    dateLabel: '22 jul',
  },
  {
    id: 'history-3',
    title: 'Ciclo da Água',
    status: 'revision',
    dateLabel: '18 jul',
  },
];

/** Notificações mockadas para validar leitura, categorias e destinos sem push/backend. */
export const PROTOTYPE_NOTIFICATIONS: StudentNotification[] = [
  {
    id: 'notification-1',
    title: 'Nova missão disponível',
    description: 'Descobrindo Biomas já está na sua trilha.',
    category: 'mission',
    read: false,
    destination: 'mission',
  },
  {
    id: 'notification-2',
    title: 'Atividade aprovada',
    description: 'Mapa dos Biomas recebeu nota 10.',
    category: 'system',
    read: false,
    destination: 'history',
  },
  {
    id: 'notification-3',
    title: 'Recompensa conquistada',
    description: 'A Mochila Cósmica foi adicionada ao seu inventário.',
    category: 'reward',
    read: true,
    destination: 'reward',
  },
  {
    id: 'notification-4',
    title: 'Correção anterior',
    description: 'A orientação da professora foi respondida com sucesso.',
    category: 'revision',
    read: true,
    destination: 'history',
  },
];

export const INITIAL_STUDENT_PROTOTYPE_STATE: StudentPrototypeState = {
  session: { explorerName: '', coins: INITIAL_COINS },
  mission: { ...INITIAL_MISSION },
  missionAvailable: true,
  ownedItemIds: [...INITIAL_OWNED_ITEMS],
  equippedBySlot: { head: 'green-cap' },
  notifications: PROTOTYPE_NOTIFICATIONS.map((item) => ({ ...item })),
};