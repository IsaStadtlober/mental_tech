import type { Reward } from "./activities";
import type { SubmissionStatus } from "./common";
import type { Submission } from "./submissions";

export type CorrectionFilter = "all" | (string & {});

// Novo tipo para o filtro de status
export type StatusFilter = "all" | SubmissionStatus;

export type CorrectionDecision = "approved" | "revision";

export interface CorrectionResult {
  decision: CorrectionDecision;
  grade: string;
  comment: string;
  revisionFeedback: string;
  reward: Reward;
}

export interface CorrectionQueueScreenProps {
  submissions?: Submission[];
  onBack: () => void;
  onOpenSubmission: (submissionId: string) => void;
}

export interface CorrectionScreenProps {
  submission: Submission;
  reward: Reward;
  onBack: () => void;
  onConfirm: (submissionId: string, result: CorrectionResult) => void;
}
