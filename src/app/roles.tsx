import { useRouter } from 'expo-router'; // ⬅️ Hook do Expo Router
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronRight,
  Compass,
} from 'lucide-react-native';

import {
  EASE_POP,
  EASE_STANDARD,
} from '../animations/animations';
import { theme } from '../constants/theme'; // ⬅️ Mantido o caminho sugerido
import { styles } from '../styles/styles';

import { BackgroundScene } from '../components/BackgroundScene';

import {
  CompassPlay,
  GraduationCapPlay,
} from '../icons/CarouselIcons';

// --- TIPAGENS (TYPESCRIPT) ---
interface RoleMiniIconProps {
  type: 'student' | 'educator';
  active: boolean;
}

interface RoleChoiceCardProps {
  type: 'student' | 'educator';
  active: boolean;
  title: string;
  description: string;
  onPress: () => void;
  delay?: number;
}

interface OptionButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}
// ------------------------------

function RoleMiniIcon({ type, active }: RoleMiniIconProps) {
  const color = active ? theme.bg : theme.primary;

  if (type === 'student') {
    return <CompassPlay size={26} color={color} />;
  }

  return <GraduationCapPlay size={26} color={color} />;
}

function RoleChoiceCard({
  type,
  active,
  title,
  description,
  onPress,
  delay = 0,
}: RoleChoiceCardProps) {
  const fade = useSharedValue(0);

  useEffect(() => {
    fade.value = withDelay(
      delay,
      withTiming(1, {
        duration: 450,
        easing: EASE_STANDARD,
      })
    );
  }, [delay, fade]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: 10 * (1 - fade.value) }],
  }));

  return (
    <Animated.View style={fadeStyle}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={[
          styles.roleCard,
          {
            backgroundColor: active ? theme.primary : theme.card,
            ...(active
              ? {
                  shadowColor: 'rgba(30,107,92,1)',
                  shadowOffset: { width: 0, height: 16 },
                  shadowOpacity: 0.24,
                  shadowRadius: 18,
                  elevation: 8,
                }
              : theme.shadowCard),
          },
        ]}
      >
        <View
          style={[
            styles.roleCardGlow,
            {
              backgroundColor: active
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(47,143,118,0.06)',
            },
          ]}
        />

        <View
          style={[
            styles.roleSparkle,
            {
              backgroundColor: active ? theme.bg : theme.primaryLight,
            },
          ]}
        />

        <View style={styles.roleCardContent}>
          <View
            style={[
              styles.roleIconBox,
              {
                backgroundColor: active ? theme.primaryFaint : theme.bgSoft,
              },
            ]}
          >
            <RoleMiniIcon type={type} active={active} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.roleTitle,
                {
                  color: active ? '#FFFFFF' : theme.textDark,
                },
              ]}
            >
              {title}
            </Text>

            <Text
              style={[
                styles.roleDescription,
                {
                  color: active ? '#D9EAE5' : '#6B7A75',
                },
              ]}
            >
              {description}
            </Text>
          </View>

          <View
            style={[
              styles.roleArrow,
              {
                backgroundColor: active ? theme.primaryFaint : theme.bgSoft,
              },
            ]}
          >
            <ChevronRight
              size={17}
              color={active ? theme.bg : theme.primary}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ⬅️ Mantive seu OptionButton original intacto para não perder o visual
function OptionButton({ children, onPress }: OptionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.optionButton}
      activeOpacity={0.75}
    >
      <Text style={styles.optionText}>{children}</Text>
      <Text style={styles.optionArrow}>→</Text>
    </TouchableOpacity>
  );
}

// ⬅️ Removidas as props onBack, onStudent, etc., pois agora usamos o router
export default function RolesRoute() {
  const router = useRouter(); // ⬅️ Inicialização do Expo Router

  // ⬅️ Tipagem do estado de escolha
  const [chosen, setChosen] = useState<'aluno' | 'educador' | null>(null);

  const pop = useSharedValue(0);
  const educatorProgress = useSharedValue(0);

  useEffect(() => {
    pop.value = withTiming(1, {
      duration: 300,
      easing: EASE_POP,
    });
  }, [pop]);

  useEffect(() => {
    if (chosen === 'educador') {
      educatorProgress.value = withTiming(1, {
        duration: 300,
      });
    }
  }, [chosen, educatorProgress]);

  const popStyle = useAnimatedStyle(() => ({
    opacity: pop.value,
    transform: [{ scale: pop.value }],
  }));

  const educatorStyle = useAnimatedStyle(() => ({
    opacity: educatorProgress.value,
  }));

  // ⬅️ Handlers de navegação centralizados
  const handleStudent = () => {
    router.push('/aluno/login');
  };

  const handleEducatorLogin = () => {
    router.replace('/professor/login');
  };

  const handleSchoolSignup = () => {
    router.push('/escola/cadastro');
  };

  return (
    <View style={styles.roleRoot}>
      {/* ⬅️ O TypeScript não vai reclamar do "mixed" porque arrumamos isso na etapa anterior */}
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

            <View style={[styles.heroDot, { top: 16, right: 17 }]} />
            <View style={[styles.heroDotSmall, { bottom: 17, left: 18 }]} />
          </LinearGradient>
        </Animated.View>

        <Text style={styles.roleEyebrow}>Escolha seu caminho</Text>

        <Text style={styles.roleHeading}>Como você vai explorar?</Text>

        <Text style={styles.roleSubheading}>
          Comece como aluno aventureiro ou entre para guiar sua turma.
        </Text>

        <View style={styles.roleCards}>
          <RoleChoiceCard
            type="student"
            active={chosen === 'aluno'}
            title="Sou Explorador"
            description="Tenho código da turma e PIN"
            delay={320}
            onPress={() => {
              setChosen('aluno');
              setTimeout(handleStudent, 180); // ⬅️ Agora chama o handler interno
            }}
          />

          <RoleChoiceCard
            type="educator"
            active={chosen === 'educador'}
            title="Sou Educador"
            description="Vou acessar ou cadastrar uma escola"
            delay={420}
            onPress={() => setChosen('educador')}
          />
        </View>

        {chosen === 'educador' && (
          <Animated.View style={[styles.educatorOptions, educatorStyle]}>
            {/* ⬅️ Componentes OptionButton originais restaurados com as novas funções */}
            <OptionButton onPress={handleEducatorLogin}>
              Entrar com convite
            </OptionButton>

            <View style={styles.optionDivider} />

            <OptionButton onPress={handleSchoolSignup}>
              Quero cadastrar minha escola
            </OptionButton>
          </Animated.View>
        )}

        {/* ⬅️ Botão de voltar agora usa o router.back() */}
        <TouchableOpacity onPress={() => router.back()} style={styles.roleBack}>
          <Text style={styles.roleBackText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}