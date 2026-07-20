import { useMemo, useState } from 'react';

import { ACTIVITY_MESSAGES } from '@/constants/professor/activities';
import type { Activity } from '@/types/professor';
import {
    getActivityConfigurationRows,
    getActivityHeaderMeta,
    getActivityMetrics,
    getActivityParticipation,
    getAttachmentTypeLabel,
    getDownloadMessage,
    getPendingCorrectionsCount,
} from '@/utils/activities';

export function useActivityDetail(activity: Activity) {
    const [downloadMessage, setDownloadMessage] = useState('');

    const pendingCorrections = useMemo(
        () => getPendingCorrectionsCount(activity),
        [activity],
    );

    const participation = useMemo(
        () => getActivityParticipation(activity),
        [activity],
    );

    const metrics = useMemo(
        () => getActivityMetrics(activity, pendingCorrections, participation),
        [activity, participation, pendingCorrections],
    );

    const configurationRows = useMemo(
        () => getActivityConfigurationRows(activity),
        [activity],
    );

    const headerMeta = useMemo(() => getActivityHeaderMeta(activity), [activity]);
    const attachmentTypeLabel = useMemo(() => getAttachmentTypeLabel(activity), [activity]);

    function simulateDownload() {
        setDownloadMessage(getDownloadMessage(activity));
    }

    return {
        downloadMessage,
        setDownloadMessage,
        pendingCorrections,
        participation,
        metrics,
        configurationRows,
        headerMeta,
        attachmentTypeLabel,
        simulateDownload,
        messages: ACTIVITY_MESSAGES,
    };
}