import type { WizardStepType } from "../types/wizard";

// Constantes de autenticação de estudante
export const STUDENT_AUTH_CONSTANTS = {
  MIN_PIN_LENGTH: 4,
  MAX_PIN_LENGTH: 4,
  PLACEHOLDERS: {
    CLASS_CODE: "EX: 12AB",
    PIN: "****",
    EXPLORER_NAME: "Ex: Léo Aventureiro",
  },
  LABELS: {
    CLASS_CODE: "Código da Turma",
    PIN: "PIN (4 números)",
    EXPLORER_NAME: "Dê um nome ao seu explorador",
  },
  TEXTS: {
    LOGIN_TITLE: "Entrar na aventura",
    LOGIN_SUBTITLE: "Peça o código e o PIN para sua professora.",
    NAME_TITLE: "Qual é o nome do seu explorador?",
    NAME_SUBTITLE: "Esse será o nome do seu companheiro em toda a jornada.",
    DONE_EYEBROW: "Tudo pronto",
    DONE_DESCRIPTION: "Vamos rumo à sua primeira missão.",
    BUTTON_ENTER: "Entrar",
    BUTTON_CONTINUE: "Pronto! Vamos explorar!",
    BUTTON_ACCESS_ACCOUNT: "Acessar minha conta",
  },
};

// Constantes de autenticação de educador
export const EDUCATOR_AUTH_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 6,
  PLACEHOLDERS: {
    SCHOOL_NAME: "Ex: Escola Caminho do Saber",
    LEGAL_NAME: "Ex: Associação Educacional Caminho",
    CNPJ: "00.000.000/0000-00",
    PHONE: "(11) 99999-9999",
    INEP_CODE: "Ex: 12345678",
    ZIP_CODE: "00000-000",
    STREET: "Ex: Rua das Acácias",
    NUMBER: "Ex: 123",
    COMPLEMENT: "Ex: Bloco A, Sala 5",
    NEIGHBORHOOD: "Ex: Centro",
    CITY: "Ex: São Paulo",
    STATE: "Ex: SP",
    EMAIL: "seu@email.com",
    PASSWORD: "••••••••",
    CREATE_PASSWORD: "Mínimo 6 caracteres",
    CONFIRM_PASSWORD: "Digite a senha novamente",
  },
  LABELS: {
    SCHOOL_NAME: "Nome fantasia",
    LEGAL_NAME: "Razão social",
    CNPJ: "CNPJ",
    PHONE: "Telefone de contato",
    INEP_CODE: "Código INEP",
    ZIP_CODE: "CEP",
    STREET: "Rua",
    NUMBER: "Número",
    COMPLEMENT: "Complemento",
    NEIGHBORHOOD: "Bairro",
    CITY: "Cidade",
    STATE: "Estado",
    EMAIL: "E-mail",
    RESPONSIBLE_EMAIL: "E-mail do responsável",
    PASSWORD: "Senha",
    CREATE_PASSWORD: "Crie uma senha",
    CONFIRM_PASSWORD: "Confirme a senha",
  },
  ERRORS: {
    PASSWORD_MISMATCH: "As senhas não coincidem",
    PASSWORD_TOO_SHORT: "A senha precisa ter pelo menos 6 caracteres",
  },
  TEXTS: {
    LOGIN_TITLE: "Entrar como Educador",
    LOGIN_SUBTITLE: "Use o e-mail e senha da sua conta de Professor ou Escola.",
    SIGNUP_TITLE: "Cadastre sua Escola",
    SIGNUP_SUBTITLE:
      "Vamos criar o espaço da sua instituição para gerenciar turmas, professores e alunos.",
    RECOVERY_TITLE: "Recuperar senha",
    RECOVERY_SUBTITLE:
      "Informe seu e-mail para receber as instruções de recuperação.",
    RECOVERY_HELPER:
      "Enviaremos um link para redefinir sua senha. Verifique também a caixa de spam ou lixo eletrônico.",
    ACTIVATION_TITLE: "Ative sua conta de professor",
    ACTIVATION_SUBTITLE: "Defina seus dados de acesso para entrar no Portal do Professor.",
    WELCOME_TITLE: "Bem-vindo de volta! Sua turma já está te esperando.",
    SENT_TITLE: "Verifique sua caixa de entrada",
    SENT_DESCRIPTION:
      "Enviamos um link de recuperação para o e-mail informado.",
    SENT_NOTICE_TITLE: "Aviso importante",
    SENT_NOTICE_TEXT:
      "O link pode levar alguns minutos para chegar. Se não encontrar, confira também o spam ou lixo eletrônico.",
    BUTTON_ENTER: "Entrar",
    BUTTON_CONTINUE: "Continuar cadastro",
    BUTTON_SEND_LINK: "Enviar link",
    ACTIVATION_BUTTON: "Ativar conta e acessar",
  },
};

// Constantes do Wizard de criação de turma
export const WIZARD_TOTAL_STEPS = 3;
export const WIZARD_PERIOD_OPTIONS = ["Manhã", "Tarde", "Integral"] as const;
export const WIZARD_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const WIZARD_STEP_META: Record<
  WizardStepType,
  { title: string; caption: string }
> = {
  1: {
    title: "Crie sua primeira turma",
    caption: "Dê um nome para a turma que você vai gerenciar.",
  },
  2: {
    title: "Vincular Professor",
    caption: "Agora, informe quem será o responsável por guiar esta turma.",
  },
  3: {
    title: "Adicionar Alunos",
    caption: "Cadastre os alunos que farão parte desta turma.",
  },
  4: {
    title: "Turma pronta",
    caption: "Seu cadastro foi concluído com sucesso.",
  },
};

export const WIZARD_CONSTANTS = {
  STEP_CLASS: {
    CAPTION: "Passo 1 de 3",
    TITLE: "Crie sua primeira turma",
    SUBTITLE: "Dê um nome para a turma que você vai gerenciar.",
    LABELS: {
      CLASS_NAME: "Nome da Turma",
      GRADE: "Série/Ano",
    },
    PLACEHOLDERS: {
      CLASS_NAME: "Ex: 4º Ano A",
      GRADE: "Ex: 4º Ano",
    },
    BUTTON: "Criar turma",
  },
  STEP_TEACHER: {
    CAPTION: "Passo 2 de 3",
    TITLE: "Vincular Professor",
    SUBTITLE: "Agora, informe quem será o responsável por guiar esta turma.",
    LABELS: {
      TEACHER_EMAIL: "E-mail do professor",
      CONTEXT: "Contexto da Turma",
    },
    PLACEHOLDERS: {
      TEACHER_EMAIL: "exemplo@escola.com",
    },
    BUTTONS: {
      LINK_AND_CONTINUE: "Vincular e continuar",
      LINKING: "Vinculando...",
      LINKED: "Vinculado!",
      SKIP: "Pular por enquanto",
    },
  },
  STEP_STUDENTS: {
    CAPTION: "Passo 3 de 3",
    TITLE: "Adicionar Alunos",
    SUBTITLE: "Cadastre os alunos que farão parte desta turma.",
    LABELS: {
      STUDENT_NAME: "Nome do aluno",
      STUDENT_CONTACT: "Contato do responsável",
    },
    PLACEHOLDERS: {
      STUDENT_NAME: "Ex: João Silva",
      STUDENT_CONTACT: "email@exemplo.com ou (11) 99999-9999",
    },
    TEXTS: {
      IMPORT_SECTION: "Importação em lote via CSV",
      UPLOAD_TITLE: "Clique ou arraste o arquivo aqui",
      UPLOAD_SUBTITLE: "Formatos aceitos: .csv, .xlsx",
      OR: "ou",
      STUDENT_NUMBER: "Aluno",
      REMOVE_BUTTON: "Remover",
      ADD_MORE: "+ Adicionar mais um aluno",
      BUTTON_FINISH: "Concluir cadastro",
    },
    ALERTS: {
      IMPORT_TITLE: "Importação",
      IMPORT_MESSAGE:
        "Aqui implementaremos o expo-document-picker para ler o CSV.",
    },
  },
  DONE_SCREEN: {
    EYEBROW: "Turma pronta",
    DESCRIPTION:
      "Os PINs de cada aluno já estão prontos para impressão ou envio aos responsáveis.",
    BUTTON: "Ir para o Dashboard",
  },
};

export const PASSWORD_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 6,
  PLACEHOLDERS: {
    SCHOOL_NAME: "Ex: Escola Caminho do Saber",
    LEGAL_NAME: "Ex: Associação Educacional Caminho",
    CNPJ: "00.000.000/0000-00",
    PHONE: "(11) 99999-9999",
    INEP_CODE: "Ex: 12345678",
    ZIP_CODE: "00000-000",
    STREET: "Ex: Rua das Acácias",
    NUMBER: "Ex: 123",
    COMPLEMENT: "Ex: Bloco A, Sala 5",
    NEIGHBORHOOD: "Ex: Centro",
    CITY: "Ex: São Paulo",
    STATE: "Ex: SP",
    EMAIL: "seu@email.com",
    PASSWORD: "••••••••",
    CREATE_PASSWORD: "Mínimo 6 caracteres",
    CONFIRM_PASSWORD: "Digite a senha novamente",
  },
  LABELS: {
    SCHOOL_NAME: "Nome fantasia",
    LEGAL_NAME: "Razão social",
    CNPJ: "CNPJ",
    PHONE: "Telefone de contato",
    INEP_CODE: "Código INEP",
    ZIP_CODE: "CEP",
    STREET: "Rua",
    NUMBER: "Número",
    COMPLEMENT: "Complemento",
    NEIGHBORHOOD: "Bairro",
    CITY: "Cidade",
    STATE: "Estado",
    EMAIL: "E-mail",
    RESPONSIBLE_EMAIL: "E-mail do responsável",
    PASSWORD: "Senha",
    CREATE_PASSWORD: "Crie uma senha",
    CONFIRM_PASSWORD: "Confirme a senha",
  },
  ERRORS: {
    PASSWORD_MISMATCH: "As senhas não coincidem",
    PASSWORD_TOO_SHORT: "A senha precisa ter pelo menos 6 caracteres",
  },
  TEXTS: {
    LOGIN_TITLE: "Entrar como Educador",
    LOGIN_SUBTITLE: "Use o e-mail e senha da sua conta de Professor ou Escola.",
    ACTIVATION_TITLE: "Ative sua conta de professor",
    ACTIVATION_SUBTITLE: "Defina seus dados de acesso para entrar no Portal do Professor.",
    SIGNUP_TITLE: "Cadastre sua Escola",
    SIGNUP_SUBTITLE:
      "Vamos criar o espaço da sua instituição para gerenciar turmas, professores e alunos.",
    RECOVERY_TITLE: "Recuperar senha",
    RECOVERY_SUBTITLE:
      "Informe seu e-mail para receber as instruções de recuperação.",
    RECOVERY_HELPER:
      "Enviaremos um link para redefinir sua senha. Verifique também a caixa de spam ou lixo eletrônico.",
    WELCOME_TITLE: "Bem-vindo de volta! Sua turma já está te esperando.",
    SENT_TITLE: "Verifique sua caixa de entrada",
    SENT_DESCRIPTION:
      "Enviamos um link de recuperação para o e-mail informado.",
    SENT_NOTICE_TITLE: "Aviso importante",
    SENT_NOTICE_TEXT:
      "O link pode levar alguns minutos para chegar. Se não encontrar, confira também o spam ou lixo eletrônico.",
    BUTTON_ENTER: "Entrar",
    BUTTON_CONTINUE: "Continuar cadastro",
    BUTTON_SEND_LINK: "Enviar link",
    ACTIVATION_BUTTON: "Ativar conta e acessar",
  },
};
