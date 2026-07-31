import { CheckCircle2, Gift } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../constants/theme';
import { alunoStyles as s } from '../../styles/aluno/aluno';

export interface StudentEmptyStateProps {
  onInventory?: () => void;
  title?: string;
  description?: string;
}
export function StudentEmptyState({
  onInventory,
  title = 'Você está em dia, explorador!',
  description = 'Enquanto uma nova missão não chega, que tal personalizar seu avatar?',
}: StudentEmptyStateProps) {
  return (
    <View style={s.trailEmptyCard}>
      <View style={s.trailEmptyIcon}>
        <CheckCircle2 size={27} color={theme.primary} />
      </View>
      <View style={s.contentFlex}>
        <Text style={s.trailEmptyTitle}>{title}</Text>
        <Text style={s.trailEmptyText}>{description}</Text>
        {onInventory && (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onInventory}
            style={s.trailEmptyAction}
          >
            <Gift size={14} color={theme.primary} />
            <Text style={s.trailEmptyActionText}>Ver meu inventário</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}