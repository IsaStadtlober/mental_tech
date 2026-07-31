import { supabase } from "@/service/supabase";

interface AuthenticatedUserSummary {
  id: string;
  email?: string | null;
}

interface AuthenticatedProfileSummary {
  id: string;
  email?: string | null;
  full_name?: string | null;
  role: string;
  is_active: boolean | null;
}

interface AuthenticatedTeacherSummary {
  id: string;
  profile_id: string;
  school_id: string;
  is_active: boolean | null;
}

interface AuthenticatedSchoolSummary {
  id: string;
  legal_name?: string | null;
  trade_name?: string | null;
  is_active: boolean | null;
}

interface AuthenticatedTeacherContext {
  user: AuthenticatedUserSummary;
  profile: AuthenticatedProfileSummary;
  teacher: AuthenticatedTeacherSummary;
  school: AuthenticatedSchoolSummary;
}

export interface ProfessorClassroomSummary {
  id: string;
  name: string;
  code?: string | null;
  grade?: string | null;
  shift?: string | null;
  academic_year?: number | null;
  is_active?: boolean | null;
  school_id?: string | null;
}

export interface ProfessorActivitySummary {
  id: string;
  title?: string | null;
  description?: string | null;
  status?: string | null;
  created_at?: string | null;
  class_id?: string | null;
  teacher_id?: string | null;
}

export interface ProfessorProfileResponse {
  user: AuthenticatedUserSummary;
  profile: AuthenticatedProfileSummary;
  teacher?: AuthenticatedTeacherSummary;
  school?: AuthenticatedSchoolSummary;
  educatorData?: unknown;
  role: "teacher" | "school";
}

async function getAuthenticatedTeacherContext(): Promise<AuthenticatedTeacherContext> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  if (!user?.id) throw new Error("Usuário não autenticado.");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) throw profileError;
  if (!profile) throw new Error("Perfil não encontrado.");
  if (profile.role !== "teacher") {
    throw new Error("Acesso restrito a professores.");
  }
  if (profile.is_active !== true) throw new Error("Perfil inativo.");

  const { data: teacher, error: teacherError } = await supabase
    .from("teachers")
    .select("id, profile_id, school_id, is_active")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (teacherError) throw teacherError;
  if (!teacher) throw new Error("Professor não encontrado.");
  if (teacher.is_active !== true) throw new Error("Professor inativo.");
  if (!teacher.school_id) throw new Error("Escola não associada ao professor.");

  const { data: school, error: schoolError } = await supabase
    .from("schools")
    .select("id, legal_name, trade_name, is_active")
    .eq("id", teacher.school_id)
    .maybeSingle();

  if (schoolError) throw schoolError;
  if (!school) throw new Error("Escola não encontrada.");
  if (school.is_active !== true) throw new Error("Escola inativa.");

  return { user, profile, teacher, school };
}

/**
 * Faz login de professor ou escola usando email e senha
 *
 * @param email - Email do professor ou da escola
 * @param password - Senha do professor ou da escola
 * @returns Dados do usuário autenticado, seu perfil e dados específicos (teacher/school)
 */
export async function authenticateEducator(email: string, password: string) {
  try {
    // 1. Autenticar no Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (authError) {
      console.error("Erro de autenticação:", authError.message);
      throw new Error("Email ou senha incorretos.");
    }

    const user = authData.user;
    if (!user) throw new Error("Erro ao recuperar usuário autenticado.");

    // 2. Buscar profile para identificar se é professor ou escola
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) throw profileError;
    if (!profile) throw new Error("Perfil não encontrado.");

    // 3. Se for professor, buscar dados adicionais
    let educatorData = null;
    if (profile.role === "teacher") {
      const { data: teacher, error: teacherError } = await supabase
        .from("teachers")
        .select("*, school_id(*)")
        .eq("profile_id", user.id)
        .maybeSingle();

      if (teacherError) throw teacherError;
      educatorData = teacher;
    } else if (profile.role === "school") {
      const { data: school, error: schoolError } = await supabase
        .from("schools")
        .select("*")
        .eq("profile_id", user.id)
        .maybeSingle();

      if (schoolError) throw schoolError;
      educatorData = school;
    }

    return {
      user,
      profile,
      educatorData,
      role: profile.role as "teacher" | "school",
    } satisfies ProfessorProfileResponse;
  } catch (error) {
    console.error("Erro ao autenticar educador:", error);
    throw error;
  }
}

/**
 * Lista as turmas vinculadas ao professor autenticado.
 */
export async function listProfessorClasses() {
  const { teacher, school } = await getAuthenticatedTeacherContext();

  const { data: classes, error: classesError } = await supabase
    .from("classes")
    .select("id, name, code, grade, shift, academic_year, is_active, school_id")
    .eq("school_id", teacher.school_id)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (classesError) throw classesError;

  return (classes ?? []).filter((classItem) => classItem.school_id === school.id) as ProfessorClassroomSummary[];
}

/**
 * Lista as atividades vinculadas ao professor autenticado.
 */
export async function listProfessorActivities(classId?: string) {
  const { teacher } = await getAuthenticatedTeacherContext();
  const requestedClassId = classId?.trim();

  if (requestedClassId) {
    const { data: classroom, error: classroomError } = await supabase
      .from("classes")
      .select("id")
      .eq("id", requestedClassId)
      .eq("school_id", teacher.school_id)
      .eq("is_active", true)
      .maybeSingle();

    if (classroomError) throw classroomError;
    if (!classroom) {
      throw new Error("Turma inválida ou não pertencente à escola.");
    }
  }

  let query = supabase
    .from("activities")
    .select("id, title, description, status, created_at, class_id, teacher_id")
    .eq("teacher_id", teacher.id)
    .order("created_at", { ascending: false });

  if (requestedClassId) {
    query = query.eq("class_id", requestedClassId);
  }

  const { data: activities, error: activitiesError } = await query;

  if (activitiesError) throw activitiesError;

  return (activities ?? []).filter((activity) => {
    if (!activity.class_id) return false;
    return activity.class_id !== null && activity.teacher_id === teacher.id;
  }) as ProfessorActivitySummary[];
}

/**
 * Busca o perfil completo do professor autenticado.
 */
export async function getProfessorProfile() {
  const { user, profile, teacher, school } = await getAuthenticatedTeacherContext();

  return {
    user,
    profile,
    teacher,
    school,
    role: "teacher",
  } satisfies ProfessorProfileResponse;
}

/**
 * Faz logout do usuário autenticado
 */
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}
