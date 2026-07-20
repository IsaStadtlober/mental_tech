import { useIsFocused, useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackgroundScene } from '../components/background/BackgroundScene';
import { Dots } from '../components/carousel/Dots';
import { SlideContent } from '../components/carousel/SlideContent';
import { PrimaryButton } from '../components/PrimaryButton';

import { AUTH_ROUTES } from '@/router';
import { CAROUSEL_CONFIG, SLIDES } from '../constants/carousel';
import { theme } from '../constants/theme';
import { styles } from '../styles';

export default function CarouselRoute() {
  const router = useRouter();
  const isFocused = useIsFocused();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const translateX = useSharedValue(0);
  const hasInteracted = useSharedValue(false);

  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  const handleFinish = useCallback(() => {
    router.push(AUTH_ROUTES.ROLES as any);
  }, [router]);

  useEffect(() => {
    const runHintUI = () => {
      'worklet';
      translateX.value = withSequence(
        withTiming(-10, { duration: 520, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 640, easing: Easing.out(Easing.cubic) })
      );
    };

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < CAROUSEL_CONFIG.HINT_REPEATS; i++) {
      const t = setTimeout(() => {
        runOnUI(() => {
          'worklet';
          if (!hasInteracted.value) {
            runHintUI();
          }
        })();
      }, CAROUSEL_CONFIG.FIRST_DELAY + i * CAROUSEL_CONFIG.HINT_INTERVAL);

      timeouts.push(t);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [translateX, hasInteracted]);

  const goTo = useCallback((newIndex: number, dir: 'next' | 'prev') => {
    setDirection(dir);
    setIndex(newIndex);
  }, []);

  const next = useCallback(() => {
    if (isLast) {
      handleFinish();
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
      const resisted = e.translationX * CAROUSEL_CONFIG.DRAG_RESISTANCE;
      translateX.value = Math.max(
        -CAROUSEL_CONFIG.MAX_DRAG,
        Math.min(CAROUSEL_CONFIG.MAX_DRAG, resisted)
      );
    })
    .onEnd((e) => {
      const shouldGoNext = e.translationX < -CAROUSEL_CONFIG.SWIPE_THRESHOLD;
      const shouldGoPrev = e.translationX > CAROUSEL_CONFIG.SWIPE_THRESHOLD && index > 0;

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
        duration: 280,
        easing: Easing.out(Easing.cubic),
      });
    });

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const insets = useSafeAreaInsets();

  return (
    <GestureDetector gesture={panGesture}>
      <SafeAreaView style={[styles.carouselRoot, { paddingTop: insets.top, paddingBottom: insets.bottom }]}> 
        <BackgroundScene
          variant={slide.bg}
          tintColor={slide.accent[1]}
          isActive={isFocused}
        />

        <View style={styles.carouselTopRow}>
          <TouchableOpacity onPress={handleFinish} hitSlop={10}>
            <Text style={styles.skipText}>Pular</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.carouselBody, dragStyle]}>
          <SlideContent key={index} slide={slide} direction={direction} />
        </Animated.View>

        <View style={styles.carouselFooter}>
          <Dots count={SLIDES.length} active={index} accentColor={slide.accent[0]} />

          {isLast ? (
            <PrimaryButton onPress={next} icon={false}>
              <View style={styles.ctaRow}>
                <Text style={styles.primaryBtnText}>Começar jornada</Text>
                <ChevronRight size={18} color={theme.white} />
              </View>
            </PrimaryButton>
          ) : (
            <View style={styles.ctaSpacer} />
          )}
        </View>
      </SafeAreaView>
    </GestureDetector>
  );
}