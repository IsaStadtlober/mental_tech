import type { WizardStepType } from '../types/wizard';

export const WIZARD_TOTAL_STEPS = 3;

export const WIZARD_PERIOD_OPTIONS = ['Manhã', 'Tarde', 'Integral'] as const;

export const WIZARD_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const WIZARD_STEP_META: Record<WizardStepType, { title: string; caption: string }> = {
    1: {
        title: 'Crie sua primeira turma',
        caption: 'Dê um nome para a turma que você vai gerenciar.',
    },
    2: {
        title: 'Vincular Professor',
        caption: 'Agora, informe quem será o responsável por guiar esta turma.',
    },
    3: {
        title: 'Adicionar Alunos',
        caption: 'Cadastre os alunos que farão parte desta turma.',
    },
    4: {
        title: 'Turma pronta',
        caption: 'Seu cadastro foi concluído com sucesso.',
    },
};
