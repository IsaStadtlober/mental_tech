import type { MissionStatus } from '../../types/aluno';

export const MAP_HEIGHT = 1040;
export const MAP_PATH =
  'M78 900 C105 840 230 810 255 720 C280 630 130 620 105 535 C80 450 238 435 265 350 C292 265 145 245 120 165';

export const TRAIL_AVATAR_POSITIONS: Record<
  MissionStatus,
  { left: number; top: number }
> = {
  pending: { left: 42, top: 820 },
  inProgress: { left: 42, top: 820 },
  awaitingReview: { left: 160, top: 748 },
  revision: { left: 160, top: 748 },
  approved: { left: 217, top: 650 },
};

// Posições visuais fixas no mapa onde os nós serão renderizados
export const MAP_NODE_ANCHORS = [
  { id: 1, x: 78, y: 900 },
  { id: 2, x: 255, y: 720 },
  { id: 3, x: 105, y: 535 },
  { id: 4, x: 265, y: 350 },
  { id: 5, x: 120, y: 165 },
];