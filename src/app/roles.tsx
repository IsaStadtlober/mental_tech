import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Compass } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ROLES_CONSTANTS } from '../constants/roles';
import { theme } from '../constants/theme';
import { styles } from '../styles';
import { ChosenRole } from '../types/components';

import { BackgroundScene } from '../components/background/BackgroundScene';
import { OptionButton } from '../components/roles/OptionButton';
import { RoleChoiceCard } from '../components/roles/RoleChoiceCard';

export default function RolesRoute() {
  const router = useRouter();

  const [chosen, setChosen] = useState<ChosenRole>(null);

  const pop = useSharedValue(0);
  const educatorProgress = useSharedValue(0);

  useEffect(() => {
    pop.value = withDelay(
      60,
      withTiming(1, {
        duration: 620,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [pop]);

  useEffect(() => {
    if (chosen === 'educador') {
      educatorProgress.value = withTiming(1, {
        duration: ROLES_CONSTANTS.ANIMATIONS.EDUCATOR_FADE_DURATION,
      });
    }
  }, [chosen, educatorProgress]);

  const popStyle = useAnimatedStyle(() => ({
    opacity: pop.value,
  }));

  const educatorStyle = useAnimatedStyle(() => ({
    opacity: educatorProgress.value,
  }));

  const handleStudent = () => router.push('/aluno/login');
  const handleEducatorLogin = () => router.push('/(auth)/professor/login');
  const handleSchoolSignup = () => router.push('/escola/cadastro');

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.roleRoot, { paddingTop: insets.top, paddingBottom: insets.bottom }]}> 
      <BackgroundScene variant="mixed" />

      <View style={styles.roleInner}>
        <Animated.View style={[styles.roleHeroIconWrap, popStyle]}>
          <LinearGradient
            colors={theme.gradPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.roleHeroIcon}
          >
            <Compass size={31} color={theme.bg} strokeWidth={1.8} />

            <View style={[styles.heroDot, styles.heroDotTopRight]} />
            <View style={[styles.heroDotSmall, styles.heroDotSmallBottomLeft]} />
          </LinearGradient>
        </Animated.View>

        <Text style={styles.roleEyebrow}>{ROLES_CONSTANTS.TEXTS.EYEBROW}</Text>
        <Text style={styles.roleHeading}>{ROLES_CONSTANTS.TEXTS.HEADING}</Text>
        <Text style={styles.roleSubheading}>{ROLES_CONSTANTS.TEXTS.SUBHEADING}</Text>

        <View style={styles.roleCards}>
          <RoleChoiceCard
            type="student"
            active={chosen === 'aluno'}
            title={ROLES_CONSTANTS.TEXTS.STUDENT_TITLE}
            description={ROLES_CONSTANTS.TEXTS.STUDENT_DESC}
            delay={ROLES_CONSTANTS.ANIMATIONS.CARD_STUDENT_DELAY}
            onPress={() => {
              setChosen('aluno');
              setTimeout(handleStudent, ROLES_CONSTANTS.DELAYS.STUDENT_NAVIGATION);
            }}
          />

          <RoleChoiceCard
            type="educator"
            active={chosen === 'educador'}
            title={ROLES_CONSTANTS.TEXTS.EDUCATOR_TITLE}
            description={ROLES_CONSTANTS.TEXTS.EDUCATOR_DESC}
            delay={ROLES_CONSTANTS.ANIMATIONS.CARD_EDUCATOR_DELAY}
            onPress={() => setChosen('educador')}
          />
        </View>

        {chosen === 'educador' && (
          <Animated.View style={[styles.educatorOptions, educatorStyle]}>
            <OptionButton onPress={handleEducatorLogin}>
              {ROLES_CONSTANTS.TEXTS.BTN_LOGIN_INVITE}
            </OptionButton>

            <View style={styles.optionDivider} />

            <OptionButton onPress={handleSchoolSignup}>
              {ROLES_CONSTANTS.TEXTS.BTN_REGISTER_SCHOOL}
            </OptionButton>
          </Animated.View>
        )}

        <TouchableOpacity onPress={() => router.back()} style={styles.roleBack}>
          <Text style={styles.roleBackText}>{ROLES_CONSTANTS.TEXTS.BTN_BACK}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}