import type { StudentMission } from '../../types/aluno/mission';

export const INITIAL_COINS = 40;
export const MISSION_REWARD_ITEM_ID = 'cosmic-backpack';
export const INITIAL_MISSION: StudentMission = {
  title: 'Descobrindo Biomas',
  instruction:
    'Leia o material, faça a atividade e envie uma foto ou arquivo com sua resposta.',
  attachmentName: 'biomas-do-brasil.pdf',
  estimate: '20 min',
  rewardCoins: 30,
  status: 'pending',
  firstRewardGranted: false,
};