// src/app/(auth)/aluno/login.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Compass } from 'lucide-react-native';

import { ScreenShell } from '@/components/ScreenShell';
import { AuthHeader } from '@/components/AuthHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function StudentLoginScreen() {
    const router = useRouter();
    const [classCode, setClassCode] = useState('');
    const [pin, setPin] = useState('');

    const canEnter = classCode.trim().length > 0 && pin.length === 4;

    const handleEnter = () => {
        if (canEnter) {
            // Navegaria para o ecrã do nome (ex: router.push('/(auth)/aluno/nome'))
            console.log('Login Aluno: ', classCode, pin);
        }
    };

    return (
        <ScreenShell
            onBack={() => router.back()}
            footer={
                <PrimaryButton disabled={!canEnter} onPress={handleEnter}>
                    Entrar
                </PrimaryButton>
            }
        >
            <AuthHeader
                Icon={Compass}
                title="Entrar na aventura"
                subtitle="Peça o código e o PIN para sua professora."
                align="center"
                animate
            />

            <View style={{ gap: 16 }}>
                <FormField
                    label="Código da Turma"
                    value={classCode}
                    onChangeText={(value) => setClassCode(value.toUpperCase())}
                    placeholder="EX: 12AB"
                    preset="student"
                    center
                />

                <FormField
                    label="PIN (4 números)"
                    value={pin}
                    onChangeText={(value) => setPin(value.replace(/[^0-9]/g, '').slice(0, 4))}
                    placeholder="• • • •"
                    keyboardType="numeric"
                    maxLength={4}
                    preset="student"
                    center
                />
            </View>
        </ScreenShell>
    );
}