import {
  sendStudentAccessEmail,
  sendTeacherInvite,
} from "@/service/emailServices";
import { supabase } from "@/service/supabase";
import type {
  ClassData,
  SchoolOnboardingData,
  StudentData,
  TeacherData,
} from "@/types/wizard";
import { formatClassCode } from "@/utils/auth";
import {
  generateClassCode,
  generateClassPin,
  generateStudentAccessCode,
} from "@/utils/generators";
import { useState } from "react";

// --- INTERFACES & PAYLOADS ---

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

interface StudentValidationResult {
  classId: string;
  schoolId: string;
  className: string;
  grade: string;
  schoolName?: string;
}

interface StudentRegistrationResult {
  studentId: string;
  classId: string;
  schoolId: string;
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

export interface CreateClassPayload {
  school_id: string;
  name: string;
  grade: string;
  shift: string;
  academic_year?: number;
  pin?: string; // PIN opcional (se o professor editou), se não vier, geramos um
}

// --- HOOK PRINCIPAL ---

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

      // 🔍 DEBUG: Veja exatamente o que está chegando no console
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

      // 🛡️ Validação e geração garantida de Code e PIN

      const safeCode =
        classDetails?.code ||
        generateClassCode() ||
        Math.random().toString(36).substring(2, 8).toUpperCase();

      const safePin =
        classDetails?.pin ||
        generateClassPin() ||
        Math.floor(1000 + Math.random() * 9000).toString();

      // Mapeia tanto camelCase quanto snake_case para evitar incompatibilidades na procedure SQL
      const studentsWithAccess = (students || []).map((student) => ({
        ...student,
        guardian_email: student.guardian_email || "",
        student_access_code: generateStudentAccessCode(),
      }));

      const classWithCode = {
        ...classDetails,
        code: safeCode,
        pin: safePin,
        class_code: safeCode,
        class_pin: safePin,
      };

      console.log("Turma formatada para inserção:", classWithCode);
      console.log("Alunos formatados para inserção:", studentsWithAccess);

      // 2. Envia para a chamada atômica do banco de dados
      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "finalize_school_onboarding",
        {
          p_user_id: user.id,
          p_school: school,
          p_class: classWithCode,
          p_teacher: teacher || null,
          p_students: studentsWithAccess,
        },
      );

      if (rpcError) {
        throw new Error(
          rpcError.message || "Erro ao salvar os dados no banco.",
        );
      }

      let schoolTableId = rpcData?.id ?? null;

      if (!schoolTableId) {
        const { data: schoolRecord, error: schoolLookupError } = await supabase
          .from("schools")
          .select("id")
          .eq("profile_id", user.id)
          .maybeSingle();

        if (schoolLookupError) throw schoolLookupError;
        schoolTableId = schoolRecord?.id ?? null;
      }

      if (!schoolTableId) {
        throw new Error("Não foi possível localizar o ID da escola no banco.");
      }

      console.log("ID da escola usado no convite:", schoolTableId);

      // 📧 Enviar email de ativação para o professor
      if (teacher && teacher.email) {
        try {
          await sendTeacherInvite({
            teacherEmail: teacher.email,
            teacherName: teacher.name || "Professor (a)",
            schoolName: school.trade_name,
            activationUrl: `${process.env.EXPO_PUBLIC_APP_URL || "http://localhost:8081"}/(auth)/professor/ativacao-conta?email=${encodeURIComponent(teacher.email)}&schoolId=${encodeURIComponent(schoolTableId)}&schoolName=${encodeURIComponent(school.trade_name)}`,
          });

          console.log(
            "✅ Email de ativação enviado com sucesso para:",
            teacher.email,
          );
        } catch (emailError) {
          console.warn(
            "⚠️ Aviso: Escola criada, mas erro ao enviar email:",
            emailError,
          );
        }
      }

      if (studentsWithAccess.length > 0) {
        await Promise.allSettled(
          studentsWithAccess.map(async (student) => {
            if (!student.guardian_email) return;

            try {
              await sendStudentAccessEmail({
                guardianEmail: student.guardian_email,
                schoolName: school.trade_name,
                studentName: student.name,
                classCode: safeCode,
                classPin: safePin,
                studentAccessCode: student.student_access_code || "",
              });
            } catch (sendError) {
              console.warn(
                "⚠️ Erro ao enviar e-mail de acesso do aluno:",
                student.guardian_email,
                sendError,
              );
            }
          }),
        );
      }

      return { user, school: { ...(rpcData || {}), id: schoolTableId } };
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

  // Função para cadastrar novas turmas no dia a dia
  async function createClass(classData: CreateClassPayload) {
    setLoading(true);
    setError(null);

    try {
      const classCode = generateClassCode();
      const classPin = classData.pin || generateClassPin();

      const { data, error: insertError } = await supabase
        .from("classes")
        .insert([
          {
            school_id: classData.school_id,
            name: classData.name,
            grade: classData.grade,
            shift: classData.shift,
            academic_year: classData.academic_year || new Date().getFullYear(),
            code: classCode,
            pin: classPin,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      return data;
    } catch (err: any) {
      setError(err.message || "Erro ao criar turma.");
      console.error("Erro ao criar turma:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function validateStudentAccess(
    classCode: string,
    pin: string,
  ): Promise<StudentValidationResult> {
    setLoading(true);
    setError(null);

    try {
      const normalizedCode = formatClassCode(classCode);
      const rawCode = classCode.trim().toUpperCase();
      const normalizedPin = String(pin || "").trim();

      if (!normalizedCode && !rawCode) {
        throw new Error("Código inválido.");
      }

      console.log("🔍 Buscando no banco pelos códigos:", {
        formatted: normalizedCode,
        raw: rawCode,
      });

      // Busca tentado tanto o código formatado quanto o código bruto digitado
      const { data: classByCode, error: codeQueryError } = await supabase
        .from("classes")
        .select(
          "id, grade, name, code, school_id(id, trade_name, is_active), is_active, pin",
        )
        .or(`code.eq.${normalizedCode},code.eq.${rawCode}`)
        .maybeSingle();

      if (codeQueryError) {
        console.error("❌ Erro da Query no Supabase:", codeQueryError);
        throw codeQueryError;
      }

      if (!classByCode) {
        console.warn("⚠️ Nenhuma turma encontrada com este código.");
        throw new Error("Código inválido. Verifique o código informado.");
      }

      console.log("✅ Turma encontrada no DB:", classByCode);

      if (String(classByCode.pin).trim() !== normalizedPin) {
        console.warn("PIN informado não confere:", {
          expected: classByCode.pin,
          received: normalizedPin,
        });
        throw new Error(
          "PIN incorreto. Verifique o PIN enviado ao responsável.",
        );
      }

      if (!(classByCode as any).is_active) {
        throw new Error("Esta turma não está ativa.");
      }

      const schoolObj = (classByCode as any).school_id;
      if (!schoolObj || !schoolObj.is_active) {
        throw new Error("A escola vinculada a esta turma não está ativa.");
      }

      return {
        classId: classByCode.id,
        schoolId: schoolObj.id,
        className: classByCode.name,
        grade: classByCode.grade,
        schoolName: schoolObj.trade_name,
      };
    } catch (err: any) {
      setError(err.message);
      console.error("Erro ao validar acesso do aluno:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function registerStudent(
    studentName: string,
    classId: string,
    schoolId: string,
  ): Promise<StudentRegistrationResult> {
    setLoading(true);
    setError(null);

    try {
      const normalizedName = studentName.trim();
      if (!normalizedName) {
        throw new Error("Nome do aluno é obrigatório.");
      }
      if (!classId || !schoolId) {
        throw new Error("Dados da turma não encontrados.");
      }

      const { data: existingStudent, error: existingError } = await supabase
        .from("students")
        .select("id")
        .eq("name", normalizedName)
        .eq("class_id", classId)
        .maybeSingle();

      if (existingError) throw existingError;
      if (existingStudent?.id) {
        return {
          studentId: existingStudent.id,
          classId,
          schoolId,
        };
      }

      const { data: insertedStudent, error: insertError } = await supabase
        .from("students")
        .insert([
          {
            school_id: schoolId,
            class_id: classId,
            name: normalizedName,
            guardian_contact: null,
          },
        ])
        .select("id")
        .single();

      if (insertError) throw insertError;
      if (!insertedStudent?.id) {
        throw new Error("Não foi possível cadastrar o aluno.");
      }

      return {
        studentId: insertedStudent.id,
        classId,
        schoolId,
      };
    } catch (err: any) {
      setError(err.message);
      console.error("Erro ao cadastrar aluno:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Verifica se um código de acesso de aluno é válido para a turma
  async function verifyStudentAccessCode(
    classId: string,
    accessCode: string,
  ): Promise<{ studentId?: string; name?: string }> {
    setLoading(true);
    setError(null);

    try {
      // Normaliza limpando caracteres especiais e colocando em CAIXA ALTA
      const normalizedCode = accessCode
        .replace(/[^A-Za-z0-9]/g, "")
        .trim()
        .toUpperCase();

      console.log("🔍 Verificando código do aluno:", {
        classId,
        accessCodeDigitado: accessCode,
        normalizedCode,
      });

      if (!normalizedCode) throw new Error("Código de acesso inválido.");

      const { data, error } = await supabase
        .from("students")
        .select("id, name, student_access_code")
        .eq("class_id", classId)
        .eq("student_access_code", normalizedCode)
        .maybeSingle();

      if (error) {
        console.error("❌ Erro retornado pelo Supabase (RLS ou Query):", error);
        throw error;
      }

      if (!data) {
        console.warn(
          "⚠️ Nenhum aluno encontrado com este código para esta turma.",
        );
        throw new Error("Código de acesso inválido.");
      }

      console.log("✅ Aluno encontrado com sucesso:", data);
      return { studentId: data.id, name: data.name };
    } catch (err: any) {
      console.error("❌ Erro em verifyStudentAccessCode:", err.message || err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    signUpSchool,
    signUpProfessor,
    registerSchoolData,
    finalizeSchoolOnboarding,
    signInEducator,
    signOut,
    createClass,
    validateStudentAccess,
    registerStudent,
    verifyStudentAccessCode,
  };
}
