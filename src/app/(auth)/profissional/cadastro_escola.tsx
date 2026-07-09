// src/app/(auth)/profissional/cadastro-escola.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles, GraduationCap, Users, Upload, Plus, Trash2 } from 'lucide-react-native';

import { theme, fonts } from '@/constants/theme';
import { ScreenShell } from '@/components/ScreenShell';
import { AuthHeader } from '@/components/AuthHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function RegisterSchoolWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    // --- Estados do Passo 1: Escola ---
    const [schoolName, setSchoolName] = useState('');
    const [educatorName, setEducatorName] = useState('');
    const [schoolCode, setSchoolCode] = useState('');

    // --- Estados do Passo 2: Turma ---
    const [className, setClassName] = useState('');
    const [classYear, setClassYear] = useState('');

    // --- Estados do Passo 3: Alunos ---
    const [studentName, setStudentName] = useState('');
    const [studentList, setStudentList] = useState<string[]>([]);

    // --- Validações por Passo ---
    const isStep1Valid = schoolName.trim().length >= 3 && educatorName.trim().length >= 3 && schoolCode.trim().length >= 4;
    const isStep2Valid = className.trim().length >= 2 && classYear.trim().length >= 1;
    const isStep3Valid = studentList.length > 0;

    // --- Funções de Fluxo ---
    const handleNext = () => {
        if (step === 1 && isStep1Valid) setStep(2);
        else if (step === 2 && isStep2Valid) setStep(3);
        else if (step === 3 && isStep3Valid) {
            console.log('Finalizando Cadastro Completo:', {
                school: { schoolName, educatorName, schoolCode },
                class: { className, classYear },
                students: studentList,
            });
            // Finalizado com sucesso! Redireciona para o painel principal
            // router.replace('/(main)/dashboard');
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else router.back();
    };

    const addStudentManual = () => {
        if (studentName.trim().length >= 2) {
            setStudentList([...studentList, studentName.trim()]);
            setStudentName('');
        }
    };

    const removeStudent = (index: number) => {
        setStudentList(studentList.filter((_, i) => i !== index));
    };

    return (
        <ScreenShell
            onBack={handleBack}
            bannerVariant={step === 1 ? 'mixedHigh' : step === 2 ? 'trees' : 'clouds'}
            footer={
                <PrimaryButton
                    disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || (step === 3 && !isStep3Valid)}
                    onPress={handleNext}
                >
                    {step === 3 ? 'Concluir e Criar Conta' : 'Continuar'}
                </PrimaryButton>
            }
        >
            {/* Indicador visual de progresso (Barra de Passos) */}
            <View style={styles.stepIndicatorRow}>
                {[1, 2, 3].map((num) => (
                    <View key={num} style={styles.stepDotWrapper}>
                        <View style={[styles.stepDot, step >= num ? styles.stepDotActive : styles.stepDotInactive]}>
                            <Text style={[styles.stepDotText, step >= num ? styles.stepDotTextActive : styles.stepDotTextInactive]}>
                                {num}
                            </Text>
                        </View>
                        {num < 3 && <View style={[styles.stepLine, step > num ? styles.stepLineActive : styles.stepLineInactive]} />}
                    </View>
                ))}
            </View>

            {/* --- PASSO 1: DADOS DA ESCOLA --- */}
            {step === 1 && (
                <View style={styles.stepContainer}>
                    <AuthHeader
                        Icon={Sparkles}
                        title="Cadastrar Escola"
                        subtitle="Crie o ambiente digital centralizado para mapear as jornadas da sua turma."
                        animate
                    />
                    <View style={styles.formGap}>
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
                            placeholder="Ex: Prof. Carlos Eduardo"
                            preset="educator"
                        />
                        <FormField
                            label="Código INEP ou Identificador"
                            value={schoolCode}
                            onChangeText={(val) => setSchoolCode(val.replace(/[^0-9]/g, ''))}
                            placeholder="Apenas números (Ex: 12345678)"
                            keyboardType="numeric"
                            preset="educator"
                        />
                    </View>
                </View>
            )}

            {/* --- PASSO 2: CRIAR PRIMEIRA TURMA --- */}
            {step === 2 && (
                <View style={styles.stepContainer}>
                    <AuthHeader
                        Icon={GraduationCap}
                        title="Criar sua Turma"
                        subtitle="Sua turma gerará um código de acesso único automático para os alunos."
                        animate
                    />
                    <View style={styles.formGap}>
                        <FormField
                            label="Identificador da Turma"
                            value={className}
                            onChangeText={setClassName}
                            placeholder="Ex: 4º Ano B"
                            preset="educator"
                        />
                        <FormField
                            label="Ano Letivo / Período"
                            value={classYear}
                            onChangeText={setClassYear}
                            placeholder="Ex: 2026"
                            keyboardType="numeric"
                            preset="educator"
                        />
                    </View>
                </View>
            )}

            {/* --- PASSO 3: ADICIONAR ALUNOS --- */}
            {step === 3 && (
                <View style={styles.stepContainer}>
                    <AuthHeader
                        Icon={Users}
                        title="Adicionar Alunos"
                        subtitle="Insira a lista para gerar os PINs individuais e confidenciais de acesso."
                        animate
                    />

                    {/* Área de Upload (Estilizada do App.js) */}
                    <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
                        <View style={styles.uploadIconCircle}>
                            <Upload size={20} color={theme.primary} />
                        </View>
                        <Text style={styles.uploadTitle}>Importar via planilha CSV</Text>
                        <Text style={styles.uploadSubtitle}>Clique para buscar arquivos excel ou texto</Text>
                    </TouchableOpacity>

                    <View style={styles.orRow}>
                        <View style={styles.orLine} />
                        <Text style={styles.orText}>ou adicionar manualmente</Text>
                        <View style={styles.orLine} />
                    </View>

                    <View style={styles.manualInputRow}>
                        <View style={{ flex: 1 }}>
                            <FormField
                                value={studentName}
                                onChangeText={setStudentName}
                                placeholder="Nome do aluno explorador"
                                preset="educator"
                            />
                        </View>
                        <TouchableOpacity style={styles.plusButton} onPress={addStudentManual} activeOpacity={0.8}>
                            <Plus size={22} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Lista de Alunos Adicionados */}
                    <View style={styles.studentListContainer}>
                        {studentList.map((name, index) => (
                            <View key={index} style={styles.studentItem}>
                                <Text style={styles.studentItemText}>{name}</Text>
                                <TouchableOpacity onPress={() => removeStudent(index)} hitSlop={8}>
                                    <Trash2 size={16} color={theme.danger} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </ScreenShell>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        flex: 1,
    },
    formGap: {
        gap: 18,
    },
    // --- Barra de Passos ---
    stepIndicatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        paddingHorizontal: 8,
    },
    stepDotWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepDot: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    stepDotActive: {
        backgroundColor: theme.primary,
        borderColor: theme.primary,
    },
    stepDotInactive: {
        backgroundColor: theme.card,
        borderColor: theme.border,
    },
    stepDotText: {
        fontFamily: fonts.bodyBold,
        fontSize: 12,
    },
    stepDotTextActive: {
        color: '#FFF',
    },
    stepDotTextInactive: {
        color: theme.textFaint,
    },
    stepLine: {
        width: 60,
        height: 3,
        borderRadius: 2,
        mx: 4,
    },
    stepLineActive: {
        backgroundColor: theme.primary,
    },
    stepLineInactive: {
        backgroundColor: theme.border,
    },
    // --- Elementos do Passo 3 (Iguais ao App.js) ---
    uploadBox: {
        borderWidth: 2,
        borderColor: theme.primaryLight,
        borderStyle: 'dashed',
        borderRadius: 20,
        padding: 24,
        backgroundColor: 'rgba(47,143,118,0.03)',
        alignItems: 'center',
        marginBottom: 24,
    },
    uploadIconCircle: {
        width: 42,
        height: 42,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        ...theme.shadowCard,
    },
    uploadTitle: {
        fontFamily: fonts.bodyBold,
        fontSize: 14,
        color: theme.primary,
        marginBottom: 4,
    },
    uploadSubtitle: {
        fontFamily: fonts.bodyRegular,
        fontSize: 12,
        color: theme.textMuted,
    },
    orRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: theme.border,
    },
    orText: {
        fontFamily: fonts.bodyBold,
        fontSize: 11,
        letterSpacing: 1.1,
        textTransform: 'uppercase',
        color: theme.textFaint,
    },
    manualInputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 12,
        marginBottom: 16,
    },
    plusButton: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
    },
    studentListContainer: {
        gap: 8,
        marginTop: 8,
    },
    studentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.bgSoft,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: theme.border,
    },
    studentItemText: {
        fontFamily: fonts.bodyBold,
        fontSize: 14,
        color: theme.textDark,
    },
});