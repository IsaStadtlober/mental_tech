export type MissionStatus =
  "pending" | "revision" | "not_submitted" | "corrected";

export interface StudentMission {
  id: string;
  title: string;
  instruction: string;
  attachmentName: string;
  fileUrl?: string;
  teacherName?: string;
  estimate: string;
  rewardCoins: number;
  status: MissionStatus;
  feedback?: string;
  responseName?: string;
  firstRewardGranted: boolean;
}
