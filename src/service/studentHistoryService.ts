import { supabase } from "@/service/supabase";

export type StudentHistoryItem = {
  submissionId: string;
  activityId: string;
  title: string;
  status: string;
  submittedAt: string | null;
  correctedAt: string | null;
  teacherFeedback: string | null;
  performanceRating: string | null;
};

type SubmissionRecord = {
  id: string;
  activity_id: string;
  status: string;
  submitted_at: string | null;
  corrected_at: string | null;
  teacher_feedback: string | null;
  performance_rating: string | null;
};

type ActivityRecord = {
  id: string;
  title: string;
};

export async function getStudentHistory(
  studentId: string,
): Promise<StudentHistoryItem[]> {
  try {
    const { data: submissions, error: submissionsError } = await supabase
      .from("submissions")
      .select(
        "id, activity_id, status, submitted_at, corrected_at, teacher_feedback, performance_rating",
      )
      .eq("student_id", studentId)
      .order("submitted_at", { ascending: false, nullsFirst: false });

    if (submissionsError) {
      throw submissionsError;
    }

    const submissionRecords = (submissions ?? []) as SubmissionRecord[];

    if (submissionRecords.length === 0) {
      return [];
    }

    const activityIds = [
      ...new Set(submissionRecords.map((submission) => submission.activity_id)),
    ];
    const { data: activities, error: activitiesError } = await supabase
      .from("activities")
      .select("id, title")
      .in("id", activityIds);

    if (activitiesError) {
      throw activitiesError;
    }

    const activityById = new Map(
      ((activities ?? []) as ActivityRecord[]).map((activity) => [
        activity.id,
        activity,
      ]),
    );

    return submissionRecords.map((submission) => {
      const activity = activityById.get(submission.activity_id);

      if (!activity) {
        throw new Error(
          `Atividade ${submission.activity_id} não encontrada para a submission ${submission.id}.`,
        );
      }

      return {
        submissionId: submission.id,
        activityId: submission.activity_id,
        title: activity.title,
        status: submission.status,
        submittedAt: submission.submitted_at,
        correctedAt: submission.corrected_at,
        teacherFeedback: submission.teacher_feedback,
        performanceRating: submission.performance_rating,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar histórico do aluno no Supabase:", error);
    throw error;
  }
}