import React, {
  createContext, useCallback, useContext, useMemo, useReducer
} from 'react';
import { INITIAL_STUDENT_PROTOTYPE_STATE } from '../../constants/aluno/fixtures';
import type {
  PurchaseResult,
  ShopItem,
  StudentPrototypeState,
  SubmissionResult,
} from '../../types/aluno';
import { studentPrototypeReducer } from './studentPrototypeReducer';

interface StudentPrototypeContextValue extends StudentPrototypeState {
  setExplorerName(name: string): void;
  saveMission(): void;
  submitMission(fileName: string): SubmissionResult;
  acquireOrEquip(item: ShopItem): PurchaseResult;
  equipReward(): void;
  markNotificationRead(notificationId: string): void;
}

const StudentPrototypeContext =
  createContext<StudentPrototypeContextValue | null>(null);

export function StudentPrototypeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    studentPrototypeReducer,
    INITIAL_STUDENT_PROTOTYPE_STATE,
  );
  const setExplorerName = useCallback(
    (name: string) => dispatch({ type: 'setExplorerName', name }),
    [],
  );
  const saveMission = useCallback(() => dispatch({ type: 'saveMission' }), []);
  const submitMission = useCallback(
    (fileName: string): SubmissionResult => {
      if (!fileName.trim())
        return {
          kind: 'invalid',
          message: 'Escolha um arquivo antes de enviar.',
        };
      const firstSubmission = !state.mission.firstRewardGranted;
      dispatch({ type: 'submitMission', fileName, firstSubmission });
      return firstSubmission
        ? { kind: 'firstSubmission', coinsGranted: state.mission.rewardCoins }
        : { kind: 'resubmission' };
    },
    [state.mission.firstRewardGranted, state.mission.rewardCoins],
  );
  const acquireOrEquip = useCallback(
    (item: ShopItem): PurchaseResult => {
      const owned = state.ownedItemIds.includes(item.id);
      if (!owned && item.missionOnly) return { kind: 'missionExclusive' };
      if (!owned && state.session.coins < item.price)
        return {
          kind: 'insufficientFunds',
          missingCoins: item.price - state.session.coins,
        };
      dispatch({ type: 'buyOrEquip', item });
      return owned
        ? { kind: 'equipped' }
        : {
          kind: 'purchased',
          remainingCoins: state.session.coins - item.price,
        };
    },
    [state.ownedItemIds, state.session.coins],
  );
  const equipReward = useCallback(() => dispatch({ type: 'equipReward' }), []);
  const markNotificationRead = useCallback(
    (notificationId: string) =>
      dispatch({ type: 'markNotificationRead', notificationId }),
    [],
  );
  const value = useMemo(
    () => ({
      ...state,
      setExplorerName,
      saveMission,
      submitMission,
      acquireOrEquip,
      equipReward,
      markNotificationRead,
    }),
    [
      state,
      setExplorerName,
      saveMission,
      submitMission,
      acquireOrEquip,
      equipReward,
      markNotificationRead,
    ],
  );
  return (
    <StudentPrototypeContext.Provider value={value}>
      {children}
    </StudentPrototypeContext.Provider>
  );
}

export function useStudentPrototype() {
  const value = useContext(StudentPrototypeContext);
  if (!value)
    throw new Error(
      'useStudentPrototype deve estar dentro de StudentPrototypeProvider',
    );
  return value;
}