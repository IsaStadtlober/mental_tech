import { useMemo, useState } from "react";

import {
  PROFESSOR_REPORTS_MESSAGES,
  REPORT_MODES,
  REPORT_PERIODS,
} from "@/constants/professor/professor";
import type {
  Activity,
  Class,
  EducatorStudentOption,
  ReportMode,
  ReportPeriod,
  ReportSummary,
  Submission,
} from "@/types/professor";
import { generateAndSharePdfReport } from "@/service/pdfProfessorService";
import { getReportSummary } from "@/utils/professor/reports";

export function useEducatorReports(
  activities: Activity[],
  submissions: Submission[],
  students: EducatorStudentOption[],
  classes: Class[],
) {
  const [mode, setMode] = useState<ReportMode>("class");
  const [period, setPeriod] = useState<ReportPeriod>("30");
  const [selectedStudentId, setSelectedStudentId] = useState(
    students[0]?.id || "",
  );
  const [shareMessage, setShareMessage] = useState("");
  const [exportMessage, setExportMessage] = useState("");

  const messages = PROFESSOR_REPORTS_MESSAGES;
  const reportModes = REPORT_MODES;
  const reportPeriods = REPORT_PERIODS;

  const summary = useMemo<ReportSummary>(
    () => getReportSummary(activities, submissions, students, classes, period),
    [activities, submissions, students, classes, period],
  );

  // 📄 Função real para gerar e compartilhar o PDF
  const handleExportOrSharePdf = async () => {
    const selectedStudent = summary.students.find(
      (s) => s.id === selectedStudentId,
    );

    await generateAndSharePdfReport({
      summary,
      mode,
      period,
      selectedStudent,
    });
  };

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
    simulateShare: handleExportOrSharePdf, 
    simulateExport: handleExportOrSharePdf,
  };
}