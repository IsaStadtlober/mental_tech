// Constantes de autenticação de estudante
export const STUDENT_AUTH_CONSTANTS = {
    PIN_LENGTH: 4,
    MAX_PIN_LENGTH: 4,
    PLACEHOLDERS: {
        CLASS_CODE: 'EX: 12AB',
        PIN: '****',
        EXPLORER_NAME: 'Ex: Léo Aventureiro',
    },
    LABELS: {
        CLASS_CODE: 'Código da Turma',
        PIN: 'PIN (4 números)',
        EXPLORER_NAME: 'Dê um nome ao seu explorador',
    },
    TEXTS: {
        LOGIN_TITLE: 'Entrar na aventura',
        LOGIN_SUBTITLE: 'Peça o código e o PIN para sua professora.,',
        NAME_TITLE: 'Qual é o nome do seu explorador?',
        NAME_SUBTITLE: 'Esse será o nome do seu companheiro em toda a jornada.',
        DONE_EYEBROW: 'Tudo pronto',
        DONE_DESCRIPTION: 'Vamos rumo à sua primeira missão.',
        BUTTON_ENTER: 'Entrar',
        BUTTON_CONTINUE: 'Pronto! Vamos explorar!',
        BUTTON_ACCESS_ACCOUNT: 'Acessar minha conta',
    },
};

// Constantes de autenticação de educador
export const EDUCATOR_AUTH_CONSTANTS = {
    MIN_PASSWORD_LENGTH: 6,
    PLACEHOLDERS: {
        SCHOOL_NAME: 'Ex: Escola Caminho do Saber',
        EMAIL: 'seu@email.com',
        PASSWORD: '••••••••',
        CREATE_PASSWORD: 'Mínimo 6 caracteres',
        CONFIRM_PASSWORD: 'Digite a senha novamente',
    },
    LABELS: {
        SCHOOL_NAME: 'Nome da escola',
        EMAIL: 'E-mail',
        RESPONSIBLE_EMAIL: 'E-mail do responsável',
        PASSWORD: 'Senha',
        CREATE_PASSWORD: 'Crie uma senha',
        CONFIRM_PASSWORD: 'Confirme a senha',
    },
    ERRORS: {
        PASSWORD_MISMATCH: 'As senhas não coincidem',
        PASSWORD_TOO_SHORT: 'A senha precisa ter pelo menos 6 caracteres',
    },
    TEXTS: {
        LOGIN_TITLE: 'Entrar como Educador',
        LOGIN_SUBTITLE: 'Use o e-mail e senha da sua conta de Professor ou Escola.',
        SIGNUP_TITLE: 'Cadastre sua Escola',
        SIGNUP_SUBTITLE: 'Vamos criar o espaço da sua instituição para gerenciar turmas, professores e alunos.',
        RECOVERY_TITLE: 'Recuperar senha',
        RECOVERY_SUBTITLE: 'Informe seu e-mail para receber as instruções de recuperação.',
        RECOVERY_HELPER: 'Enviaremos um link para redefinir sua senha. Verifique também a caixa de spam ou lixo eletrônico.',
        WELCOME_TITLE: 'Bem-vindo de volta! Sua turma já está te esperando.',
        SENT_TITLE: 'Verifique sua caixa de entrada',
        SENT_DESCRIPTION: 'Enviamos um link de recuperação para o e-mail informado.',
        SENT_NOTICE_TITLE: 'Aviso importante',
        SENT_NOTICE_TEXT: 'O link pode levar alguns minutos para chegar. Se não encontrar, confira também o spam ou lixo eletrônico.',
        BUTTON_ENTER: 'Entrar',
        BUTTON_CONTINUE: 'Continuar cadastro',
        BUTTON_SEND_LINK: 'Enviar link',
    },
};