import type { FileType, RewardType } from '@/types/professor';

export const ACTIVITY_FORM_AUDIENCES = ['5º Ano A', '5º Ano B', 'Alunos específicos'] as const;

// Filtros de atividade.
export const ACTIVITY_FORM_ATTACHMENT_OPTIONS: {
    label: string;
    name: string;
    type: FileType;
}[] = [
    {
        label: 'PDF',
        name: 'material-atividade.pdf',
        type: 'pdf',
    },
    {
        label: 'Word',
        name: 'atividade.docx',
        type: 'doc',
    },
    {
        label: 'Imagem',
        name: 'material.png',
        type: 'image',
    },
];

// Filtros de atividade.
export const ACTIVITY_FORM_REWARD_OPTIONS: {
    label: string;
    type: RewardType;
}[] = [
    {
        label: 'Medalha Explorador',
        type: 'medal',
    },
    {
        label: 'Mochila Verde',
        type: 'item',
    },
    {
        label: 'Item surpresa',
        type: 'item',
    },
];

export const ACTIVITY_FORM_DEFAULTS = {
    audience: '5º Ano A' as (typeof ACTIVITY_FORM_AUDIENCES)[number],
    rewardName: 'Medalha Explorador',
    rewardType: 'medal' as RewardType,
};

// Mensagens de atividade
export const ACTIVITY_FORM_MESSAGES = {
    backLabel: 'Atividades',
    headerTitle: 'Criar nova missão',
    headerTitleEdit: 'Editar atividade',
    headerSubtitle: 'Configure o material, os destinatários e a recompensa da atividade.',
    individualTitle: 'Missão individual para {name}',
    individualSubtitle: 'O destinatário foi preenchido a partir do perfil do aluno.',
    mainSectionTitle: 'Informações principais',
    mainSectionSubtitle: 'Explique a missão de forma curta e objetiva.',
    titleLabel: 'Título *',
    titlePlaceholder: 'Ex: Descobrindo os biomas',
    instructionLabel: 'Instrução curta *',
    instructionPlaceholder: 'Explique o que o aluno deve fazer',
    materialSectionTitle: 'Material da atividade',
    materialSectionSubtitle: 'O arquivo é obrigatório. O aluno fará o download e enviará uma resposta separada.',
    attachmentPlaceholder: 'Escolha um arquivo de exemplo',
    attachmentHint: 'PDF, Word ou imagem',
    attachmentDescription: 'Anexo simulado para o protótipo',
    removeAttachment: 'Remover',
    publicationSectionTitle: 'Publicação',
    publicationSectionSubtitle: 'Defina quem receberá a missão.',
    audienceLabel: 'Destinatários *',
    studentSelectionTitle: 'Selecionar alunos *',
    studentSelectionSubtitle: 'Escolha um ou mais alunos para receber esta missão.',
    dueDateLabel: 'Data de entrega',
    dueDatePlaceholder: 'DD/MM/AAAA',
    rewardLabel: 'Recompensa ao aprovar',
    rewardSelected: 'Selecionada',
    validationMessage: 'Preencha título, instrução, destinatário e material para continuar.',
    saveDraft: 'Salvar rascunho',
    publishAction: 'Publicar missão',
    saveChanges: 'Salvar alterações',
    noStudentsSelected: 'Selecione pelo menos um aluno.',
    oneStudentSelected: '1 aluno selecionado',
    manyStudentsSelected: '{count} alunos selecionados',
} as const;