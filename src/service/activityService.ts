import { supabase } from '@/service/supabase';
import type { ActivityFormData } from '@/types/professor/activityForm';

interface SaveActivityOptions {
  formData: ActivityFormData;
  classId: string; // UUID da turma selecionada
  fileUriOrBlob?: string | Blob; // URI do Expo (file://...) ou Blob
}

export async function saveActivityToSupabase({
  formData,
  classId,
  fileUriOrBlob,
}: SaveActivityOptions) {
  // 1. Obter o usuário logado no Supabase
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Usuário não está autenticado.');
  }

  // 2. Buscar o ID do professor usando 'profile_id' (da sua tabela teachers)
  const { data: teacher, error: teacherError } = await supabase
    .from('teachers')
    .select('id')
    .eq('profile_id', user.id) // 👈 Atualizado para profile_id conforme o seu Schema
    .single();

  if (teacherError || !teacher) {
    console.error('Erro ao buscar cadastro de professor:', teacherError);
    throw new Error('Cadastro de professor não encontrado para este usuário.');
  }

  let contentUrl: string | null = null;

  // 3. Upload do arquivo para o bucket 'exercicios' (se houver anexo)
  if (fileUriOrBlob && formData.attachmentName) {
    try {
      const fileExt = formData.attachmentType === 'pdf' ? 'pdf' : 'doc';
      const fileName = `${Date.now()}_${formData.attachmentName.replace(/\s+/g, '_')}.${fileExt}`;
      const filePath = `${teacher.id}/${fileName}`;

      let uploadBody: any = fileUriOrBlob;

      // Se for URI local do Expo/React Native (file://...)
      if (typeof fileUriOrBlob === 'string' && fileUriOrBlob.startsWith('file://')) {
        const response = await fetch(fileUriOrBlob);
        uploadBody = await response.blob();
      }

      const { error: uploadError } = await supabase.storage
        .from('exercicios')
        .upload(filePath, uploadBody, {
          contentType: formData.attachmentType === 'pdf' ? 'application/pdf' : 'application/msword',
          upsert: true,
        });

      if (uploadError) {
        console.error('Erro no upload do Storage:', uploadError);
        throw new Error('Falha ao enviar o arquivo em anexo.');
      }

      // Obtém a URL pública do arquivo
      const { data: publicUrlData } = supabase.storage
        .from('exercicios')
        .getPublicUrl(filePath);

      contentUrl = publicUrlData.publicUrl;
    } catch (err) {
      console.error('Erro ao processar anexo:', err);
      throw err;
    }
  }

  // 4. Inserção na tabela 'activities'
  const { data: newActivity, error: dbError } = await supabase
    .from('activities')
    .insert([
      {
        teacher_id: teacher.id,                    // UUID do professor
        class_id: classId,                         // UUID da turma
        title: formData.title,                     // Título da atividade
        description: formData.instruction || null, // Descrição/Instrução
        content_url: contentUrl,                   // URL pública do anexo
        status: formData.status,                   // 'draft' ou 'published'
        published_at: formData.status === 'published' ? new Date().toISOString() : null,
      },
    ])
    .select()
    .single();

  if (dbError) {
    console.error('Erro ao inserir atividade no banco:', dbError);
    throw new Error('Falha ao salvar a atividade no banco de dados.');
  }

  return newActivity;
}