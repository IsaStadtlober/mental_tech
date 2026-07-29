const EMAILJS_SERVICE_ID = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY;

interface SendInviteParams {
  teacherEmail: string;
  teacherName: string;
  schoolName: string;
  activationUrl: string;
}

interface SendStudentAccessEmailParams {
  guardianEmail: string;
  schoolName: string;
  studentName: string;
  classCode: string;
  classPin: string;
  studentAccessCode: string;
}

export async function sendStudentAccessEmail({
  guardianEmail,
  schoolName,
  studentName,
  classCode,
  classPin,
  studentAccessCode,
}: SendStudentAccessEmailParams) {
  try {
    const cleanEmail = guardianEmail?.trim();

    if (!cleanEmail || !studentName?.trim() || !studentAccessCode?.trim()) {
      throw new Error(
        "Dados do responsável ou do aluno incompletos para envio de e-mail.",
      );
    }

    const templateId =
      process.env.EXPO_PUBLIC_EMAILJS_STUDENT_TEMPLATE_ID ||
      EMAILJS_TEMPLATE_ID;

    // Log para depurar se os IDs do .env e o e-mail estão chegando corretamente
    console.log(
      `[EmailJS] Enviando e-mail para: "${cleanEmail}" usandotemplate: "${templateId}"`,
    );

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: templateId,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: cleanEmail,
            guardian_email: cleanEmail,
            school_name: schoolName,
            student_name: studentName,
            class_code: classCode,
            class_pin: classPin,
            student_access_code: studentAccessCode,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro EmailJS (${response.status}): ${errorText}`);
    }

    console.log("E-mail de acesso do aluno enviado via EmailJS com sucesso!");
    return { success: true };
  } catch (error) {
    console.error("Erro no envio do e-mail do aluno via EmailJS:", error);
    throw error;
  }
}

export async function sendTeacherInvite({
  teacherEmail,
  teacherName,
  schoolName,
  activationUrl,
}: SendInviteParams) {
  try {
    const cleanEmail = teacherEmail?.trim();

    if (!cleanEmail || !teacherName?.trim()) {
      throw new Error("Dados do professor incompletos para envio de e-mail.");
    }

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: cleanEmail,
            teacher_name: teacherName,
            school_name: schoolName,
            activation_url: activationUrl,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro EmailJS (${response.status}): ${errorText}`);
    }

    console.log("E-mail de convite enviado via EmailJS com sucesso!");
    return { success: true };
  } catch (error) {
    console.error("Erro no envio do e-mail via EmailJS:", error);
    throw error;
  }
}
