// src/app/(auth)/profissional/recuperar.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles, CheckCircle2 } from 'lucide-react-native';

import { theme, fonts } from '@/constants/theme';
import { ScreenShell } from '@/components/ScreenShell';
import { AuthHeader } from '@/components/AuthHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function RecoverPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handleRecover = () => {
        if (email.trim().includes('@')) {
            setIsSent(true);
        }
    };

    if (isSent) {
        return (
            <ScreenShell
                onBack={() => router.back()}
                bannerVariant="clouds"
                footer={
                    <PrimaryButton icon={false} onPress={() => router.replace('/(auth)/profissional/login')}>
                        Voltar para o Login
                    </PrimaryButton>
                }
            >
                <AuthHeader
                    Icon={CheckCircle2}
                    title="E-mail Enviado!"
                    subtitle={`Verifique a caixa de entrada de ${email} para redefinir sua credencial.`}
                    align="center"
                    animate
                />
                <View style={styles.successWrapper}>
                    <Text style={styles.successNotice}>
                        Não recebeu? Verifique a pasta de spam ou aguarde alguns minutos antes de tentar novamente.
                    </Text>
                </View>
            </ScreenShell>
        );
    }

    return (
        <ScreenShell
            onBack={() => router.back()}
            bannerVariant="mixed"
            footer={
                <PrimaryButton disabled={!email.trim().includes('@')} onPress={handleRecover}>
                    Instruções de Recuperação
                </PrimaryButton>
            }
        >
            <AuthHeader
                Icon={Sparkles}
                title="Recuperar Acesso"
                subtitle="Insira o e-mail cadastrado na sua conta institucional para receber as instruções."
                align="left"
                animate
            />

            <View style={{ marginTop: 8 }}>
                <FormField
                    label="E-mail cadastrado"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="seu-email@escola.com"
                    keyboardType="email-address"
                    preset="educator"
                />
            </View>
        </ScreenShell>
    );
}

const styles = StyleSheet.create({
    successWrapper: {
        padding: 16,
        backgroundColor: 'rgba(47,143,118,0.06)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(47,143,118,0.15)',
        marginTop: 12,
    },
    successNotice: {
        fontFamily: fonts.bodyRegular,
        fontSize: 14,
        color: theme.textMuted,
        textAlign: 'center',
        lineHeight: 20,
    },
});