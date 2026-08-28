import { supabase } from "@/service/supabase";
import type { ActivityFormData } from "@/types/professor/activityForm";

interface SaveActivityOptions {
  formData: ActivityFormData;
  classId: string;
  fileUriOrBlob?: string | Blob;
  targetStudentIds?: string[]; // Opcional: Se quiser enviar para alunos específicos
}

export async function saveActivityToSupabase({
  formData,
  classId,
  fileUriOrBlob,
  targetStudentIds,
}: SaveActivityOptions) {
  // 1. Obter usuário logado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Usuário não está autenticado.");

  // 2. Buscar professor
  const { data: teacher, error: teacherError } = await supabase
    .from("teachers")
    .select("id")
    .eq("profile_id", user.id)
    .single();

  if (teacherError || !teacher) {
    throw new Error("Cadastro de professor não encontrado para este usuário.");
  }

  let contentUrl: string | null = null;

  // 3. Upload do arquivo para o Storage (se houver)
  if (fileUriOrBlob && formData.attachmentName) {
    // 1. Identifica a extensão
    const fileExt =
      formData.attachmentName.split(".").pop()?.toLowerCase() || "";

    // 2. Valida formatos permitidos
    const allowedExtensions = ["pdf", "doc", "docx"];
    if (!allowedExtensions.includes(fileExt)) {
      throw new Error(
        "Formato de arquivo não permitido. Use apenas PDF ou Word.",
      );
    }

    const contentType =
      fileExt === "pdf" ? "application/pdf" : "application/msword";

    // 3. Sanitiza o nome: remove acentos, o caractere '+' e outros símbolos especiais
    const sanitizedName = formData.attachmentName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-zA-Z0-9._-]/g, "_"); // Troca +, espaços e símbolos por _

    const fileName = `${Date.now()}_${sanitizedName}`;
    const filePath = `${teacher.id}/${fileName}`;

    // 4. Prepara o corpo do upload como ArrayBuffer (garante que os bytes do PDF vão íntegros)
    let uploadBody: ArrayBuffer | Blob | FormData = fileUriOrBlob as any;

    if (typeof fileUriOrBlob === "string") {
      const response = await fetch(fileUriOrBlob);
      uploadBody = await response.arrayBuffer(); // <-- ArrayBuffer previne corrupção de binários no Expo/RN
    }

    const { error: uploadError } = await supabase.storage
      .from("exercicios")
      .upload(filePath, uploadBody, {
        contentType,
        upsert: true,
      });

    if (uploadError) throw new Error("Falha ao enviar o arquivo em anexo.");

    const { data: publicUrlData } = supabase.storage
      .from("exercicios")
      .getPublicUrl(filePath);

    contentUrl = publicUrlData.publicUrl;
  }

  // 4. Salvar na tabela 'activities'
  const { data: newActivity, error: dbError } = await supabase
    .from("activities")
    .insert([
      {
        teacher_id: teacher.id,
        class_id: classId,
        title: formData.title,
        description: formData.instruction || null,
        content_url: contentUrl,
        status: formData.status,
        published_at:
          formData.status === "published" ? new Date().toISOString() : null,
      },
    ])
    .select()
    .single();

  if (dbError)
    throw new Error("Falha ao salvar a atividade no banco de dados.");

  // 5. 🎯 NOVA LÓGICA: Se a atividade foi PUBLICADA, distribuir para os alunos na tabela 'submissions'
  if (formData.status === "published") {
    let studentsToAssign = targetStudentIds || [];

    // Se não passou uma lista específica de alunos, busca todos os alunos da turma
    if (studentsToAssign.length === 0) {
      const { data: classStudents, error: studentsError } = await supabase
        .from("students")
        .select("id")
        .eq("class_id", classId);

      if (studentsError) throw new Error("Erro ao buscar alunos da turma.");
      studentsToAssign = classStudents.map((s) => s.id);
    }

    // Cria as entradas pendentes na tabela 'submissions'
    if (studentsToAssign.length > 0) {
      const submissionsToInsert = studentsToAssign.map((studentId) => ({
        activity_id: newActivity.id,
        student_id: studentId,
        status: "not_submitted",
        submitted_at: new Date().toISOString(),
      }));

      const { error: submissionError } = await supabase
        .from("submissions")
        .insert(submissionsToInsert);

      if (submissionError) {
        console.error("Erro ao gerar submissions:", submissionError);
        throw new Error(
          "Atividade salva, mas erro ao atribuir para os alunos.",
        );
      }
    }
  }

  return newActivity;
}
