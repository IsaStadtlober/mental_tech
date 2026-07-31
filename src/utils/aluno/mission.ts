import type { StudentMission } from '../../types/aluno/mission';

export const isRevision = (mission: StudentMission) =>
  mission.status === 'revision';