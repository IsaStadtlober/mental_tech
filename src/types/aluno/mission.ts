export type MissionStatus =
  | 'pending'
  | 'inProgress'
  | 'awaitingReview'
  | 'revision'
  | 'approved';
  
export interface StudentMission {
  title: string;
  instruction: string;
  attachmentName: string;
  estimate: string;
  rewardCoins: number;
  status: MissionStatus;
  feedback?: string;
  responseName?: string;
  firstRewardGranted: boolean;
}