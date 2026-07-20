export const AUTH_ROUTES = {
    CAROUSEL: '/',
    ROLES: '/roles',
    SCHOOL_SIGNUP: '/escola/cadastro',
    WIZARD: '/wizard',

    STUDENT: {
        LOGIN: '/aluno/login',
        NAME: '/aluno/nome',
        WELCOME_DONE: '/aluno/concluido',
    },

    EDUCATOR: {
        LOGIN: '/(auth)/professor/login',
        WELCOME: '/(auth)/professor/bem-vindo',
        FORGOT_PASSWORD: '/(auth)/professor/recuperar-senha',
        PASSWORD_SENT: '/(auth)/professor/senha-enviada',
    },
} as const;