import type { StudentPrototypeState, SubmissionResult } from "./prototype";
import type { ShopItem } from "./shop";
import type { PurchaseResult } from "./prototype";
export interface StudentPrototypeContextValue extends StudentPrototypeState {
  setExplorerName: (name: string) => void;
  saveMission: () => void;
  submitMission: (
    fileUriOrName: string,
    fileName?: string,
  ) => Promise<SubmissionResult>;

  acquireOrEquip: (item: ShopItem) => Promise<PurchaseResult>;

  saveAvatar: () => Promise<void>;
  equipReward: () => void;
  markNotificationRead: (notificationId: string) => void;
}
