import type { MissionPresentation, MissionStatus } from '../../types/aluno';

export const MISSION_PRESENTATION: Record<MissionStatus, MissionPresentation> =
  {
    pending: {
      status: 'pending',
      label: 'Nova missão',
      action: 'Começar missão',
      tone: 'primary',
      trailStep: 1,
    },
    inProgress: {
      status: 'inProgress',
      label: 'Em andamento',
      action: 'Continuar',
      tone: 'primary',
      trailStep: 1,
    },
    awaitingReview: {
      status: 'awaitingReview',
      label: 'Aguardando correção',
      action: 'Ver detalhes',
      tone: 'info',
      trailStep: 2,
    },
    revision: {
      status: 'revision',
      label: 'Revisão disponível',
      action: 'Ver orientação',
      tone: 'warning',
      trailStep: 2,
    },
    approved: {
      status: 'approved',
      label: 'Missão concluída',
      action: 'Ver conquista',
      tone: 'success',
      trailStep: 3,
    },
  };