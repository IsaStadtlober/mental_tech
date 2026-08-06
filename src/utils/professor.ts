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

export interface ProfessorStudentSummary {
  id: string;
  name: string;
  class_id?: string | null;
  class_name?: string | null;
  school_id?: string | null;
}

export interface ProfessorActivitySummary {
  id: string;
  teacher_id: string;
  class_id: string;
  title: string;
  description?: string | null;
  content_url?: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  published_at?: string | null;
}

export interface CreateProfessorActivityInput {
  classId: string;
  title: string;
  description?: string | null;
}

export interface UploadProfessorActivityFileInput {
  activityId: string;
  uri: string;
  fileName: string;
  mimeType?: string | null;
}

const ACTIVITIES_STORAGE_BUCKET = "activities";

const PROFESSOR_ACTIVITY_SELECT =
  "id, teacher_id, class_id, title, description, content_url, status, created_at, updated_at, published_at";

async function validateTeacherClass(
  teacherId: string,
  schoolId: string,
  classId: string
): Promise<void> {
  if (!classId || !classId.trim()) throw new Error("Turma não informada.");

  const requestedClassId = classId.trim();

  const { data: classroom, error: classroomError } = await supabase
    .from("classes")
    .select("id, is_active, school_id")
    .eq("id", requestedClassId)
    .maybeSingle();

  if (classroomError) throw classroomError;
  if (!classroom) throw new Error("Turma inválida ou não pertencente à escola.");
  if (classroom.is_active !== true) throw new Error("Turma inativa.");
  if (classroom.school_id !== schoolId) throw new Error("Turma não pertence à escola do professor.");

  const { data: teacherClass, error: tcError } = await supabase
    .from("teacher_classes")
    .select("teacher_id")
    .eq("teacher_id", teacherId)
    .eq("class_id", requestedClassId)
    .maybeSingle();

  if (tcError) throw tcError;
  if (!teacherClass) throw new Error("Professor não vinculado à turma informada.");
}

export async function createProfessorActivity(
  input: CreateProfessorActivityInput
): Promise<ProfessorActivitySummary> {
  const { teacher } = await getAuthenticatedTeacherContext();

  if (!input?.classId) throw new Error("Turma não informada.");

  await validateTeacherClass(teacher.id, teacher.school_id, input.classId);

  const title = input.title?.trim() || "";
  if (!title) throw new Error("Título não pode ser vazio.");

  const description = input.description?.trim() || null;

  const { data: activity, error } = await supabase
    .from("activities")
    .insert({
      teacher_id: teacher.id,
      class_id: input.classId.trim(),
      title,
      description,
      status: "draft",
    })
    .select(PROFESSOR_ACTIVITY_SELECT)
    .single();

  if (error) throw error;
  return activity as ProfessorActivitySummary;
}

export async function uploadProfessorActivityFile(
  input: UploadProfessorActivityFileInput
): Promise<ProfessorActivitySummary> {
  const { teacher } = await getAuthenticatedTeacherContext();

  if (!input?.activityId) throw new Error("Atividade não informada.");
  if (!input?.uri) throw new Error("URI do arquivo não informada.");
  if (!input?.fileName) throw new Error("Nome do arquivo não informado.");

  const activityId = input.activityId.trim();

  const { data: activity, error: activityError } = await supabase
    .from("activities")
    .select(PROFESSOR_ACTIVITY_SELECT)
    .eq("id", activityId)
    .eq("teacher_id", teacher.id)
    .maybeSingle();

  if (activityError) throw activityError;
  if (!activity) throw new Error("Atividade não encontrada ou não pertence ao professor.");

  await validateTeacherClass(teacher.id, teacher.school_id, activity.class_id);

  const sanitizedFileName = input.fileName.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const storagePath = `${teacher.id}/${activity.id}/${Date.now()}-${sanitizedFileName}`;

  let fileData: ArrayBuffer;
  try {
    const response = await fetch(input.uri);
    if (!response.ok) throw new Error("Falha ao ler o arquivo a partir da URI.");
    fileData = await response.arrayBuffer();
  } catch {
    throw new Error("Não foi possível converter a URI do arquivo. Verifique se a URI é acessível.");
  }

  const { error: uploadError } = await supabase.storage
    .from(ACTIVITIES_STORAGE_BUCKET)
    .upload(storagePath, fileData, {
      contentType: input.mimeType || undefined,
      upsert: false,
    });

  if (uploadError) {
    if (/bucket|not found|forbidden|permission/i.test(uploadError.message || "")) {
      throw new Error("Erro de Storage: bucket 'activities' não disponível ou sem permissão.");
    }
    throw uploadError;
  }

  const { data: publicData } = supabase.storage
    .from(ACTIVITIES_STORAGE_BUCKET)
    .getPublicUrl(storagePath);

  const publicUrl = publicData?.publicUrl || null;

  if (!publicUrl) {
    // tentar remover arquivo enviado
    try {
      await supabase.storage.from(ACTIVITIES_STORAGE_BUCKET).remove([storagePath]);
    } catch {
      // ignore cleanup error
    }
    throw new Error("Não foi possível obter a URL pública do arquivo enviado.");
  }

  const { data: updated, error: updateError } = await supabase
    .from("activities")
    .update({ content_url: publicUrl })
    .eq("id", activity.id)
    .eq("teacher_id", teacher.id)
    .select(PROFESSOR_ACTIVITY_SELECT)
    .single();

  if (updateError) {
    // tentar remover arquivo enviado
    try {
      await supabase.storage.from(ACTIVITIES_STORAGE_BUCKET).remove([storagePath]);
    } catch {
      // ignore cleanup error
    }
    throw updateError;
  }

  return updated as ProfessorActivitySummary;
}

export async function publishProfessorActivity(
  activityId: string
): Promise<ProfessorActivitySummary> {
  const { teacher } = await getAuthenticatedTeacherContext();

  if (!activityId || !activityId.trim()) throw new Error("Atividade não informada.");

  const requestedId = activityId.trim();

  const { data: activity, error: activityError } = await supabase
    .from("activities")
    .select(PROFESSOR_ACTIVITY_SELECT)
    .eq("id", requestedId)
    .eq("teacher_id", teacher.id)
    .maybeSingle();

  if (activityError) throw activityError;
  if (!activity) throw new Error("Atividade não encontrada ou não pertence ao professor.");

  await validateTeacherClass(teacher.id, teacher.school_id, activity.class_id);

  if (!activity.content_url) throw new Error("Não é possível publicar atividade sem arquivo de conteúdo.");

  if (activity.status === "published") {
    return activity as ProfessorActivitySummary;
  }

  const { data: published, error: publishError } = await supabase
    .from("activities")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", requestedId)
    .eq("teacher_id", teacher.id)
    .select(PROFESSOR_ACTIVITY_SELECT)
    .single();

  if (publishError) throw publishError;

  return published as ProfessorActivitySummary;
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
export async function listProfessorActivities(
  classId?: string
): Promise<ProfessorActivitySummary[]> {
  const { teacher } = await getAuthenticatedTeacherContext();

  if (classId && classId.trim()) {
    await validateTeacherClass(teacher.id, teacher.school_id, classId);
  }

  let query = supabase
    .from("activities")
    .select(PROFESSOR_ACTIVITY_SELECT)
    .eq("teacher_id", teacher.id)
    .order("created_at", { ascending: false });

  if (classId && classId.trim()) {
    query = query.eq("class_id", classId.trim());
  }

  const { data: activities, error: activitiesError } = await query;

  if (activitiesError) throw activitiesError;

  return (activities ?? []) as ProfessorActivitySummary[];
}

/**
 * Lista os alunos vinculados ao professor autenticado.
 */
export async function listProfessorStudents(): Promise<ProfessorStudentSummary[]> {
  const { teacher } = await getAuthenticatedTeacherContext();

  const { data: teacherClasses, error: teacherClassesError } = await supabase
    .from("teacher_classes")
    .select("class_id")
    .eq("teacher_id", teacher.id);

  if (teacherClassesError) throw teacherClassesError;

  const classIds = (teacherClasses ?? [])
    .map((item) => item.class_id)
    .filter(Boolean) as string[];

  if (classIds.length === 0) {
    return [];
  }

  const { data: students, error: studentsError } = await supabase
    .from("students")
    .select("id, name, class_id, school_id")
    .eq("school_id", teacher.school_id)
    .in("class_id", classIds);

  if (studentsError) throw studentsError;

  const { data: classes, error: classesError } = await supabase
    .from("classes")
    .select("id, name")
    .in("id", classIds);

  if (classesError) throw classesError;

  const classNameById = new Map((classes ?? []).map((classItem) => [classItem.id, classItem.name]));

  return (students ?? []).map((student) => ({
    id: student.id,
    name: student.name,
    class_id: student.class_id,
    class_name: student.class_id ? classNameById.get(student.class_id) ?? null : null,
    school_id: student.school_id,
  })) as ProfessorStudentSummary[];
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
