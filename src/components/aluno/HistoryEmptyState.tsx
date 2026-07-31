import { CheckCircle2, Sparkles } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno/aluno';
import type { HistoryFilter } from '../../types/aluno';

const EMPTY_COPY: Record<
  HistoryFilter,
  { title: string; description: string }
> = {
  all: {
    title: 'Sua jornada está começando',
    description: 'Quando você participar de uma missão, ela aparecerá aqui.',
  },
  pending: {
    title: 'Nenhuma missão nova',
    description: 'Quando uma nova aventura chegar, ela aparecerá aqui.',
  },
  inProgress: {
    title: 'Nenhuma missão em andamento',
    description: 'Você terminou tudo por enquanto. Muito bem!',
  },
  awaitingReview: {
    title: 'Nada aguardando correção',
    description: 'Quando você enviar uma resposta, poderá acompanhar por aqui.',
  },
  revision: {
    title: 'Tudo certo por aqui!',
    description: 'Você não tem nenhuma correção pendente.',
  },
  approved: {
    title: 'Nenhuma missão concluída ainda',
    description: 'Sua primeira conquista vai aparecer aqui em breve.',
  },
};

export function HistoryEmptyState({
  filter,
  onShowAll,
}: {
  filter: HistoryFilter;
  onShowAll(): void;
}) {
  const copy = EMPTY_COPY[filter];
  const Icon = filter === 'revision' ? CheckCircle2 : Sparkles;

  return (
    <View style={s.historyEmptyState}>
      <View style={s.historyEmptyIcon}>
        <Icon size={29} color={theme.primary} />
      </View>
      <Text style={s.historyEmptyTitle}>{copy.title}</Text>
      <Text style={s.historyEmptyText}>{copy.description}</Text>
      {filter !== 'all' && (
        <TouchableOpacity onPress={onShowAll} style={s.historyEmptyAction}>
          <Text style={s.historyEmptyActionText}>Ver todas as atividades</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}