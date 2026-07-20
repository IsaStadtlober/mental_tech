import AppButton from '@/components/professor/AppButton';
import AppCard from '@/components/professor/AppCard';
import BackButton from '@/components/professor/BackButton';
import { ProfessorRouteShell } from '@/components/professor/ProfessorRouteShell';
import SectionHeader from '@/components/professor/SectionHeader';
import { PROFESSOR_PROFILE_MESSAGES } from '@/constants/professor/professor';
import { fonts, theme } from '@/constants/theme';
import { useEducatorProfileForm } from '@/hooks/useEducatorProfile';
import { PROFESSOR_ROUTES } from '@/router';
import { profileStyles as styles } from '@/styles/professor/perfil';
import type {
    EducatorProfileScreenProps, PasswordInputProps, PreferenceRowProps,
} from '@/types/professor';
import { useRouter } from 'expo-router';
import { KeyRound, Save } from 'lucide-react-native';
import {
    Pressable, ScrollView, Switch, Text, TextInput, useWindowDimensions, View,
} from 'react-native';

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
                ...styles.preferenceRow,
                opacity: pressed ? 0.84 : 1,
            })}
        >
            <View style={styles.preferenceContent}>
                <Text style={styles.preferenceTitle}>
                    {title}
                </Text>

                <Text style={styles.preferenceDescription}>
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

function EducatorProfileScreen({
    name,
    email,
    onBack,
    onSave,
}: EducatorProfileScreenProps) {
    const { width } = useWindowDimensions();
    const isCompact = width < 780;
    const {
        header,
        personalInfo,
        notifications,
        accessibility,
        security,
        actions,
    } = PROFESSOR_PROFILE_MESSAGES;

    const {
        displayName,
        setDisplayName,
        displayEmail,
        setDisplayEmail,
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        profileMessage,
        passwordMessage,
        newSubmissions,
        setNewSubmissions,
        delayedCorrections,
        setDelayedCorrections,
        approachingDeadlines,
        setApproachingDeadlines,
        weeklySummary,
        setWeeklySummary,
        largeText,
        setLargeText,
        highContrast,
        setHighContrast,
        reduceAnimations,
        setReduceAnimations,
        nameIsValid,
        emailIsValid,
        profileIsValid,
        passwordWasStarted,
        passwordIsValid,
        initials,
        handleSaveProfile,
        handleUpdatePassword,
    } = useEducatorProfileForm(name, email);

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{
                ...styles.page,
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
            <View style={styles.screenContainer}>
                <BackButton
                    label={header.backButton}
                    onPress={onBack}
                    style={styles.backButton}
                />

                <View
                    style={{
                        ...styles.contentRow,
                        flexDirection: isCompact ? 'column' : 'row',
                    }}
                >
                    <View
                        style={{
                            ...styles.contentColumn,
                            width: isCompact ? '100%' : undefined,
                        }}
                    >
                        {/* Dados pessoais */}

                        <AppCard>
                            <SectionHeader
                                compact
                                title={personalInfo.title}
                                subtitle={personalInfo.subtitle}
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
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {initials}
                                    </Text>
                                </View>

                                <View style={styles.formColumn}>
                                    <View>
                                        <Text style={styles.fieldLabel}>
                                            {personalInfo.displayNameLabel}
                                        </Text>

                                        <TextInput
                                            value={displayName}
                                            onChangeText={setDisplayName}
                                            placeholder={personalInfo.displayNamePlaceholder}
                                            placeholderTextColor={
                                                theme.textFaint
                                            }
                                            style={{
                                                ...styles.input,
                                                ...(displayName.length > 0 && !nameIsValid
                                                    ? styles.inputError
                                                    : {}),
                                                ...(largeText ? styles.inputLargeText : {}),
                                            }}
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.fieldLabel}>
                                            {personalInfo.emailLabel}
                                        </Text>

                                        <TextInput
                                            value={displayEmail}
                                            onChangeText={setDisplayEmail}
                                            placeholder={personalInfo.displayEmailPlaceholder}
                                            placeholderTextColor={
                                                theme.textFaint
                                            }
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{
                                                ...styles.input,
                                                ...(displayEmail.length > 0 && !emailIsValid
                                                    ? styles.inputError
                                                    : {}),
                                                ...(largeText ? styles.inputLargeText : {}),
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.schoolCard}>
                                <Text style={styles.schoolLabel}>
                                    {personalInfo.schoolLabel}
                                </Text>

                                <Text style={styles.schoolValue}>
                                    {personalInfo.schoolValue}
                                </Text>
                            </View>

                            {!!profileMessage && (
                                <View
                                    style={{
                                        ...styles.messageContainer,
                                        backgroundColor: profileIsValid
                                            ? theme.successSoft
                                            : theme.dangerSoft,
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...styles.messageText,
                                            color: profileIsValid
                                                ? theme.success
                                                : theme.danger,
                                        }}
                                    >
                                        {profileMessage}
                                    </Text>
                                </View>
                            )}

                            <View style={styles.actionRow}>
                                <AppButton
                                    label={actions.save}
                                    onPress={() => handleSaveProfile(onSave)}
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
                                title={security.title}
                                subtitle={security.subtitle}
                                style={{
                                    marginBottom: 20,
                                }}
                            />

                            <View style={styles.passwordGroup}>
                                <PasswordInput
                                    label={security.currentPasswordLabel}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    placeholder={security.currentPasswordPlaceholder}
                                    largeText={largeText}
                                />

                                <View
                                    style={{
                                        ...styles.passwordRow,
                                        flexDirection: isCompact ? 'column' : 'row',
                                    }}
                                >
                                    <View style={styles.passwordColumn}>
                                        <PasswordInput
                                            label={security.newPasswordLabel}
                                            value={newPassword}
                                            onChangeText={setNewPassword}
                                            placeholder={security.newPasswordPlaceholder}
                                            largeText={largeText}
                                        />
                                    </View>

                                    <View style={styles.passwordColumn}>
                                        <PasswordInput
                                            label={security.confirmPasswordLabel}
                                            value={confirmNewPassword}
                                            onChangeText={setConfirmNewPassword}
                                            placeholder={security.confirmPasswordPlaceholder}
                                            largeText={largeText}
                                        />
                                    </View>
                                </View>
                            </View>

                            {!!passwordMessage && (
                                <View
                                    style={{
                                        ...styles.messageContainer,
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

                            <View style={styles.actionRow}>
                                <AppButton
                                    label={actions.updatePassword}
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
                            ...styles.sideColumn,
                            width: isCompact ? '100%' : undefined,
                        }}
                    >
                        {/* Notificações */}

                        <AppCard>
                            <SectionHeader
                                compact
                                title={notifications.title}
                                subtitle={notifications.subtitle}
                                style={{
                                    marginBottom: 6,
                                }}
                            />

                            <PreferenceRow
                                title={notifications.newSubmissions.title}
                                description={notifications.newSubmissions.description}
                                value={newSubmissions}
                                onValueChange={setNewSubmissions}
                            />

                            <Divider />

                            <PreferenceRow
                                title={notifications.delayedCorrections.title}
                                description={notifications.delayedCorrections.description}
                                value={delayedCorrections}
                                onValueChange={setDelayedCorrections}
                            />

                            <Divider />

                            <PreferenceRow
                                title={notifications.approachingDeadlines.title}
                                description={notifications.approachingDeadlines.description}
                                value={approachingDeadlines}
                                onValueChange={setApproachingDeadlines}
                            />

                            <Divider />

                            <PreferenceRow
                                title={notifications.weeklySummary.title}
                                description={notifications.weeklySummary.description}
                                value={weeklySummary}
                                onValueChange={setWeeklySummary}
                            />
                        </AppCard>

                        {/* Acessibilidade */}

                        <AppCard>
                            <SectionHeader
                                compact
                                title={accessibility.title}
                                subtitle={accessibility.subtitle}
                                style={{
                                    marginBottom: 6,
                                }}
                            />

                            <PreferenceRow
                                title={accessibility.largeText.title}
                                description={accessibility.largeText.description}
                                value={largeText}
                                onValueChange={setLargeText}
                            />

                            <Divider />

                            <PreferenceRow
                                title={accessibility.highContrast.title}
                                description={accessibility.highContrast.description}
                                value={highContrast}
                                onValueChange={setHighContrast}
                            />

                            <Divider />

                            <PreferenceRow
                                title={accessibility.reduceAnimations.title}
                                description={accessibility.reduceAnimations.description}
                                value={reduceAnimations}
                                onValueChange={setReduceAnimations}
                            />

                            <View style={styles.accessibilityNote}>
                                <Text style={styles.accessibilityNoteText}>
                                    {accessibility.note}
                                </Text>
                            </View>
                        </AppCard>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
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
            <Text style={styles.passwordInputLabel}>
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
                    ...styles.passwordInput,
                    ...(largeText ? styles.passwordInputLargeText : {}),
                }}
            />
        </View>
    );
}

function Divider() {
    return <View style={styles.divider} />;
}

export default function ProfileRoute() {
    const router = useRouter();

    return (
        <ProfessorRouteShell currentDestination="educatorProfile">
            <EducatorProfileScreen
                name="Professor"
                email="professor@caminhodosaber.edu.br"
                onBack={() => router.push(PROFESSOR_ROUTES.DASHBOARD as any)}
                onSave={() => undefined}
            />
        </ProfessorRouteShell>
    );
}