import { useRouter } from 'expo-router';
import { GraduationCap } from 'lucide-react-native';
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
    } = useEducatorActivation();

    const handleActivate = () => {
        setShowErrors(true);

        if (!isFormValid) return;

        router.replace(PROFESSOR_ROUTES.DASHBOARD as any);
    };

    return (
        <ScreenShell
            onBack={() => router.back()}
            footer={
                <PrimaryButton disabled={!isFormValid} onPress={handleActivate}>
                    {EDUCATOR_AUTH_CONSTANTS.TEXTS.ACTIVATION_BUTTON}
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
                <View style={styles.inviteCard}>
                    <Text style={styles.eyebrow}>Convite institucional</Text>

                    <View style={styles.inviteStack}>
                        <View style={styles.inviteItem}>
                            <Text style={styles.inviteLabel}>Escola</Text>
                            <Text style={styles.inviteValue}>Escola Caminho do Saber</Text>
                        </View>

                        <View style={styles.inviteItem}>
                            <Text style={styles.inviteLabel}>Turma vinculada</Text>
                            <Text style={styles.inviteValue}>5º Ano A</Text>
                        </View>
                    </View>
                </View>

                <FormField
                    label="Nome do professor *"
                    value={form.name}
                    onChangeText={(value) => updateField('name', value)}
                    placeholder="Ex: Maria Eduarda"
                    preset="educator"
                    error={showErrors && !nameIsValid}
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
                />
                {showErrors && !passwordsMatch && (
                    <Text style={styles.errorText}>
                        {EDUCATOR_AUTH_CONSTANTS.ERRORS.PASSWORD_MISMATCH}
                    </Text>
                )}
            </View>
        </ScreenShell>
    );
}