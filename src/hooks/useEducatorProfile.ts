import { useMemo, useState } from 'react';

import { PROFESSOR_PROFILE_MESSAGES } from '@/constants/professor/professor';
import type { EducatorProfileData } from '@/types/professor';

export function isValidEducatorEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function getProfileInitials(name: string): string {
    return (
        name
            .trim()
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0))
            .join('')
            .toUpperCase() || 'PR'
    );
}

export function useEducatorProfileForm(initialName: string, initialEmail: string) {
    const { personalInfo, security } = PROFESSOR_PROFILE_MESSAGES;

    const [displayName, setDisplayName] = useState(initialName);
    const [displayEmail, setDisplayEmail] = useState(initialEmail);
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
    const emailIsValid = isValidEducatorEmail(displayEmail);
    const profileIsValid = nameIsValid && emailIsValid;
    const passwordWasStarted =
        currentPassword.length > 0 ||
        newPassword.length > 0 ||
        confirmNewPassword.length > 0;
    const passwordIsValid =
        currentPassword.length >= 6 &&
        newPassword.length >= 6 &&
        newPassword === confirmNewPassword;

    const initials = useMemo(() => getProfileInitials(displayName), [displayName]);

    function handleSaveProfile(onSave: (data: EducatorProfileData) => void) {
        setProfileMessage('');

        if (!profileIsValid) {
            setProfileMessage(personalInfo.validationError);
            return;
        }

        onSave({
            name: displayName.trim(),
            email: displayEmail.trim(),
        });

        setProfileMessage(personalInfo.successMessage);
    }

    function handleUpdatePassword() {
        setPasswordMessage('');

        if (!passwordIsValid) {
            setPasswordMessage(security.validationError);
            return;
        }

        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');

        setPasswordMessage(security.successMessage);
    }

    return {
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
    };
}