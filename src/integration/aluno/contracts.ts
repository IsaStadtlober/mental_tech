import type {
  PurchaseResult, RecentActivity, StudentMission,
  StudentNotification, SubmissionResult
} from '../../types/aluno';

export interface StudentJourneySnapshot {
  mission: StudentMission | null;
  history: RecentActivity[];
  notifications: StudentNotification[];
  coins: number;
  ownedItemIds: string[];
}
export interface StudentJourneyGateway {
  loadJourney(): Promise<StudentJourneySnapshot>;
  submitMission(
    missionId: string,
    localFileUri: string,
  ): Promise<SubmissionResult>;
  acquireItem(itemId: string): Promise<PurchaseResult>;
  equipItem(itemId: string): Promise<void>;
  markNotificationRead(id: string): Promise<void>;
}