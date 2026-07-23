import { EDUCATOR_AUTH_CONSTANTS } from "@/constants/auth";
import type { EducatorActivationData } from "@/types/auth";
import { isValidEmail } from "@/utils/auth";
import { useState } from "react";
import { supabase } from "@/service/supabase";

// Função de hook para gerenciar o estado e validação do formulário de ativação do professor.
export function useEducatorActivation() {
    const [form, setForm] = useState<EducatorActivationData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showErrors, setShowErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activationError, setActivationError] = useState<string | null>(null);

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

    /**
     * Registra o professor em auth.users e faz login automático
     * Deve ser chamado após validação do formulário
     */
    const activateProfessor = async (schoolId: string) => {
        if (!isFormValid) {
            setActivationError("Formulário inválido. Verifique os dados.");
            return { success: false, user: null };
        }

        setIsLoading(true);
        setActivationError(null);

        try {
            // 1. Criar conta no Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: form.email.trim(),
                password: form.password,
            });

            if (authError) {
                const status =
                    (authError as any)?.status || (authError as any)?.status_code;
                if (status === 429 || /rate limit/i.test(authError.message || "")) {
                    throw new Error(
                        "Limite de tentativas atingido. Aguarde alguns minutos antes de tentar novamente.",
                    );
                }
                throw authError;
            }

            const user = authData.user;
            if (!user) throw new Error("Erro ao recuperar usuário criado.");

            // 2. Criar profile
            const { error: profileError } = await supabase.from("profiles").insert([
                {
                    id: user.id,
                    email: user.email,
                    full_name: form.name.trim(),
                    role: "teacher",
                },
            ]);
            if (profileError) throw profileError;

            // 3. Criar registro na tabela teachers
            const { error: teacherError } = await supabase
                .from("teachers")
                .insert([
                    {
                        profile_id: user.id,
                        school_id: schoolId,
                        is_active: true,
                    },
                ]);

            if (teacherError) throw teacherError;

            // 4. Fazer login automático com a senha fornecida
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: form.email.trim(),
                password: form.password,
            });

            if (signInError) {
                console.warn(
                    "Conta criada mas erro ao fazer login automático:",
                    signInError,
                );
                // Não falha completamente, professor pode fazer login manualmente
            }

            return { success: true, user };
        } catch (error: any) {
            setActivationError(
                error?.message || "Erro ao ativar conta. Tente novamente.",
            );
            console.error("Erro ao ativar professor:", error);
            return { success: false, user: null };
        } finally {
            setIsLoading(false);
        }
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
        activateProfessor,
        isLoading,
        activationError,
    };
}