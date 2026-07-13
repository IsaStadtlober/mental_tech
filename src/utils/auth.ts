// Transforma o código da turma em letras maiúsculas e remove espaços extras.
export const formatClassCode = (code: string): string => {
    return code.toUpperCase().trim();
};

// Remove qualquer caractere que não seja número e limita o PIN a 4 dígitos.
export const formatPin = (pin: string): string => {
    return pin.replace(/[^0-9]/g, '').slice(0, 4);
};

// Valida se o formato do e-mail é válido.
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};