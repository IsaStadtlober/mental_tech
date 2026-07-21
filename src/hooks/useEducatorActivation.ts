import { EDUCATOR_AUTH_CONSTANTS } from "@/constants/auth";
import type { EducatorActivationData } from "@/types/auth";
import { isValidEmail } from "@/utils/auth";
import { useState } from "react";

// Função de hook para gerenciar o estado e validação do formulário de ativação do professor.
export function useEducatorActivation() {
    const [form, setForm] = useState<EducatorActivationData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showErrors, setShowErrors] = useState(false);

    const nameIsValid = form.name.trim().length >= 3;
    const emailIsValid = isValidEmail(form.email);
    const passwordIsValid =
        form.password.length >= EDUCATOR_AUTH_CONSTANTS.MIN_PASSWORD_LENGTH;
    const passwordsMatch =
        form.confirmPassword.length > 0 && form.password === form.confirmPassword;
    const isFormValid =
        nameIsValid && emailIsValid && passwordIsValid && passwordsMatch;

    const updateField = (field: keyof EducatorActivationData, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    return {
        form,
        updateField,
        showErrors,
        setShowErrors,
        nameIsValid,
        emailIsValid,
        passwordIsValid,
        passwordsMatch,
        isFormValid,
    };
}