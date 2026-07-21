import { useMemo, useState } from 'react';

import { PROFESSOR_REPORTS_MESSAGES, REPORT_MODES, REPORT_PERIODS } from '@/constants/professor/professor';
import type { Activity, ReportMode, ReportPeriod, ReportSummary, Submission } from '@/types/professor';
import { getReportSummary } from '@/utils/professor/reports';

export function useEducatorReports(activities: Activity[], submissions: Submission[]) {
    const [mode, setMode] = useState<ReportMode>('class');
    const [period, setPeriod] = useState<ReportPeriod>('30');
    const [selectedStudentId, setSelectedStudentId] = useState('student-1');
    const [shareMessage, setShareMessage] = useState('');
    const [exportMessage, setExportMessage] = useState('');

    const messages = PROFESSOR_REPORTS_MESSAGES;
    const reportModes = REPORT_MODES;
    const reportPeriods = REPORT_PERIODS;

    const summary = useMemo<ReportSummary>(() => getReportSummary(activities, submissions, period), [activities, submissions, period]);

    function simulateShare() {
        setExportMessage('');
        setShareMessage(messages.actions.shareSuccess);
    }

    function simulateExport() {
        setShareMessage('');
        setExportMessage(messages.actions.exportSuccess);
    }

    return {
        mode,
        setMode,
        period,
        setPeriod,
        selectedStudentId,
        setSelectedStudentId,
        shareMessage,
        setShareMessage,
        exportMessage,
        setExportMessage,
        messages,
        reportModes,
        reportPeriods,
        summary,
        simulateShare,
        simulateExport,
    };
}
