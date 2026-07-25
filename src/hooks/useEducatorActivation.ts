import { EDUCATOR_AUTH_CONSTANTS } from "@/constants/auth";
import { supabase } from "@/service/supabase";
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
    cpf: "",
    phone: "",
    birthDate: "",
    position: "",
    registrationNumber: "",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activationError, setActivationError] = useState<string | null>(null);

  const nameIsValid = form.name.trim().length >= 3;
  const emailIsValid = isValidEmail(form.email);
  const cpfIsValid =
    form.cpf.trim().length === 0 || /^\d{11}$/.test(form.cpf.replace(/\D/g, ""));
  const phoneIsValid =
    form.phone.trim().length === 0 || /^\+?[\d\s()-]{10,15}$/.test(form.phone.trim());
  const birthDateIsValid =
    form.birthDate.trim().length === 0 || /^\d{2}\/\d{2}\/\d{4}$/.test(form.birthDate.trim());
  const positionIsValid = form.position.trim().length === 0 || form.position.trim().length >= 2;
  const registrationNumberIsValid =
    form.registrationNumber.trim().length === 0 || form.registrationNumber.trim().length >= 3;
  const passwordIsValid =
    form.password.length >= EDUCATOR_AUTH_CONSTANTS.MIN_PASSWORD_LENGTH;
  const passwordsMatch =
    form.confirmPassword.length > 0 && form.password === form.confirmPassword;
  const isFormValid =
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    passwordsMatch &&
    cpfIsValid &&
    phoneIsValid &&
    birthDateIsValid &&
    positionIsValid &&
    registrationNumberIsValid;

  const updateField = (field: keyof EducatorActivationData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const formatBirthDate = (value: string) => {
    const [day, month, year] = value.split("/");
    return day && month && year ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : undefined;
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
      const profileInsert: Record<string, any> = {
        id: user.id,
        email: user.email,
        full_name: form.name.trim(),
        role: "teacher",
      };

      if (form.cpf.trim().length > 0) {
        profileInsert.cpf = form.cpf.replace(/\D/g, "");
      }
      if (form.phone.trim().length > 0) {
        profileInsert.phone = form.phone.trim();
      }
      if (form.birthDate.trim().length > 0) {
        const formatted = formatBirthDate(form.birthDate.trim());
        if (formatted) profileInsert.birth_date = formatted;
      }

      const { error: profileError } = await supabase.from("profiles").insert([
        profileInsert,
      ]);
      if (profileError) throw profileError;

      // 3. Criar registro na tabela teachers
      const teacherInsert: Record<string, any> = {
        profile_id: user.id,
        school_id: schoolId,
        is_active: true,
      };

      if (form.position.trim().length > 0) {
        teacherInsert.position = form.position.trim();
      }
      if (form.registrationNumber.trim().length > 0) {
        teacherInsert.registration_number = form.registrationNumber.trim();
      }

      const { error: teacherError } = await supabase.from("teachers").insert([
        teacherInsert,
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
    cpfIsValid,
    phoneIsValid,
    birthDateIsValid,
    positionIsValid,
    registrationNumberIsValid,
    passwordIsValid,
    passwordsMatch,
    isFormValid,
    activateProfessor,
    isLoading,
    activationError,
  };
}
