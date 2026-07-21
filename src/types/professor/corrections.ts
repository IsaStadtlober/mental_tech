import type { Reward } from './activities';
import type { Submission } from './submissions';

export type CorrectionFilter = 'all' | '5º Ano A' | '5º Ano B';

export type CorrectionDecision = 'approved' | 'revision';

export interface CorrectionResult {
    decision: CorrectionDecision;
    grade: string;
    comment: string;
    revisionFeedback: string;
    reward: Reward;
}

export interface CorrectionQueueScreenProps {
    submissions: Submission[];
    onBack: () => void;
    onOpenSubmission: (submissionId: string) => void;
}

export interface CorrectionScreenProps {
    submission: Submission;
    reward: Reward;
    onBack: () => void;
    onConfirm: (submissionId: string, result: CorrectionResult) => void;
}