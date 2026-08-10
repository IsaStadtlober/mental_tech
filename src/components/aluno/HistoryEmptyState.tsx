import { CheckCircle2, Sparkles } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { HISTORY_EMPTY_COPY } from '../../constants/aluno/history';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno';
import type { HistoryFilter } from '../../types/aluno';

export function HistoryEmptyState({
  filter,
  onShowAll,
}: {
  filter: HistoryFilter;
  onShowAll(): void;
}) {
  const copy = HISTORY_EMPTY_COPY[filter];
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