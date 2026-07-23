import { supabase } from "@/service/supabase";
import type {
  ClassData,
  SchoolOnboardingData,
  StudentData,
  TeacherData,
} from "@/types/wizard";
import { useState } from "react";

interface SchoolSignUpPayload {
  email: string;
  password: string;
  legal_name: string;
  trade_name: string;
  cnpj: string;
  inep_code?: string;
  phone?: string;
  zip_code?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

interface FinalizeSchoolOnboardingPayload {
  school: SchoolOnboardingData;
  classDetails: ClassData;
  teacher: TeacherData | null;
  students: StudentData[];
}

interface SchoolSignUpData {
  profile_id: string; // ID do perfil de usuário associado à escola
  legal_name: string; // Razão social da escola
  trade_name: string; // Nome fantasia da escola
  cnpj: string; // CNPJ da escola
  inep_code: string; // Código INEP da escola
  contact_email: string; // Email de contato da escola
  phone?: string; // Telefone da escola
  zip_code?: string; // CEP da escola
  street?: string; // Rua da escola
  number?: string; // Número do endereço da escola
  complement?: string; // Complemento do endereço da escola
  neighborhood?: string; // Bairro da escola
  city?: string; // Cidade da escola
  state?: string; // Estado da escola
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Loga a escola e insere o perfil e os dados da instituição no banco.
  async function signUpSchool(schoolData: SchoolSignUpPayload) {
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: schoolData.email,
        password: schoolData.password,
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

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
          full_name: schoolData.trade_name,
          role: "school",
        },
      ]);
      if (profileError) throw profileError;

      const { data, error: insertError } = await supabase
        .from("schools")
        .insert([
          {
            profile_id: user.id,
            legal_name: schoolData.legal_name,
            trade_name: schoolData.trade_name,
            cnpj: schoolData.cnpj.replace(/\D/g, ""), // Limpa máscara de CNPJ
            inep_code: schoolData.inep_code || null,
            contact_email: schoolData.email,
            phone: schoolData.phone || null,
            zip_code: schoolData.zip_code?.replace(/\D/g, "") || null, // Limpa CEP
            street: schoolData.street || null,
            number: schoolData.number || null,
            complement: schoolData.complement || null,
            neighborhood: schoolData.neighborhood || null,
            city: schoolData.city || null,
            state: schoolData.state || null,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      return { user, school: data };
    } catch (error: any) {
      setError(error.message);
      console.error("Erro ao registrar escola:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  //Cadastrar dados da escola
  async function registerSchoolData(schoolData: SchoolSignUpData) {
    setLoading(true);
    setError(null);
    try {
      const { data, error: insertError } = await supabase
        .from("schools")
        .insert([
          {
            profile_id: schoolData.profile_id,
            legal_name: schoolData.legal_name,
            trade_name: schoolData.trade_name,
            cnpj: schoolData.cnpj.replace(/\D/g, ""), // Limpa máscara de CNPJ (salva só números)
            inep_code: schoolData.inep_code || null,
            contact_email: schoolData.contact_email || null,
            phone: schoolData.phone || null,
            zip_code: schoolData.zip_code?.replace(/\D/g, "") || null, // Limpa cep
            street: schoolData.street || null,
            number: schoolData.number || null,
            complement: schoolData.complement || null,
            neighborhood: schoolData.neighborhood || null,
            city: schoolData.city || null,
            state: schoolData.state || null,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      return data;
    } catch (err: any) {
      setError(err.message || "Erro ao salvar os detalhes da escola.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function finalizeSchoolOnboarding(
    payload: FinalizeSchoolOnboardingPayload,
  ) {
    setLoading(true);
    setError(null);

    try {
      const { school, classDetails, teacher, students } = payload;

      // 🔍 DEBUG: Veja exatamente o que está chegando aqui no console
      console.log("Payload recebido no onboarding:", {
        email: school?.email,
        hasPassword: Boolean(school?.password),
      });

      // 🛑 Trava de segurança para evitar chamada sem credenciais
      if (!school?.email || !school?.password) {
        throw new Error(
          "E-mail e senha da escola são obrigatórios para concluir o cadastro.",
        );
      }
      // 1. Cria a conta no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: school.email,
        password: school.password,
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
      if (!user) {
        throw new Error("Erro ao recuperar usuário criado.");
      }

      // 2. Envia TUDO de uma vez em uma única chamada de banco atômica e segura!
      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "finalize_school_onboarding",
        {
          p_user_id: user.id,
          p_school: school,
          p_class: classDetails,
          p_teacher: teacher || null,
          p_students: students || [],
        },
      );

      if (rpcError) {
        throw new Error(
          rpcError.message || "Erro ao salvar os dados no banco.",
        );
      }

      return { user, school: rpcData };
    } catch (err: any) {
      setError(err.message || "Erro ao finalizar o onboarding da escola.");
      console.error("Erro ao finalizar o onboarding da escola:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Registra um professor em auth.users + tabela teachers
  async function signUpProfessor(
    professorEmail: string,
    professorPassword: string,
    schoolId: string,
    professorName: string,
  ) {
    setLoading(true);
    setError(null);

    try {
      // 1. Criar conta no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: professorEmail,
        password: professorPassword,
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
          full_name: professorName,
          role: "teacher",
        },
      ]);
      if (profileError) throw profileError;

      // 3. Criar registro do professor na tabela teachers
      const { data: teacher, error: teacherError } = await supabase
        .from("teachers")
        .insert([
          {
            profile_id: user.id,
            school_id: schoolId,
            is_active: true,
          },
        ])
        .select()
        .single();

      if (teacherError) throw teacherError;
      return { user, teacher };
    } catch (error: any) {
      setError(error.message);
      console.error("Erro ao registrar professor:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Autentica professor ou escola usando email e senha
  async function signInEducator(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      // 1. Autenticar no Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (authError) {
        throw new Error("Email ou senha incorretos.");
      }

      const user = authData.user;
      if (!user) throw new Error("Erro ao recuperar usuário autenticado.");

      // 2. Buscar profile para identificar se é professor ou escola
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error("Perfil não encontrado.");

      // 3. Se for professor, buscar dados adicionais
      let educatorData = null;
      if (profile.role === "teacher") {
        const { data: teacher, error: teacherError } = await supabase
          .from("teachers")
          .select("*, school_id(*)")
          .eq("profile_id", user.id)
          .single();

        if (teacherError) throw teacherError;
        educatorData = teacher;
      } else if (profile.role === "school") {
        const { data: school, error: schoolError } = await supabase
          .from("schools")
          .select("*")
          .eq("profile_id", user.id)
          .single();

        if (schoolError) throw schoolError;
        educatorData = school;
      }

      return {
        user,
        profile,
        educatorData,
        role: profile.role,
      };
    } catch (error: any) {
      setError(error.message);
      console.error("Erro ao fazer login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Faz logout
  async function signOut() {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      console.error("Erro ao fazer logout:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  //Cadastro de turma

  return {
    loading,
    error,
    signUpSchool,
    signUpProfessor,
    registerSchoolData,
    finalizeSchoolOnboarding,
    signInEducator,
    signOut,
  };
}
