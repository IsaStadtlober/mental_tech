import type { StudentMission } from '../../types/aluno/mission';

export const INITIAL_COINS = 40;
export const MISSION_REWARD_ITEM_ID = 'cosmic-backpack';

export const INITIAL_MISSION: StudentMission = {
  id: '',
  title: '',
  instruction: '',
  attachmentName: '',
  estimate: '',
  rewardCoins: 0,
  status: 'pending',
  firstRewardGranted: false,
};