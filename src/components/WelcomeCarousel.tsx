// src/components/WelcomeCarousel.tsx
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import { theme, fonts } from '../constants/theme';
import {
    CompassPlay,
    TrophyPlay,
    GraduationCapPlay,
    SparklesPlay,
} from './AnimatedIcons';

// Definição dos dados estáticos de cada slide do carrossel
export interface CarouselSlideData {
    id: string;
    title: string;
    subtitle: string;
    badgeText: string;
    accent: string;
}

export const WELCOME_SLIDES: CarouselSlideData[] = [
    {
        id: 'c1',
        badgeText: 'MÓDULO INCLUSIVO',
        title: 'Estímulo Cognitivo Sob Medida',
        subtitle: 'Atividades lúdicas estruturadas para o desenvolvimento neurodivergente de forma acolhedora e natural.',
        accent: '#00685F',
    },
    {
        id: 'c2',
        badgeText: 'RECOMPENSAS DO BEM',
        title: 'Gamificação Positiva',
        subtitle: 'Reforço imediato através de dinâmicas visuais que celebram o esforço, impulsionando a autonomia do aluno.',
        accent: '#8F4E00',
    },
    {
        id: 'c3',
        badgeText: 'GESTÃO ESCOLAR',
        title: 'Acompanhamento Pedagógico',
        subtitle: 'Relatórios automáticos em tempo real que mapeiam a evolução do foco e a redução de sobrecarga sensorial.',
        accent: '#A10056',
    },
    {
        id: 'c4',
        badgeText: 'SUPORTE CLÍNICO',
        title: 'Ambientes Controlados',
        subtitle: 'Personalização completa de tempos de pausa e estímulos sonoros para mitigar crises de ansiedade na sala de aula.',
        accent: '#1D4ED8',
    },
];

// Mapeador dinâmico para injetar o ícone vetorial animado correto
function renderCarouselIcon(index: number, color: string) {
    switch (index) {
        case 0: return <CompassPlay color={color} size={44} />;
        case 1: return <TrophyPlay color={color} size={44} />;
        case 2: return <GraduationCapPlay color={color} size={44} />;
        case 3: return <SparklesPlay color={color} size={44} />;
        default: return <CompassPlay color={color} size={44} />;
    }
}

interface WelcomeCarouselProps {
    activeIndex: number;
    onIndexChange: (index: number) => void;
}

export function WelcomeCarousel({ activeIndex, onIndexChange }: WelcomeCarouselProps) {
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const slideWidth = SCREEN_WIDTH - 48; // Descontando os paddings laterais de 24

    // Valor partilhado do Reanimated para rastrear o deslocamento horizontal por toque
    const translateX = useSharedValue(0);
    const contextX = useSharedValue(0);

    // Configuração física do efeito de mola elástica (Spring Mechanics)
    const springConfig = {
        damping: 22,
        dampingRatio: 0.85,
        stiffness: 140,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
    };

    // Criação do recetor de gestos nativos de Pan (arrasto horizontal)
    const panGesture = Gesture.Pan()
        .onStart(() => {
            // Salva a posição acumulada atual do carrossel antes de iniciar o novo arrasto
            contextX.value = -activeIndex * slideWidth;
            translateX.value = contextX.value;
        })
        .onUpdate((event) => {
            // Atualiza a posição em tempo real aplicando uma resistência leve nas bordas externas
            const computedX = contextX.value + event.translationX;
            const minX = -(WELCOME_SLIDES.length - 1) * slideWidth;

            if (computedX > 0) {
                translateX.value = computedX * 0.3; // Efeito elástico no início
            } else if (computedX < minX) {
                translateX.value = minX + (computedX - minX) * 0.3; // Efeito elástico no fim
            } else {
                translateX.value = computedX;
            }
        })
        .onEnd((event) => {
            // Calcula o vetor de força e velocidade para decidir se muda de slide
            const dragDistance = event.translationX;
            const dragVelocity = event.velocityX;
            let targetIndex = activeIndex;

            if (Math.abs(dragDistance) > slideWidth * 0.25 || Math.abs(dragVelocity) > 600) {
                if (dragDistance < 0 && activeIndex < WELCOME_SLIDES.length - 1) {
                    targetIndex = activeIndex + 1;
                } else if (dragDistance > 0 && activeIndex > 0) {
                    targetIndex = activeIndex - 1;
                }
            }

            // Executa a transição física suave até o slide final determinado
            translateX.value = withSpring(-targetIndex * slideWidth, springConfig);

            // Comunica de volta à thread principal do React a alteração de índice de forma segura
            if (targetIndex !== activeIndex) {
                runOnJS(onIndexChange)(targetIndex);
            }
        });

    // Reação declarativa: Se o índice ativo mudar externamente (ex: clique no botão Continuar), move o carrossel
    React.useEffect(() => {
        translateX.value = withSpring(-activeIndex * slideWidth, springConfig);
    }, [activeIndex, slideWidth]);

    // Estilo animado do contentor que agrupa horizontalmente as cartas
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.carouselContainer}>
            {/* Detetor de Gestos que envolve toda a área interativa do painel */}
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.slidesTrack, { width: slideWidth * WELCOME_SLIDES.length }, containerAnimatedStyle]}>
                    {WELCOME_SLIDES.map((slide, i) => {
                        // Animação de escala e opacidade individual de cada card baseada na proximidade do scroll
                        const cardAnimatedStyle = useAnimatedStyle(() => {
                            const inputRange = [
                                (i - 1) * slideWidth * -1,
                                i * slideWidth * -1,
                                (i + 1) * slideWidth * -1,
                            ];
                            const scale = interpolate(translateX.value, inputRange, [0.93, 1, 0.93], Extrapolation.CLAMP);
                            const opacity = interpolate(translateX.value, inputRange, [0.4, 1, 0.4], Extrapolation.CLAMP);
                            return { transform: [{ scale }], opacity };
                        });

                        return (
                            <Animated.View
                                key={slide.id}
                                style={[styles.cardWrapper, { width: slideWidth }, cardAnimatedStyle]}
                            >
                                <View style={styles.carouselCard}>
                                    <View style={styles.cardHeaderRow}>
                                        <View style={[styles.iconBox, { backgroundColor: `${slide.accent}12` }]}>
                                            {renderCarouselIcon(i, slide.accent)}
                                        </View>
                                        <View style={[styles.badgeContainer, { backgroundColor: `${slide.accent}15` }]}>
                                            <Text style={[styles.badgeText, { color: slide.accent }]}>
                                                {slide.badgeText}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text style={styles.cardTitle}>{slide.title}</Text>
                                    <Text style={styles.cardSubtitle}>{slide.subtitle}</Text>
                                </View>
                            </Animated.View>
                        );
                    })}
                </Animated.View>
            </GestureDetector>

            {/* Indicadores de Paginação inferiores (Dots) com animação elástica */}
            <View style={styles.dotsRow}>
                {WELCOME_SLIDES.map((_, i) => {
                    const dotAnimatedStyle = useAnimatedStyle(() => {
                        const inputRange = [
                            (i - 1) * slideWidth * -1,
                            i * slideWidth * -1,
                            (i + 1) * slideWidth * -1,
                        ];
                        // O dot ativo expande horizontalmente seu tamanho (efeito pílula) e eleva a opacidade
                        const widthScale = interpolate(translateX.value, inputRange, [8, 22, 8], Extrapolation.CLAMP);
                        const opacity = interpolate(translateX.value, inputRange, [0.3, 1, 0.3], Extrapolation.CLAMP);
                        return {
                            width: widthScale,
                            opacity,
                            backgroundColor: activeIndex === i ? WELCOME_SLIDES[activeIndex].accent : theme.border,
                        };
                    });

                    return <Animated.View key={i} style={[styles.dotBase, dotAnimatedStyle]} />;
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    carouselContainer: {
        width: '100%',
        overflow: 'hidden',
        marginTop: 8,
        marginBottom: 4,
    },
    slidesTrack: {
        flexDirection: 'row',
    },
    cardWrapper: {
        paddingHorizontal: 4,
    },
    carouselCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1.5,
        borderColor: '#F0E5DC',
        shadowColor: 'rgba(23,63,55,1)',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.05,
        shadowRadius: 16,
        elevation: 3,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    iconBox: {
        width: 68,
        height: 68,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 99,
    },
    badgeText: {
        fontFamily: fonts.bodyBold,
        fontSize: 10,
        letterSpacing: 0.8,
    },
    cardTitle: {
        fontFamily: fonts.headlineBold,
        fontSize: 20,
        color: theme.textDark,
        marginBottom: 10,
        lineHeight: 26,
    },
    cardSubtitle: {
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
        color: theme.textMuted,
        lineHeight: 21,
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginTop: 24,
        height: 10,
    },
    dotBase: {
        height: 8,
        borderRadius: 4,
    },
});