// src/app/index.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronRight, Compass } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { CompassPlay, GraduationCapPlay } from '@/components/AnimatedIcons';
import { BackgroundScene } from '@/components/BackgroundScene';
import { fonts, theme } from '@/constants/theme';
import { EASE_POP, EASE_STANDARD } from '@/hooks/useAnimations';

// --- Subcomponentes Locais (RoleChoiceCard e OptionButton) ---
function RoleMiniIcon({ type, active }: { type: 'student' | 'educator'; active: boolean }) {
    const color = active ? theme.bg : theme.primary;
    if (type === 'student') return <CompassPlay size={26} color={color} />;
    return <GraduationCapPlay size={26} color={color} />;
}

function RoleChoiceCard({ type, active, title, description, onPress, delay = 0 }: any) {
    const fade = useSharedValue(0);
    useEffect(() => {
        fade.value = withDelay(delay, withTiming(1, { duration: 450, easing: EASE_STANDARD }));
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
                    { backgroundColor: active ? theme.primary : theme.card },
                    active ? styles.roleCardActiveShadow : theme.shadowCard,
                ]}
            >
                <View style={[styles.roleCardGlow, { backgroundColor: active ? 'rgba(255,255,255,0.08)' : 'rgba(47,143,118,0.06)' }]} />
                <View style={styles.roleCardContent}>
                    <View style={[styles.roleIconBox, { backgroundColor: active ? theme.primaryFaint : theme.bgSoft }]}>
                        <RoleMiniIcon type={type} active={active} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.roleTitle, { color: active ? '#FFFFFF' : theme.textDark }]}>{title}</Text>
                        <Text style={[styles.roleDescription, { color: active ? '#D9EAE5' : '#6B7A75' }]}>{description}</Text>
                    </View>
                    <View style={[styles.roleArrow, { backgroundColor: active ? theme.primaryFaint : theme.bgSoft }]}>
                        <ChevronRight size={17} color={active ? theme.bg : theme.primary} />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

function OptionButton({ children, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.optionButton} activeOpacity={0.75}>
            <Text style={styles.optionText}>{children}</Text>
            <Text style={styles.optionArrow}>→</Text>
        </TouchableOpacity>
    );
}

// --- Ecrã Principal ---
export default function IndexScreen() {
    const router = useRouter();
    const [chosen, setChosen] = useState<'aluno' | 'educador' | null>(null);

    const pop = useSharedValue(0);
    const educatorProgress = useSharedValue(0);

    useEffect(() => {
        pop.value = withTiming(1, { duration: 300, easing: EASE_POP });
    }, [pop]);

    useEffect(() => {
        if (chosen === 'educador') {
            educatorProgress.value = withTiming(1, { duration: 300 });
        }
    }, [chosen, educatorProgress]);

    const popStyle = useAnimatedStyle(() => ({
        opacity: pop.value,
        transform: [{ scale: pop.value }],
    }));

    const educatorStyle = useAnimatedStyle(() => ({
        opacity: educatorProgress.value,
    }));

    return (
        <View style={styles.roleRoot}>
            <BackgroundScene variant="mixed" />

            <View style={styles.roleInner}>
                <Animated.View style={[styles.roleHeroIconWrap, popStyle]}>
                    <LinearGradient colors={theme.gradPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.roleHeroIcon}>
                        <Compass size={31} color={theme.bg} strokeWidth={1.8} />
                    </LinearGradient>
                </Animated.View>

                <Text style={styles.roleEyebrow}>Escolha seu caminho</Text>
                <Text style={styles.roleHeading}>Como você vai explorar?</Text>
                <Text style={styles.roleSubheading}>Comece como aluno aventureiro ou entre para guiar sua turma.</Text>

                <View style={styles.roleCards}>
                    <RoleChoiceCard
                        type="student"
                        active={chosen === 'aluno'}
                        title="Sou Explorador"
                        description="Tenho código da turma e PIN"
                        delay={320}
                        onPress={() => {
                            setChosen('aluno');
                            setTimeout(() => router.push('/(auth)/aluno/login'), 180);
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
                        <OptionButton onPress={() => router.push('/(auth)/profissional/login')}>Entrar com convite</OptionButton>
                        <View style={styles.optionDivider} />
                        <OptionButton onPress={() => router.push('/(auth)/profissional/cadastro_escola')}>Quero cadastrar minha escola</OptionButton>
                    </Animated.View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // Adicione aqui os estilos extraídos do App.js para a RoleScreen
    roleRoot: { flex: 1, backgroundColor: theme.bg, justifyContent: 'center', paddingHorizontal: 32 },
    roleInner: { zIndex: 2 },
    roleHeroIconWrap: { width: 76, height: 76, borderRadius: 24, alignSelf: 'center', marginBottom: 24, shadowColor: 'rgba(30,107,92,1)', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.35, shadowRadius: 18, elevation: 10 },
    roleHeroIcon: { flex: 1, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
    roleEyebrow: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: theme.primaryLight, textAlign: 'center', marginBottom: 12 },
    roleHeading: { fontFamily: fonts.headlineBold, fontSize: 24, lineHeight: 30, color: theme.textDark, textAlign: 'center', marginBottom: 8 },
    roleSubheading: { fontFamily: fonts.bodyRegular, fontSize: 15, lineHeight: 22, color: theme.textMuted, textAlign: 'center', marginBottom: 40 },
    roleCards: { gap: 16 },
    roleCard: { position: 'relative', overflow: 'hidden', borderRadius: 24, padding: 16 },
    roleCardActiveShadow: { shadowColor: 'rgba(30,107,92,1)', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.24, shadowRadius: 18, elevation: 8 },
    roleCardGlow: { position: 'absolute', top: -20, right: -20, width: 130, height: 130, borderRadius: 80 },
    roleCardContent: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    roleIconBox: { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    roleTitle: { fontFamily: fonts.headlineBold, fontSize: 16, marginBottom: 2 },
    roleDescription: { fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 18 },
    roleArrow: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
    educatorOptions: { marginTop: 16, borderRadius: 18, backgroundColor: theme.card, overflow: 'hidden', ...theme.shadowCard },
    optionButton: { paddingHorizontal: 24, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    optionText: { fontFamily: fonts.bodyBold, fontSize: 15, color: theme.textDark },
    optionArrow: { fontSize: 18, color: theme.textFaint },
    optionDivider: { height: 1, marginHorizontal: 24, backgroundColor: theme.border },
});