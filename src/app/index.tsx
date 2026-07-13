import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


import { useIsFocused, useRouter } from 'expo-router';

import Animated, {
  Easing,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { theme } from '../constants/theme'; // ⬅️ Caminho atualizado conforme sugerido pela IA
import {
  EASE_POP,
  EASE_STANDARD,
  useLoopValue,
} from '../hooks/useAnimations';
import { styles } from '../styles/styles';

import { BackgroundScene } from '../components/BackgroundScene';
import { PrimaryButton } from '../components/PrimaryButton';

import {
  CompassPlay,
  GraduationCapPlay,
  SparklesPlay,
  TrophyPlay,
} from '../components/icons/CarouselIcons';

// --- TIPAGENS (TYPESCRIPT) ---
interface SlideData {
  Icon: any;
  eyebrow: string;
  title: string;
  text: string;
  bg: 'mixedHigh' | 'clouds' | 'trees' | 'mixed'; // ⬅️ Tipagem exata corrigida
  accent: readonly [string, string];
}

interface CarouselIconCardProps {
  children: React.ReactNode;
  accent: readonly [string, string];
}

interface DotProps {
  isActive: boolean;
  accentColor: string;
}

interface DotsProps {
  count: number;
  active: number;
  accentColor: string;
}

interface SlideContentProps {
  slide: SlideData;
  direction: 'next' | 'prev';
}
// ------------------------------

function CarouselIconCard({ children, accent }: CarouselIconCardProps) {
  const pop = useSharedValue(0);

  useEffect(() => {
    pop.value = withDelay(
      40,
      withTiming(1, {
        duration: 340,
        easing: EASE_POP,
      })
    );
  }, [pop]);

  const popStyle = useAnimatedStyle(() => ({
    opacity: pop.value,
    transform: [{ scale: pop.value }],
  }));

  const halo = useLoopValue(0, 1, 1800, 0);

  const haloStyle = useAnimatedStyle(() => ({
    opacity: 0.25 + 0.4 * halo.value,
  }));

  const spark1 = useLoopValue(0, 1, 1200, 0);

  const spark1Style = useAnimatedStyle(() => ({
    opacity: 0.25 + 0.6 * spark1.value,
    transform: [{ scale: 0.8 + 0.3 * spark1.value }],
  }));

  const spark2 = useLoopValue(0, 1, 1200, 450);

  const spark2Style = useAnimatedStyle(() => ({
    opacity: 0.25 + 0.6 * spark2.value,
    transform: [{ scale: 0.8 + 0.3 * spark2.value }],
  }));

  return (
    <Animated.View style={[styles.iconCardWrap, popStyle]}>
      <LinearGradient
        colors={accent}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconCard}
      >
        <Animated.View style={[styles.iconCardHaloBorder, haloStyle]} />

        <Animated.View
          style={[
            styles.iconCardSparkle,
            {
              top: 18,
              right: 20,
              width: 8,
              height: 8,
              borderRadius: 4,
            },
            spark1Style,
          ]}
        />

        <Animated.View
          style={[
            styles.iconCardSparkle,
            {
              bottom: 20,
              left: 22,
              width: 6,
              height: 6,
              borderRadius: 3,
            },
            spark2Style,
          ]}
        />

        {children}
      </LinearGradient>
    </Animated.View>
  );
}

const SLIDES: SlideData[] = [
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
    text: 'Crie jornadas, acompanhe conquistas e transforme cada atividade em descoberta.',
    bg: 'mixedHigh',
    accent: ['#2F8F5A', '#14574A'],
  },
];

const SWIPE_THRESHOLD = 90;
const DRAG_RESISTANCE = 0.18;
const MAX_DRAG = 28;

function Dot({ isActive, accentColor }: DotProps) {
  const scaleX = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      scaleX.value = withSequence(
        withTiming(1.25, {
          duration: 150,
          easing: Easing.out(Easing.cubic),
        }),
        withTiming(1, {
          duration: 150,
          easing: Easing.out(Easing.cubic),
        })
      );
    }
  }, [isActive, scaleX]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(isActive ? 22 : 6, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }),
    backgroundColor: isActive ? accentColor : '#D9CFC3',
    transform: [{ scaleX: scaleX.value }],
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

function Dots({ count, active, accentColor }: DotsProps) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: count }).map((_, i) => (
        <Dot
          key={i}
          isActive={i === active}
          accentColor={accentColor}
        />
      ))}
    </View>
  );
}

function SlideContent({ slide, direction }: SlideContentProps) {
  const Icon = slide.Icon;

  const enter = useSharedValue(direction === 'next' ? 6 : -6);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.99);

  const t1 = useSharedValue(0);
  const t2 = useSharedValue(0);
  const t3 = useSharedValue(0);

  useEffect(() => {
    enter.value = direction === 'next' ? 6 : -6;
    opacity.value = 0;
    scale.value = 0.99;

    t1.value = 0;
    t2.value = 0;
    t3.value = 0;

    enter.value = withTiming(0, {
      duration: 360,
      easing: Easing.out(Easing.cubic),
    });

    opacity.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });

    scale.value = withTiming(1, {
      duration: 360,
      easing: Easing.out(Easing.cubic),
    });

    t1.value = withDelay(
      200,
      withTiming(1, {
        duration: 640,
        easing: EASE_STANDARD,
      })
    );

    t2.value = withDelay(
      360,
      withTiming(1, {
        duration: 700,
        easing: EASE_STANDARD,
      })
    );

    t3.value = withDelay(
      540,
      withTiming(1, {
        duration: 760,
        easing: EASE_STANDARD,
      })
    );
  }, [slide, direction, enter, opacity, scale, t1, t2, t3]);

  const animatedContainer = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: enter.value },
      { scale: scale.value },
    ],
  }));

  const eyebrowStyle = useAnimatedStyle(() => ({
    opacity: t1.value,
    transform: [{ translateY: 6 * (1 - t1.value) }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: t2.value,
    transform: [{ translateY: 6 * (1 - t2.value) }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: t3.value,
    transform: [{ translateY: 6 * (1 - t3.value) }],
  }));

  return (
    <Animated.View style={[styles.carouselContent, animatedContainer]}>
      <CarouselIconCard accent={slide.accent}>
        <Icon size={44} color={theme.bg} />
      </CarouselIconCard>

      <Animated.Text style={[styles.eyebrow, eyebrowStyle]}>
        {slide.eyebrow}
      </Animated.Text>

      <Animated.Text style={[styles.carouselTitle, titleStyle]}>
        {slide.title}
      </Animated.Text>

      <Animated.Text style={[styles.carouselText, textStyle]}>
        {slide.text}
      </Animated.Text>
    </Animated.View>
  );
}

// ⬅️ Alterado de "export function CarouselScreen" para "export default function CarouselRoute"
export default function CarouselRoute() {
  const router = useRouter(); // ⬅️ Inicialização do router
  const isFocused = useIsFocused();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const translateX = useSharedValue(0);
  const hasInteracted = useSharedValue(false);

  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  // ⬅️ Nova função handleFinish usando o router do Expo
  const handleFinish = useCallback(() => {
    router.push('/roles');
  }, [router]);

  useEffect(() => {
    const HINT_REPEATS = 3;
    const HINT_INTERVAL = 4200;
    const FIRST_DELAY = 1100;

    const runHintUI = () => {
      'worklet';
      translateX.value = withSequence(
        withTiming(-14, {
          duration: 420,
          easing: Easing.out(Easing.cubic),
        }),
        withTiming(0, {
          duration: 520,
          easing: Easing.out(Easing.cubic),
        })
      );
    };

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < HINT_REPEATS; i++) {
      const t = setTimeout(() => {
        runOnUI(() => {
          'worklet';
          if (!hasInteracted.value) {
            runHintUI();
          }
        })();
      }, FIRST_DELAY + i * HINT_INTERVAL);

      timeouts.push(t);
    }

    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback((newIndex: number, dir: 'next' | 'prev') => {
    setDirection(dir);
    setIndex(newIndex);
  }, []);

  const next = useCallback(() => {
    if (isLast) {
      handleFinish(); // ⬅️ Chama handleFinish em vez da propriedade onFinish
    } else {
      goTo(index + 1, 'next');
    }
  }, [isLast, index, goTo, handleFinish]);

  const prev = useCallback(() => {
    if (index > 0) {
      goTo(index - 1, 'prev');
    }
  }, [index, goTo]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      hasInteracted.value = true;
    })
    .onUpdate((e) => {
      const resisted = e.translationX * DRAG_RESISTANCE;

      translateX.value = Math.max(
        -MAX_DRAG,
        Math.min(MAX_DRAG, resisted)
      );
    })
    .onEnd((e) => {
      const shouldGoNext = e.translationX < -SWIPE_THRESHOLD;
      const shouldGoPrev = e.translationX > SWIPE_THRESHOLD && index > 0;

      if (shouldGoNext) {
        translateX.value = 0;
        runOnJS(next)();
        return;
      }

      if (shouldGoPrev) {
        translateX.value = 0;
        runOnJS(prev)();
        return;
      }

      translateX.value = withTiming(0, {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      });
    });

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.carouselRoot}>
        <BackgroundScene
          variant={slide.bg}
          tintColor={slide.accent[1]}
          isActive={isFocused}
        />

        <View style={styles.carouselTopRow}>
          {/* ⬅️ "onFinish" substituído por "handleFinish" */}
          <TouchableOpacity onPress={handleFinish} hitSlop={10}>
            <Text style={styles.skipText}>Pular</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.carouselBody, dragStyle]}>
          <SlideContent
            key={index}
            slide={slide}
            direction={direction}
          />
        </Animated.View>

        <View style={styles.carouselFooter}>
          <Dots
            count={SLIDES.length}
            active={index}
            accentColor={slide.accent[0]}
          />

          {isLast ? (
            <PrimaryButton onPress={next} icon={false}>
              <View style={styles.ctaRow}>
                <Text style={styles.primaryBtnText}>
                  Começar jornada
                </Text>

                <ChevronRight size={18} color="#fff" />
              </View>
            </PrimaryButton>
          ) : (
            <View style={{ height: 56 }} />
          )}
        </View>
      </View>
    </GestureDetector>
  );
}