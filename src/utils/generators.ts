// Função que cria o Código de Turma.
export function generateClassCode(length: number = 6): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
}

// Gera o PIN de 4 dígitos.
export function generateClassPin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Gera um código de acesso único para o aluno/responsável.
export function generateStudentAccessCode(length: number = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let accessCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    accessCode += chars[randomIndex];
  }
  return accessCode;
}
