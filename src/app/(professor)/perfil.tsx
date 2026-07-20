import { useRouter } from 'expo-router';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import { borderRadius, fonts, theme } from '@/constants/theme';
import React, { useState } from 'react';
import {
    Pressable,
    ScrollView,
    Switch,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import { KeyRound, Save } from 'lucide-react-native';
import BackButton from '@/components/professor/BackButton';
import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import SectionHeader from '@/components/professor/SectionHeader';

export interface EducatorProfileData {
    name: string;
    email: string;
}

export interface EducatorProfileScreenProps {
    name: string;
    email: string;

    onBack: () => void;

    onSave: (data: EducatorProfileData) => void;
}

interface PreferenceRowProps {
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

/**
 * FRONT-END:
 * Linha compartilhada somente dentro da tela D1.
 *
 * Mantida no mesmo arquivo porque não existe reutilização
 * em outras áreas do protótipo neste momento.
 */
function PreferenceRow({
    title,
    description,
    value,
    onValueChange,
}: PreferenceRowProps) {
    return (
        <Pressable
            accessibilityRole="switch"
            accessibilityState={{
                checked: value,
            }}
            onPress={() => onValueChange(!value)}
            style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 18,

                paddingVertical: 15,

                opacity: pressed ? 0.84 : 1,
            })}
        >
            <View
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <Text
                    style={{
                        color: theme.textDark,
                        fontFamily: fonts.bodyBold,
                        fontSize: 14,
                    }}
                >
                    {title}
                </Text>

                <Text
                    style={{
                        marginTop: 4,

                        color: theme.textMuted,
                        fontFamily: fonts.bodyRegular,

                        fontSize: 12,
                        lineHeight: 18,
                    }}
                >
                    {description}
                </Text>
            </View>

            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{
                    false: theme.disabled,
                    true: theme.primaryLight,
                }}
                thumbColor={
                    value ? theme.primary : theme.card
                }
            />
        </Pressable>
    );
}

/**
 * USER FLOW D1:
 * Configurações de perfil do professor.
 *
 * Inclui dados pessoais, segurança, notificações
 * e preferências de acessibilidade.
 *
 * PROTOTYPE:
 * As preferências são mantidas somente enquanto
 * esta tela permanece montada.
 *
 * Não existe alteração real de senha ou persistência.
 */
function EducatorProfileScreen({
    name,
    email,
    onBack,
    onSave,
}: EducatorProfileScreenProps) {
    const { width } = useWindowDimensions();

    const isCompact = width < 780;

    const [displayName, setDisplayName] = useState(name);

    const [displayEmail, setDisplayEmail] = useState(email);

    const [currentPassword, setCurrentPassword] = useState('');

    const [newPassword, setNewPassword] = useState('');

    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [profileMessage, setProfileMessage] = useState('');

    const [passwordMessage, setPasswordMessage] = useState('');

    const [newSubmissions, setNewSubmissions] = useState(true);

    const [delayedCorrections, setDelayedCorrections] = useState(true);

    const [approachingDeadlines, setApproachingDeadlines] = useState(true);

    const [weeklySummary, setWeeklySummary] = useState(false);

    const [largeText, setLargeText] = useState(false);

    const [highContrast, setHighContrast] = useState(false);

    const [reduceAnimations, setReduceAnimations] = useState(false);

    const nameIsValid = displayName.trim().length >= 3;

    const emailIsValid =
        /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(displayEmail.trim());

    const profileIsValid = nameIsValid && emailIsValid;

    const passwordWasStarted =
        currentPassword.length > 0 ||
        newPassword.length > 0 ||
        confirmNewPassword.length > 0;

    const passwordIsValid =
        currentPassword.length >= 6 &&
        newPassword.length >= 6 &&
        newPassword === confirmNewPassword;

    const initials =
        displayName
            .trim()
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0))
            .join('')
            .toUpperCase() || 'PR';

    function handleSaveProfile() {
        setProfileMessage('');

        if (!profileIsValid) {
            setProfileMessage(
                'Revise o nome e o e-mail antes de salvar.'
            );
            return;
        }

        onSave({
            name: displayName.trim(),
            email: displayEmail.trim(),
        });

        setProfileMessage('Alterações do perfil salvas.');
    }

    function handleUpdatePassword() {
        setPasswordMessage('');

        if (!passwordIsValid) {
            setPasswordMessage(
                'Preencha as senhas corretamente. A nova senha deve ter pelo menos 6 caracteres e a confirmação deve ser igual.'
            );
            return;
        }

        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');

        setPasswordMessage('Senha atualizada no protótipo.');
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{
                flex: 1,

                backgroundColor: highContrast
                    ? theme.white
                    : theme.bgSubtle,
            }}
            contentContainerStyle={{
                paddingHorizontal: isCompact ? 16 : 24,
                paddingTop: 28,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    width: '100%',
                    maxWidth: 1120,
                    alignSelf: 'center',
                }}
            >
                <BackButton
                    label="Dashboard"
                    onPress={onBack}
                    style={{
                        marginBottom: 20,
                    }}
                />

                <View
                    style={{
                        flexDirection: isCompact ? 'column' : 'row',
                        alignItems: 'flex-start',
                        gap: 20,
                        marginTop: 24,
                    }}
                >
                    <View
                        style={{
                            flex: 1.25,
                            width: isCompact ? '100%' : undefined,
                            gap: 20,
                        }}
                    >
                        {/* Dados pessoais */}

                        <AppCard>
                            <SectionHeader
                                compact
                                title="Dados pessoais"
                                subtitle="Informações exibidas no Portal do Professor."
                                style={{
                                    marginBottom: 20,
                                }}
                            />

                            <View
                                style={{
                                    flexDirection: isCompact ? 'column' : 'row',
                                    alignItems: isCompact ? 'stretch' : 'center',
                                    gap: 20,
                                }}
                            >
                                <View
                                    style={{
                                        width: 82,
                                        height: 82,

                                        alignItems: 'center',
                                        justifyContent: 'center',

                                        borderRadius: 26,

                                        backgroundColor: theme.primary,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: theme.white,
                                            fontFamily: fonts.headlineBold,
                                            fontSize: 23,
                                        }}
                                    >
                                        {initials}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        minWidth: 0,
                                        gap: 16,
                                    }}
                                >
                                    <View>
                                        <Text
                                            style={{
                                                marginBottom: 7,

                                                color: theme.textDark,
                                                fontFamily: fonts.bodyBold,
                                                fontSize: 13,
                                            }}
                                        >
                                            Nome de exibição
                                        </Text>

                                        <TextInput
                                            value={displayName}
                                            onChangeText={setDisplayName}
                                            placeholder="Nome do professor"
                                            placeholderTextColor={
                                                theme.textFaint
                                            }
                                            style={{
                                                minHeight: 48,
                                                paddingHorizontal: 15,

                                                borderWidth: 1,
                                                borderColor:
                                                    displayName.length > 0 && !nameIsValid
                                                        ? theme.danger
                                                        : theme.border,

                                                borderRadius: borderRadius.lg,

                                                backgroundColor:
                                                    theme.bgSubtle,

                                                color: theme.textDark,

                                                fontFamily: fonts.bodyRegular,

                                                fontSize: largeText ? 17 : 14,
                                            }}
                                        />
                                    </View>

                                    <View>
                                        <Text
                                            style={{
                                                marginBottom: 7,

                                                color: theme.textDark,
                                                fontFamily: fonts.bodyBold,
                                                fontSize: 13,
                                            }}
                                        >
                                            E-mail
                                        </Text>

                                        <TextInput
                                            value={displayEmail}
                                            onChangeText={setDisplayEmail}
                                            placeholder="seu@email.com"
                                            placeholderTextColor={
                                                theme.textFaint
                                            }
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{
                                                minHeight: 48,
                                                paddingHorizontal: 15,

                                                borderWidth: 1,
                                                borderColor:
                                                    displayEmail.length > 0 && !emailIsValid
                                                        ? theme.danger
                                                        : theme.border,

                                                borderRadius: borderRadius.lg,

                                                backgroundColor:
                                                    theme.bgSubtle,

                                                color: theme.textDark,

                                                fontFamily: fonts.bodyRegular,

                                                fontSize: largeText ? 17 : 14,
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    marginTop: 18,
                                    padding: 14,

                                    borderRadius: borderRadius.lg,

                                    backgroundColor: theme.bgSoft,
                                }}
                            >
                                <Text
                                    style={{
                                        color: theme.textMuted,
                                        fontFamily: fonts.bodyRegular,
                                        fontSize: 12,
                                    }}
                                >
                                    Escola
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 3,

                                        color: theme.textDark,
                                        fontFamily: fonts.bodyBold,
                                        fontSize: 14,
                                    }}
                                >
                                    Escola Caminho do Saber
                                </Text>
                            </View>

                            {!!profileMessage && (
                                <View
                                    style={{
                                        marginTop: 16,
                                        padding: 13,

                                        borderRadius: borderRadius.lg,

                                        backgroundColor: profileIsValid
                                            ? theme.successSoft
                                            : theme.dangerSoft,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: profileIsValid
                                                ? theme.success
                                                : theme.danger,

                                            fontFamily: fonts.bodyBold,
                                            fontSize: 12,
                                        }}
                                    >
                                        {profileMessage}
                                    </Text>
                                </View>
                            )}

                            <View
                                style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}
                            >
                                <AppButton
                                    label="Salvar alterações"
                                    onPress={handleSaveProfile}
                                    disabled={!profileIsValid}
                                    iconLeft={
                                        <Save
                                            size={17}
                                            color={
                                                profileIsValid
                                                    ? theme.white
                                                    : theme.textMuted
                                            }
                                        />
                                    }
                                />
                            </View>
                        </AppCard>

                        {/* Segurança */}

                        <AppCard>
                            <SectionHeader
                                compact
                                title="Segurança"
                                subtitle="Atualização simulada da senha de acesso."
                                style={{
                                    marginBottom: 20,
                                }}
                            />

                            <View
                                style={{
                                    gap: 16,
                                }}
                            >
                                <PasswordInput
                                    label="Senha atual"
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    placeholder="Digite a senha atual"
                                    largeText={largeText}
                                />

                                <View
                                    style={{
                                        flexDirection: isCompact ? 'column' : 'row',
                                        gap: 16,
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        <PasswordInput
                                            label="Nova senha"
                                            value={newPassword}
                                            onChangeText={setNewPassword}
                                            placeholder="Mínimo 6 caracteres"
                                            largeText={largeText}
                                        />
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        <PasswordInput
                                            label="Confirmar nova senha"
                                            value={confirmNewPassword}
                                            onChangeText={setConfirmNewPassword}
                                            placeholder="Digite novamente"
                                            largeText={largeText}
                                        />
                                    </View>
                                </View>
                            </View>

                            {!!passwordMessage && (
                                <View
                                    style={{
                                        marginTop: 16,
                                        padding: 13,

                                        borderRadius: borderRadius.lg,

                                        backgroundColor: passwordIsValid
                                            ? theme.successSoft
                                            : theme.warningSoft,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: passwordIsValid
                                                ? theme.success
                                                : theme.warning,

                                            fontFamily: fonts.bodyBold,

                                            fontSize: 12,
                                            lineHeight: 18,
                                        }}
                                    >
                                        {passwordMessage}
                                    </Text>
                                </View>
                            )}

                            <View
                                style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}
                            >
                                <AppButton
                                    label="Atualizar senha"
                                    variant="secondary"
                                    disabled={!passwordWasStarted}
                                    iconLeft={
                                        <KeyRound
                                            size={17}
                                            color={
                                                passwordWasStarted
                                                    ? theme.primary
                                                    : theme.textMuted
                                            }
                                        />
                                    }
                                    onPress={handleUpdatePassword}
                                />
                            </View>
                        </AppCard>
                    </View>

                    <View
                        style={{
                            flex: 1,

                            width: isCompact ? '100%' : undefined,

                            gap: 20,
                        }}
                    >
                        {/* Notificações */}

                        <AppCard>
                            <SectionHeader
                                compact
                                title="Notificações"
                                subtitle="Escolha os eventos que deseja acompanhar."
                                style={{
                                    marginBottom: 6,
                                }}
                            />

                            <PreferenceRow
                                title="Novos envios"
                                description="Avisar quando um aluno enviar uma resposta."
                                value={newSubmissions}
                                onValueChange={setNewSubmissions}
                            />

                            <Divider />

                            <PreferenceRow
                                title="Correções pendentes"
                                description="Lembrar quando um envio aguardar por mais de 48 horas."
                                value={delayedCorrections}
                                onValueChange={setDelayedCorrections}
                            />

                            <Divider />

                            <PreferenceRow
                                title="Prazos próximos"
                                description="Avisar sobre atividades próximas da data de entrega."
                                value={approachingDeadlines}
                                onValueChange={setApproachingDeadlines}
                            />

                            <Divider />

                            <PreferenceRow
                                title="Resumo semanal"
                                description="Receber um resumo da participação das turmas."
                                value={weeklySummary}
                                onValueChange={setWeeklySummary}
                            />
                        </AppCard>

                        {/* Acessibilidade */}

                        <AppCard>
                            <SectionHeader
                                compact
                                title="Acessibilidade"
                                subtitle="Preferências demonstrativas do protótipo."
                                style={{
                                    marginBottom: 6,
                                }}
                            />

                            <PreferenceRow
                                title="Fonte ampliada"
                                description="Aumenta os textos dos campos desta tela."
                                value={largeText}
                                onValueChange={setLargeText}
                            />

                            <Divider />

                            <PreferenceRow
                                title="Alto contraste"
                                description="Aumenta o contraste do fundo desta tela."
                                value={highContrast}
                                onValueChange={setHighContrast}
                            />

                            <Divider />

                            <PreferenceRow
                                title="Reduzir animações"
                                description="Preferência registrada somente nesta demonstração."
                                value={reduceAnimations}
                                onValueChange={setReduceAnimations}
                            />

                            <View
                                style={{
                                    marginTop: 16,
                                    padding: 13,

                                    borderRadius: borderRadius.lg,

                                    backgroundColor: theme.infoSoft,
                                }}
                            >
                                <Text
                                    style={{
                                        color: theme.info,

                                        fontFamily: fonts.bodyRegular,

                                        fontSize: 12,
                                        lineHeight: 18,
                                    }}
                                >
                                    No produto oficial, estas preferências deverão ser
                                    aplicadas globalmente e persistidas na conta do
                                    professor.
                                </Text>
                            </View>
                        </AppCard>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

interface PasswordInputProps {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder: string;
    largeText: boolean;
}

function PasswordInput({
    label,
    value,
    onChangeText,
    placeholder,
    largeText,
}: PasswordInputProps) {
    return (
        <View>
            <Text
                style={{
                    marginBottom: 7,

                    color: theme.textDark,
                    fontFamily: fonts.bodyBold,

                    fontSize: 13,
                }}
            >
                {label}
            </Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.textFaint}
                secureTextEntry
                autoCapitalize="none"
                style={{
                    minHeight: 48,
                    paddingHorizontal: 15,

                    borderWidth: 1,
                    borderColor: theme.border,

                    borderRadius: borderRadius.lg,

                    backgroundColor: theme.bgSubtle,

                    color: theme.textDark,

                    fontFamily: fonts.bodyRegular,

                    fontSize: largeText ? 17 : 14,
                }}
            />
        </View>
    );
}

function Divider() {
    return (
        <View
            style={{
                height: 1,
                backgroundColor: theme.border,
            }}
        />
    );
}

export default function ProfileRoute() { const router = useRouter(); return <ProfessorRouteShell currentDestination="educatorProfile"><EducatorProfileScreen name="Professor" email="professor@caminhodosaber.edu.br" onBack={() => router.back()} onSave={() => undefined} /></ProfessorRouteShell>; }