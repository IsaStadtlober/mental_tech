// Transforma o código da turma em letras maiúsculas e remove espaços extras.
export const formatClassCode = (code: string): string => {
  return code.toUpperCase().trim();
};

// Remove qualquer caractere que não seja número e limita o PIN a 4 dígitos.
export const formatPin = (pin: string): string => {
  return pin.replace(/[^0-9]/g, "").slice(0, 4);
};

// Valida se o formato do e-mail é válido.
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const formatCpf = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

export const formatBirthDate = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

export const sanitizeDigits = (value: string): string => {
  return value.replace(/\D/g, "");
};

// Verifica se o CNPJ possui 14 dígitos somente numéricos.
export const isValidCnpj = (cnpj: string): boolean => {
  return /^\d{14}$/.test(sanitizeDigits(cnpj));
};

export const isValidCep = (cep: string): boolean => {
  return /^\d{8}$/.test(sanitizeDigits(cep));
};

export const isValidPhone = (phone: string): boolean => {
  const sanitized = sanitizeDigits(phone);
  return /^\d{10}$|^\d{11}$/.test(sanitized);
};

export async function fetchCnpjData(cnpj: string) {
  const sanitizedCnpj = sanitizeDigits(cnpj);
  if (!isValidCnpj(sanitizedCnpj)) return null;

  const response = await fetch(
    `https://brasilapi.com.br/api/cnpj/v1/${sanitizedCnpj}`,
  );
  if (!response.ok) return null;
  const data = await response.json();

  return {
    legal_name: data.razao_social || data.nome || data.nome_fantasia || "",
  };
}

export async function fetchAddressByCep(cep: string) {
  const sanitizedCep = sanitizeDigits(cep);
  if (!isValidCep(sanitizedCep)) return null;

  const response = await fetch(
    `https://viacep.com.br/ws/${sanitizedCep}/json/`,
  );
  if (!response.ok) return null;
  const data = await response.json();
  if (data.erro) return null;

  return {
    street: data.logradouro || "",
    neighborhood: data.bairro || "",
    city: data.localidade || "",
    state: data.uf || "",
  };
}
