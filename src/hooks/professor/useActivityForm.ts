import { ACTIVITY_FORM_DEFAULTS, ACTIVITY_FORM_MESSAGES } from '@/constants/professor/activityForm';
import type { Activity, ActivityStatus, FileType, RewardType } from '@/types/professor';
import type { ActivityFormAudience, ActivityFormData } from '@/types/professor/activityForm';
import { getActivityFormStudentSelectionLabel } from '@/utils/professor/activityForm';
import { useMemo, useState } from 'react';

interface UseActivityFormProps {
    activity?: Activity | null;
    initialStudentName?: string | null;
}

export function useActivityForm({ activity, initialStudentName }: UseActivityFormProps) {
    const [title, setTitle] = useState(activity?.title ?? '');
    const [instruction, setInstruction] = useState(activity?.instruction ?? '');
    const [dueDate, setDueDate] = useState(activity?.dueDate ?? '');
    const [attachmentName, setAttachmentName] = useState(activity?.attachment?.name ?? '');
    const [attachmentType, setAttachmentType] = useState<FileType>(activity?.attachment?.type ?? 'pdf');
    const [rewardName, setRewardName] = useState(activity?.reward?.name ?? ACTIVITY_FORM_DEFAULTS.rewardName);
    const [rewardType, setRewardType] = useState<RewardType>(activity?.reward?.type ?? ACTIVITY_FORM_DEFAULTS.rewardType);
    const [className, setClassName] = useState<ActivityFormAudience>(() => {
        if (activity?.className) {
            return activity.className as ActivityFormAudience;
        }

        if (initialStudentName) {
            return 'Alunos específicos';
        }

        return ACTIVITY_FORM_DEFAULTS.audience;
    });
    const [selectedStudentNames, setSelectedStudentNames] = useState<string[]>(() => {
        if (activity?.studentNames?.length) {
            return activity.studentNames;
        }

        if (initialStudentName) {
            return [initialStudentName];
        }

        return [];
    });

    // Valida os campos principais do formulário antes de salvar.
    const titleIsValid = title.trim().length > 0;
    const instructionIsValid = instruction.trim().length > 0;
    const attachmentIsValid = attachmentName.trim().length > 0;
    const audienceIsValid = className !== 'Alunos específicos' || selectedStudentNames.length > 0;

    const formIsValid = titleIsValid && instructionIsValid && attachmentIsValid && audienceIsValid;

    const studentSelectionLabel = useMemo(() => getActivityFormStudentSelectionLabel(selectedStudentNames.length), [selectedStudentNames.length]);

    function toggleStudent(studentName: string) {
        setSelectedStudentNames((current) =>
            current.includes(studentName)
                ? current.filter((name) => name !== studentName)
                : [...current, studentName],
        );
    }

    function handleSave(status: ActivityStatus, onSave: (data: ActivityFormData) => void) {
        if (!formIsValid) {
            return;
        }

        onSave({
            title: title.trim(),
            instruction: instruction.trim(),
            className,
            studentNames: className === 'Alunos específicos' ? selectedStudentNames : [],
            dueDate: dueDate.trim() || undefined,
            attachmentName,
            attachmentType,
            rewardName,
            rewardType,
            status,
        });
    }

    return {
        title,
        setTitle,
        instruction,
        setInstruction,
        dueDate,
        setDueDate,
        attachmentName,
        setAttachmentName,
        attachmentType,
        setAttachmentType,
        rewardName,
        setRewardName,
        rewardType,
        setRewardType,
        className,
        setClassName,
        selectedStudentNames,
        setSelectedStudentNames,
        toggleStudent,
        handleSave,
        titleIsValid,
        instructionIsValid,
        attachmentIsValid,
        audienceIsValid,
        formIsValid,
        studentSelectionLabel,
        messages: ACTIVITY_FORM_MESSAGES,
    };
}