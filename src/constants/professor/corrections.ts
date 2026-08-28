import type { FileType, SubmissionStatus } from "@/types/professor";
import type {
  CorrectionFilter,
  StatusFilter,
} from "@/types/professor/corrections";

// Filtros de turma.
export const CORRECTION_CLASS_FILTERS: {
  value: CorrectionFilter;
  label: string;
}[] = [
  { value: "all", label: "Todas as turmas" },
  { value: "5º Ano A", label: "5º Ano A" },
  { value: "5º Ano B", label: "5º Ano B" },
];

// Filtros de status (Pílulas da tela)
export const STATUS_FILTER_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: "Todos", value: "all" },
  { label: "Pendentes", value: "pending" },
  { label: "Não respondidos", value: "not_submitted" },
  { label: "Respondidos", value: "revision" },
  { label: "Corrigidos", value: "corrected" },
];

// Tipos de arquivos.
export const FILE_TYPE_LABELS: Record<FileType, string> = {
  pdf: "PDF",
  doc: "Word",
  image: "Imagem",
};

// Mensagens de correção.
export const CORRECTION_MESSAGES = {
  header: {
    title: "Fila de correção",
    subtitle:
      "Priorize os envios mais antigos e acompanhe as atividades que precisam de avaliação.",
    backButton: "Dashboard",
    detailBackLabel: "Fila de correção",
  },
  search: {
    label: "Pesquisar na fila",
    placeholder: "Nome do aluno ou atividade",
  },
  filters: {
    label: "Filtrar por turma",
    statusLabel: "Filtrar por status",
  },
  emptyState: {
    title: "Nada para corrigir",
    description:
      "Seus alunos estão em dia ou nenhum envio corresponde aos filtros selecionados.",
  },
  count: {
    one: "envio aguardando",
    many: "envios aguardando",
  },
  actions: {
    correct: "Corrigir",
    moreOld: "Mais antigo",
    download: "Baixar resposta",
  },
  detail: {
    attachmentTitle: "Arquivo enviado",
    attachmentSubtitle: "Visualizador universal representado no protótipo.",
    evaluationTitle: "Resultado da avaliação",
    evaluationSubtitle: "Escolha entre aprovar ou devolver para revisão.",
    approve: "Aprovar",
    requestRevision: "Solicitar revisão",
    gradeLabel: "Nota",
    commentLabel: "Comentário do professor",
    revisionLabel: "Feedback para revisão",
    rewardLabel: "Recompensa",
    confirm: "Confirmar avaliação",
    placeholder: "Digite a observação…",
    gradePlaceholder: "Ex.: 8,5",
    revisionPlaceholder: "Explique o que precisa ser ajustado.",
  },
};

// Rótulos de status atualizados com todas as opções de SubmissionStatus
export const CORRECTION_DECISION_LABELS: Record<SubmissionStatus, string> = {
  not_submitted: "Aguardando envio",
  pending: "Pendente",
  revision: "Respondido",
  corrected: "Corrigido",
};
