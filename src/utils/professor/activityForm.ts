import type { ActivityFormAudience } from '@/types/professor/activityForm';

// Contagem de alunos.
export function getActivityFormStudentSelectionLabel(count: number): string {
  if (count === 0) {
    return 'Selecione pelo menos um aluno.';
  }

  if (count === 1) {
    return '1 aluno selecionado';
  }

  return `${count} alunos selecionados`;
}

export function isActivityFormAudienceSpecific(audience: ActivityFormAudience): boolean {
  return audience === 'Alunos específicos';
}

// ==========================================
// 📅 MÁSCARAS E CONVERSÕES DE DATA
// ==========================================

/**
 * Aplica a máscara DD/MM/AAAA dinamicamente enquanto o professor digita
 */
export function formatDateMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/**
 * Converte data em texto "DD/MM/AAAA" para o formato ISO "YYYY-MM-DD" aceito pelo Supabase
 */
export function parseDateToISO(dateString?: string | null): string | null {
  if (!dateString || dateString.trim().length !== 10) return null;

  const [day, month, year] = dateString.split('/');
  if (!day || !month || !year) return null;

  // Retorna no formato YYYY-MM-DD (fim do dia de entrega: 23:59:59)
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T23:59:59.000Z`;
}

/**
 * Converte data ISO ("YYYY-MM-DD" ou Date) de volta para o formato de exibição "DD/MM/AAAA"
 */
export function formatISOToDateMask(isoString?: string | null): string {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch {
    return isoString;
  }
}

/**
 * Utilitário para o TypeScript calcular se a entrega da atividade está no prazo ou atrasada
 */
export function getDueDateStatus(dueDateISO?: string | null): {
  isOverdue: boolean;
  label: string;
} {
  if (!dueDateISO) {
    return { isOverdue: false, label: 'Sem data limite' };
  }

  const now = new Date();
  const due = new Date(dueDateISO);

  if (isNaN(due.getTime())) {
    return { isOverdue: false, label: 'Data inválida' };
  }

  const isOverdue = now > due;

  return {
    isOverdue,
    label: isOverdue ? 'Atrasado' : 'No prazo',
  };
}