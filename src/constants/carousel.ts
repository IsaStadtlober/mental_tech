import {
    CompassPlay,
    GraduationCapPlay,
    SparklesPlay,
    TrophyPlay,
} from '../components/carousel/CarouselIcons';
import { SlideData } from '../types/carousel';

export const CAROUSEL_CONFIG = {
    SWIPE_THRESHOLD: 90,
    DRAG_RESISTANCE: 0.18,
    MAX_DRAG: 28,
    HINT_REPEATS: 3,
    HINT_INTERVAL: 4200,
    FIRST_DELAY: 1100,
} as const;

export const SLIDES: SlideData[] = [
    {
        Icon: CompassPlay,
        eyebrow: 'Bem-vindo à jornada',
        title: 'Aprender virou uma aventura',
        text: 'Cada aluno entra como explorador, cumpre missões e vê seu progresso ganhar vida.',
        bg: 'mixedHigh',
        accent: ['#2F8F76', '#1E6B5C'],
    },
    {
        Icon: TrophyPlay,
        eyebrow: 'Engajamento todos os dias',
        title: 'Missões que dão vontade de continuar',
        text: 'Atividades viram conquistas, moedas e itens para personalizar a jornada.',
        bg: 'clouds',
        accent: ['#3D9B72', '#1B7A5C'],
    },
    {
        Icon: GraduationCapPlay,
        eyebrow: 'Clareza para ensinar melhor',
        title: 'Acompanhe cada aluno de perto',
        text: 'Veja quem participou, quem precisa de apoio e como a turma está evoluindo.',
        bg: 'trees',
        accent: ['#589B8B', '#1E6B5C'],
    },
    {
        Icon: SparklesPlay,
        eyebrow: 'Pronto para começar?',
        title: 'Uma turma mais motivada começa aqui',
        text: 'Crie jornadas, acompanhe conquistas e transformem cada atividade em descoberta.',
        bg: 'mixedHigh',
        accent: ['#2F8F5A', '#14574A'],
    },
];