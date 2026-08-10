import type { StudentPrototypeState, SubmissionResult } from './prototype';
import type { ShopItem } from './shop';


export interface StudentPrototypeContextValue extends StudentPrototypeState {
    setExplorerName(name: string): void;
    saveMission(): void;
    submitMission(fileName: string): SubmissionResult;
    acquireOrEquip(item: ShopItem): import('./prototype').PurchaseResult;
    equipReward(): void;
    markNotificationRead(notificationId: string): void;
}