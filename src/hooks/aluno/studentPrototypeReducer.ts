import type {
  StudentPrototypeAction,
  StudentPrototypeState,
} from "../../types/aluno";
import { MISSION_REWARD_ITEM_ID } from "../../constants/aluno/mission";

export function studentPrototypeReducer(
  state: StudentPrototypeState,
  action: StudentPrototypeAction,
): StudentPrototypeState {
  switch (action.type) {
    case "loadSupabaseData":
      return {
        ...state,
        session: {
          ...state.session,
          explorerName: action.explorerName,
          coins: action.coins,
        },
        shopItems: action.shopItems || [],
        ownedItemIds: action.ownedItemIds || [],
        equippedBySlot: action.equippedBySlot || {},
        mission: action.mission,
      };

    case "setExplorerName":
      return {
        ...state,
        session: { ...state.session, explorerName: action.name },
      };
    case "saveMission":
      return {
        ...state,
        mission: { ...state.mission, status: "not_submitted" },
      };
    case "submitMission":
      return {
        ...state,
        session: action.firstSubmission
          ? {
              ...state.session,
              coins: state.session.coins + state.mission.rewardCoins,
            }
          : state.session,
        mission: {
          ...state.mission,
          responseName: action.fileName,
          status: "pending",
          firstRewardGranted: true,
        },
        notifications: state.notifications.map((item) =>
          item.category === "mission" ? { ...item, read: true } : item,
        ),
      };
    case "buyOrEquip": {
      const owned = state.ownedItemIds.includes(action.item.id);
      if (
        !owned &&
        (action.item.missionOnly || state.session.coins < action.item.price)
      )
        return state;
      return {
        ...state,
        session: owned
          ? state.session
          : {
              ...state.session,
              coins: state.session.coins - action.item.price,
            },
        ownedItemIds: owned
          ? state.ownedItemIds
          : [...state.ownedItemIds, action.item.id],
        equippedBySlot: {
          ...state.equippedBySlot,
          [action.item.category]: action.item.id,
        },
      };
    }
    case "equipReward":
      return {
        ...state,
        equippedBySlot: {
          ...state.equippedBySlot,
          accessories: MISSION_REWARD_ITEM_ID,
        },
      };
    case "markNotificationRead":
      return {
        ...state,
        notifications: state.notifications.map((item) =>
          item.id === action.notificationId ? { ...item, read: true } : item,
        ),
      };
  }
}
