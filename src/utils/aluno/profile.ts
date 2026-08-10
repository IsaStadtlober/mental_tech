import type { StudentMission } from '../../types/aluno/mission';

export const getProfilePositionKey = (mission: StudentMission) => {
    if (mission.status === 'approved') {
        return 'approved';
    }

    if (mission.status === 'awaitingReview' || mission.status === 'revision') {
        return 'review';
    }

    return 'default';
};

export const getMissionCountValue = (missionStatus: StudentMission['status']) =>
    missionStatus === 'approved' ? '3' : '2';