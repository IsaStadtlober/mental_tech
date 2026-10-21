import { useMemo } from 'react';
import { PROFESSOR_DASHBOARD_MESSAGES } from '@/constants/professor/professor';
import type { Activity, Class, Student, Submission } from '@/types/professor';
import {
  getClassSummaries,
  getDashboardMetricConfig,
  getInactiveStudentsCount,
  getPendingCorrectionsCount,
  getPublishedActivitiesCount,
} from '@/utils/professor/dashboard';

export function useEducatorDashboard(
  activities: Activity[] = [],
  submissions: Submission[] = [],
  students: Student[] = [],
  classes: Class[] = []
) {
  const pendingCorrectionsCount = useMemo(
    () => getPendingCorrectionsCount(submissions),
    [submissions],
  );

  const publishedActivitiesCount = useMemo(
    () => getPublishedActivitiesCount(activities),
    [activities],
  );

  // 👈 Passa 'students' e 'submissions' para calcular a inatividade real
  const inactiveStudentsCount = useMemo(
    () => getInactiveStudentsCount(students, submissions),
    [students, submissions],
  );

  // 👈 Passa todos os arrays para calcular a % real de entregas por turma
  const classSummaries = useMemo(
    () => getClassSummaries(classes, students, submissions, activities),
    [classes, students, submissions, activities],
  );

  const overallParticipation = useMemo(() => {
    if (!classSummaries.length) return 0;
    const total = classSummaries.reduce((acc, curr) => acc + curr.participation, 0);
    return Math.round(total / classSummaries.length);
  }, [classSummaries]);

  const metrics = useMemo(
    () =>
      getDashboardMetricConfig({
        pendingCorrectionsCount,
        publishedActivitiesCount,
        inactiveStudentsCount,
        overallParticipation,
      }),
    [
      pendingCorrectionsCount,
      publishedActivitiesCount,
      inactiveStudentsCount,
      overallParticipation,
    ],
  );

  return {
    pendingCorrectionsCount,
    publishedActivitiesCount,
    inactiveStudentsCount,
    overallParticipation,
    classSummaries,
    metrics,
    messages: PROFESSOR_DASHBOARD_MESSAGES,
  };
}