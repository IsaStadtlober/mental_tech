// src/app/(auth)/profissional/cadastro-escola.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';

import { ScreenShell } from '@/components/ScreenShell';
import { AuthHeader } from '@/components/AuthHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function RegisterSchoolScreen() {
    const router = useRouter();
    const [schoolName, setSchoolName] = useState('');
    const [educatorName, setEducatorName] = useState('');
    const [schoolCode, setSchoolCode] = useState('');

    const isValid =
        schoolName.trim().length >= 3 &&
        educatorName.trim().length >= 3 &&
        schoolCode.trim().length >= 4;

    const handleRegisterSchool = () => {
        if (isValid) {
            console.log('Registo Institucional:', { schoolName, educatorName, schoolCode });
            // Prosseguiria para o Wizard de criação de turmas e importação de CSV/Alunos
            // router.push('/(auth)/profissional/criar-turma');
        }
    };

    return (
        <ScreenShell
            onBack={() => router.back()}
            bannerVariant="mixedHigh"
            footer={
                <PrimaryButton disabled={!isValid} onPress={handleRegisterSchool}>
                    Criar Instituição
                </PrimaryButton>
            }
        >
            <AuthHeader
                Icon={Sparkles}
                title="Cadastrar Escola"
                subtitle="Crie o ambiente digital centralizado para mapear as jornadas da sua turma."
                align="left"
                animate
            />

            <View style={styles.formContainer}>
                <FormField
                    label="Nome da Escola / Instituição"
                    value={schoolName}
                    onChangeText={setSchoolName}
                    placeholder="Ex: Colégio Primário Horizonte"
                    preset="educator"
                />

                <FormField
                    label="Seu Nome Completo (Educador/Gestor)"
                    value={educatorName}
                    onChangeText={setEducatorName}
                    placeholder="Ex: Maria Antônia Silva"
                    preset="educator"
                />

                <FormField
                    label="CódigoINEP ou Identificador Único"
                    value={schoolCode}
                    onChangeText={(val) => setSchoolCode(val.replace(/[^0-9]/g, ''))}
                    placeholder="Apenas números (Ex: 12345678)"
                    keyboardType="numeric"
                    preset="educator"
                />
            </View>
        </ScreenShell>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        gap: 18,
    },
});