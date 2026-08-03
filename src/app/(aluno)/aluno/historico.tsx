import { useRouter } from 'expo-router';
import { CheckCircle2, Clock3, RotateCcw } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HistoryEmptyState } from '../../../components/aluno/HistoryEmptyState';
import { StudentScreenShell } from '../../../components/aluno/StudentScreenShell';
import { HISTORY_FILTERS, SAMPLE_RECENT_ACTIVITIES } from '../../../constants/aluno/history';
import { theme } from '../../../constants/theme';
import { useStudentPrototype } from '../../../hooks/aluno/useStudentPrototype';
import { alunoStyles as s } from '../../../styles/aluno';
import type { HistoryFilter, RecentActivity } from '../../../types/aluno';
import {
  buildHistoryEntries,
  filterActivitiesByStatus,
  getActivityStatusLabel,
} from '../../../utils/aluno/history';
export default function HistoryRoute() {
  const router = useRouter();
  const onBack = () => router.back();
  const { mission } = useStudentPrototype();
  const [filter, setFilter] = useState<HistoryFilter>('all');
  const all = useMemo<RecentActivity[]>(
    () => buildHistoryEntries(mission, SAMPLE_RECENT_ACTIVITIES),
    [mission]
  );
  const list = filterActivitiesByStatus(all, filter);
  return (
    <StudentScreenShell onBack={onBack}>
      <Text style={s.screenTitle}>Histórico de atividades</Text>
      <Text style={s.screenSubtitle}>
        Acompanhe suas missões e veja cada conquista.
      </Text>
      <View style={s.historyFilters}>
        {HISTORY_FILTERS.map(([id, label]) => (
          <TouchableOpacity
            key={id}
            onPress={() => setFilter(id)}
            style={[s.historyFilter, filter === id && s.historyFilterActive]}
          >
            <Text
              style={[
                s.historyFilterText,
                filter === id && s.historyFilterTextActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {list.length > 0 ? (
        list.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))
      ) : (
        <HistoryEmptyState filter={filter} onShowAll={() => setFilter('all')} />
      )}
    </StudentScreenShell>
  );
}
function ActivityRow({ activity: a }: { activity: RecentActivity }) {
  const Icon =
    a.status === 'approved'
      ? CheckCircle2
      : a.status === 'revision'
      ? RotateCcw
      : Clock3;
  const label = getActivityStatusLabel(a.status, a.grade);
  return (
    <View
      style={[
        s.studentListCard,
        a.status === 'revision' && s.historyCardRevision,
      ]}
    >
      <View
        style={[
          s.historyStatusIcon,
          a.status === 'revision' && s.historyStatusIconRevision,
        ]}
      >
        <Icon
          size={19}
          color={a.status === 'revision' ? theme.warning : theme.primary}
        />
      </View>
      <View style={s.contentFlex}>
        <Text style={s.studentListTitle}>{a.title}</Text>
        <Text style={s.studentListMeta}>
          {label} · {a.dateLabel}
        </Text>
      </View>
    </View>
  );
}