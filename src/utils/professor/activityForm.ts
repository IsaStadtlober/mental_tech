import type { ActivityFormAudience } from '@/types/professor/activityForm';

export function getActivityFormStudentSelectionLabel(count: number): string {
    if (count === 0) {
        return 'Selecione pelo menos um aluno.';
    }

    if (count === 1) {
        return '1 aluno selecionado';
    }

    return `${count} alunos selecionados`;
}

export function isActivityFormAudienceSpecific(audience: ActivityFormAudience): boolean {
    return audience === 'Alunos específicos';
}