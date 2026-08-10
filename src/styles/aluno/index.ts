import { avatarStudentStyles } from './avatar';
import { celebrationStudentStyles } from './celebration';
import { commonStudentStyles, studentStyleHelpers } from './common';
import { historyStudentStyles } from './history';
import { missionStudentStyles } from './mission';
import { notificationsStudentStyles } from './notifications';
import { shopStudentStyles } from './shop';
import { trailStudentStyles, trailStyleHelpers } from './trail';

export {
    avatarStudentStyles,
    celebrationStudentStyles,
    commonStudentStyles,
    historyStudentStyles,
    missionStudentStyles,
    notificationsStudentStyles,
    shopStudentStyles,
    studentStyleHelpers,
    trailStudentStyles,
    trailStyleHelpers
};

export const alunoStyles = {
    ...commonStudentStyles,
    ...avatarStudentStyles,
    ...trailStudentStyles,
    ...trailStyleHelpers,
    ...missionStudentStyles,
    ...shopStudentStyles,
    ...historyStudentStyles,
    ...notificationsStudentStyles,
    ...celebrationStudentStyles,
};