import { useRouter, useLocalSearchParams } from 'expo-router';
import { GraduationCap } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { FormField } from '../../../components/form/FormField';
import { AuthHeader } from '../../../components/Headers';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ScreenShell } from '../../../components/ScreenShell';

import { PROFESSOR_ROUTES } from '@/router/professor.routes';
import { EDUCATOR_AUTH_CONSTANTS } from '../../../constants/auth';
import { useEducatorActivation } from '../../../hooks/useEducatorActivation';
import { styles } from '../../../styles';

export default function EducatorActivationRoute() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const schoolId = params.schoolId as string;
    const schoolName = params.schoolName as string;
    const emailParam = params.email as string;

    const {
        form,
        updateField,
        showErrors,
        setShowErrors,
        nameIsValid,
        emailIsValid,
        passwordIsValid,
        passwordsMatch,
        isFormValid,
        activateProfessor,
        isLoading,
        activationError,
    } = useEducatorActivation();

    // Pré-preencher email do parâmetro
    useEffect(() => {
        if (emailParam) {
            updateField('email', emailParam);
        }
    }, [emailParam]);

    const handleActivate = async () => {
        setShowErrors(true);

        if (!isFormValid) return;
        if (!schoolId) {
            console.error("schoolId não fornecido");
            return;
        }

        // Ativar professor em auth.users (e fazer login automático)
        const result = await activateProfessor(schoolId);
        
        if (result.success && result.user) {
            // Login bem-sucedido, entra no app automaticamente
            router.replace(PROFESSOR_ROUTES.DASHBOARD as any);
        }
    };

    return (
        <ScreenShell
            onBack={() => router.back()}
            footer={
                <PrimaryButton 
                    disabled={!isFormValid || isLoading} 
                    onPress={handleActivate}
                >
                    {isLoading
                        ? 'Ativando...'
                        : EDUCATOR_AUTH_CONSTANTS.TEXTS.ACTIVATION_BUTTON}
                </PrimaryButton>
            }
        >
            <AuthHeader
                Icon={GraduationCap}
                title={EDUCATOR_AUTH_CONSTANTS.TEXTS.ACTIVATION_TITLE}
                subtitle={EDUCATOR_AUTH_CONSTANTS.TEXTS.ACTIVATION_SUBTITLE}
                align="center"
            />

            <View style={styles.formStack}>
                {schoolName && (
                    <View style={styles.inviteCard}>
                        <Text style={styles.eyebrow}>Convite institucional</Text>

                        <View style={styles.inviteStack}>
                            <View style={styles.inviteItem}>
                                <Text style={styles.inviteLabel}>Escola</Text>
                                <Text style={styles.inviteValue}>{schoolName}</Text>
                            </View>
                        </View>
                    </View>
                )}

                <FormField
                    label="Nome do professor *"
                    value={form.name}
                    onChangeText={(value) => updateField('name', value)}
                    placeholder="Ex: Maria Eduarda"
                    preset="educator"
                    error={showErrors && !nameIsValid}
                    editable={!isLoading}
                />
                {showErrors && !nameIsValid && (
                    <Text style={styles.errorText}>
                        Informe um nome com pelo menos 3 caracteres.
                    </Text>
                )}

                <FormField
                    label={EDUCATOR_AUTH_CONSTANTS.LABELS.EMAIL}
                    value={form.email}
                    onChangeText={(value) => updateField('email', value)}
                    placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.EMAIL}
                    keyboardType="email-address"
                    preset="educator"
                    error={showErrors && !emailIsValid}
                    editable={!isLoading}
                />
                {showErrors && !emailIsValid && (
                    <Text style={styles.errorText}>Informe um e-mail válido.</Text>
                )}

                <FormField
                    label={EDUCATOR_AUTH_CONSTANTS.LABELS.CREATE_PASSWORD}
                    value={form.password}
                    onChangeText={(value) => updateField('password', value)}
                    placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.CREATE_PASSWORD}
                    secureTextEntry
                    preset="educator"
                    error={showErrors && !passwordIsValid}
                    editable={!isLoading}
                />
                {showErrors && !passwordIsValid && (
                    <Text style={styles.errorText}>
                        {EDUCATOR_AUTH_CONSTANTS.ERRORS.PASSWORD_TOO_SHORT}
                    </Text>
                )}

                <FormField
                    label={EDUCATOR_AUTH_CONSTANTS.LABELS.CONFIRM_PASSWORD}
                    value={form.confirmPassword}
                    onChangeText={(value) => updateField('confirmPassword', value)}
                    placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.CONFIRM_PASSWORD}
                    secureTextEntry
                    preset="educator"
                    error={showErrors && !passwordsMatch}
                    editable={!isLoading}
                />
                {showErrors && !passwordsMatch && (
                    <Text style={styles.errorText}>
                        {EDUCATOR_AUTH_CONSTANTS.ERRORS.PASSWORD_MISMATCH}
                    </Text>
                )}

                {!!activationError && (
                    <Text style={styles.errorText}>{activationError}</Text>
                )}
            </View>
        </ScreenShell>
    );
}