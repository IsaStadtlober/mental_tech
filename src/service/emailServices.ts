const EMAILJS_SERVICE_ID = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY;

interface SendInviteParams {
  teacherEmail: string;
  teacherName: string;
  schoolName: string;
  activationUrl: string;
}

export async function sendTeacherInvite({
  teacherEmail,
  teacherName,
  schoolName,
  activationUrl,
}: SendInviteParams) {
  try {
    if (!teacherEmail || !teacherName) {
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
            to_email: teacherEmail,
            teacher_name: teacherName,
            school_name: schoolName,
            activation_url: activationUrl,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro EmailJS: ${errorText}`);
    }

    console.log("E-mail de convite enviado via EmailJS com sucesso!");
    return { success: true };
  } catch (error) {
    console.error("Erro no envio do e-mail via EmailJS:", error);
    throw error;
  }
}
