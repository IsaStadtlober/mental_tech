import { ALUNO_ROUTES } from '../../router/aluno.routes';

export type StudentRoute =
    (typeof ALUNO_ROUTES)[keyof typeof ALUNO_ROUTES];