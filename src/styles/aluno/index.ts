import { avatarStudentStyles } from './avatar';
import { celebrationStudentStyles } from './celebration';
import { commonStudentStyles } from './common';
import { historyStudentStyles } from './history';
import { missionStudentStyles } from './mission';
import { notificationsStudentStyles } from './notifications';
import { shopStudentStyles } from './shop';
import { trailStudentStyles } from './trail';

export {
    avatarStudentStyles,
    celebrationStudentStyles,
    commonStudentStyles,
    historyStudentStyles,
    missionStudentStyles,
    notificationsStudentStyles,
    shopStudentStyles,
    trailStudentStyles
};

export const alunoStyles = {
    ...commonStudentStyles,
    ...avatarStudentStyles,
    ...trailStudentStyles,
    ...missionStudentStyles,
    ...shopStudentStyles,
    ...historyStudentStyles,
    ...notificationsStudentStyles,
    ...celebrationStudentStyles,
};