import { supabase } from "@/service/supabase";

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
      .single();

    if (profileError) throw profileError;
    if (!profile) throw new Error("Perfil não encontrado.");

    // 3. Se for professor, buscar dados adicionais
    let educatorData = null;
    if (profile.role === "teacher") {
      const { data: teacher, error: teacherError } = await supabase
        .from("teachers")
        .select("*")
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
      role: profile.role as "teacher" | "school",
    };
  } catch (error) {
    console.error("Erro ao autenticar educador:", error);
    throw error;
  }
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
