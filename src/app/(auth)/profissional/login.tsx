// src/app/(auth)/profissional/login.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { GraduationCap } from 'lucide-react-native';

import { theme, fonts } from '@/constants/theme';
import { ScreenShell } from '@/components/ScreenShell';
import { AuthHeader } from '@/components/AuthHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function ProfessionalLoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const canSubmit = email.trim().includes('@') && password.length >= 6;

    const handleLogin = () => {
        if (canSubmit) {
            console.log('Login Profissional:', email, password);
            // Redirecionar para a Dashboard interna futuramente:
            // router.replace('/(main)/dashboard');
        }
    };

    return (
        <ScreenShell
            onBack={() => router.back()}
            bannerVariant="trees"
            footer={
                <PrimaryButton disabled={!canSubmit} onPress={handleLogin}>
                    Entrar no Painel
                </PrimaryButton>
            }
        >
            <AuthHeader
                Icon={GraduationCap}
                title="Acesso do Educador"
                subtitle="Gerencie suas turmas, relatórios e configure atividades adaptadas."
                align="left"
                animate
            />

            <View style={styles.formGroup}>
                <FormField
                    label="E-mail profissional"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="exemplo@escola.com"
                    keyboardType="email-address"
                    preset="educator"
                />

                <FormField
                    label="Senha de acesso"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Mínimo 6 caracteres"
                    secureTextEntry
                    preset="educator"
                />

                <TouchableOpacity
                    onPress={() => router.push('/(auth)/profissional/recuperar')}
                    activeOpacity={0.7}
                    style={styles.forgotContainer}
                >
                    <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
            </View>
        </ScreenShell>
    );
}

const styles = StyleSheet.create({
    formGroup: {
        gap: 20,
    },
    forgotContainer: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
    forgotText: {
        fontFamily: fonts.bodyBold,
        fontSize: 14,
        color: theme.primary,
    },
});