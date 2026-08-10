import type { MissionStatus, StudentMission } from './mission';
import type { ShopCategory, ShopItem } from './shop';
import type { StudentSession } from './trail';

export type EquippedBySlot = Partial<Record<ShopCategory, string>>;
export type PrototypeOperationStatus = 'idle' | 'loading' | 'success' | 'error';

export interface StudentNotification {
  id: string;
  title: string;
  description: string;
  category: 'mission' | 'revision' | 'reward' | 'system';
  read: boolean;
  destination: 'mission' | 'reward' | 'history';
}

export interface StudentPrototypeState {
  session: StudentSession;
  mission: StudentMission;
  missionAvailable: boolean;
  ownedItemIds: string[];
  equippedBySlot: EquippedBySlot;
  notifications: StudentNotification[];
}

export type SubmissionResult =
  | { kind: 'firstSubmission'; coinsGranted: number }
  | { kind: 'resubmission' }
  | { kind: 'invalid'; message: string };

export type PurchaseResult =
  | { kind: 'purchased'; remainingCoins: number }
  | { kind: 'equipped' }
  | { kind: 'insufficientFunds'; missingCoins: number }
  | { kind: 'missionExclusive' };

export type StudentPrototypeAction =
  | { type: 'setExplorerName'; name: string }
  | { type: 'saveMission' }
  | { type: 'submitMission'; fileName: string; firstSubmission: boolean }
  | { type: 'buyOrEquip'; item: ShopItem }
  | { type: 'equipReward' }
  | { type: 'markNotificationRead'; notificationId: string };

export interface MissionPresentation {
  label: string;
  action: string;
  tone: 'primary' | 'info' | 'warning' | 'success';
  trailStep: number;
  status: MissionStatus;
}