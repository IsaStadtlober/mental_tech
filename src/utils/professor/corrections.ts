import { CORRECTION_MESSAGES } from '@/constants/professor/corrections';
import type { CorrectionFilter } from '@/types/professor/corrections';
import type { Submission } from '@/types/professor';

export function getFilteredPendingSubmissions({
    submissions,
    query,
    filter,
}: {
    submissions: Submission[];
    query: string;
    filter: CorrectionFilter;
}): Submission[] {
    const normalizedQuery = query.trim().toLowerCase();

    return submissions.filter((submission) => {
        const needsCorrection = submission.status === 'pending';
        const matchesClass = filter === 'all' || submission.className === filter;
        const matchesQuery =
            !normalizedQuery ||
            submission.studentName.toLowerCase().includes(normalizedQuery) ||
            submission.activityTitle.toLowerCase().includes(normalizedQuery);

        return needsCorrection && matchesClass && matchesQuery;
    });
}

export function getPendingSubmissionsLabel(count: number): string {
    return count === 1 ? CORRECTION_MESSAGES.count.one : CORRECTION_MESSAGES.count.many;
}

export function getAttachmentTypeLabel(type: Submission['attachment']['type']): string {
    return type === 'image' ? 'Imagem' : type === 'doc' ? 'Word' : 'PDF';
}