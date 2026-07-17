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

  //Logar como Escola e salvar dados completos da instituição
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

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
          full_name: school.trade_name,
          role: "school",
        },
      ]);
      if (profileError) throw profileError;

      const { data: schoolData, error: schoolError } = await supabase
        .from("schools")
        .insert([
          {
            profile_id: user.id,
            legal_name: school.legal_name,
            trade_name: school.trade_name,
            cnpj: school.cnpj.replace(/\D/g, ""),
            inep_code: school.inep_code || null,
            contact_email: school.email,
            phone: school.phone || null,
            zip_code: school.zip_code?.replace(/\D/g, "") || null,
            street: school.street || null,
            number: school.number || null,
            complement: school.complement || null,
            neighborhood: school.neighborhood || null,
            city: school.city || null,
            state: school.state || null,
          },
        ])
        .select()
        .single();

      if (schoolError) throw schoolError;
      if (!schoolData || !schoolData.id) {
        throw new Error("Erro ao recuperar a escola criada.");
      }

      const { data: classData, error: classError } = await supabase
        .from("classes")
        .insert([
          {
            school_id: schoolData.id,
            name: classDetails.name.trim(),
            grade: classDetails.grade.trim(),
            period: classDetails.period.trim(),
          },
        ])
        .select()
        .single();

      if (classError) throw classError;
      if (!classData || !classData.id) {
        throw new Error("Erro ao recuperar a turma criada.");
      }

      if (teacher?.email) {
        const { error: teacherError } = await supabase
          .from("school_teachers")
          .insert([
            {
              school_id: schoolData.id,
              class_id: classData.id,
              teacher_email: teacher.email.trim(),
            },
          ]);

        if (teacherError) {
          throw teacherError;
        }
      }

      if (students.length > 0) {
        const studentsPayload = students.map((student) => ({
          school_id: schoolData.id,
          class_id: classData.id,
          name: student.name.trim(),
          contact: student.contact.trim() || null,
          enrollment_number: student.enrollmentNumber?.trim() || null,
        }));

        const { error: studentsError } = await supabase
          .from("students")
          .insert(studentsPayload);
        if (studentsError) throw studentsError;
      }

      return { user, school: schoolData, class: classData };
    } catch (err: any) {
      setError(err.message || "Erro ao finalizar o onboarding da escola.");
      console.error("Erro ao finalizar o onboarding da escola:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  //Cadastro de turma

  return {
    loading,
    error,
    signUpSchool,
    registerSchoolData,
    finalizeSchoolOnboarding,
  };
}
