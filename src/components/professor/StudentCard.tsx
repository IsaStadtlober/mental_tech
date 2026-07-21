import { STUDENT_CARD_MESSAGES } from '@/constants/professor/studentCard';
import { studentCardStyles } from '@/styles/professor/studentCard';
import type { StudentCardProps } from '@/types/professor/studentCard';
import { getStudentCardCorrectionsLabel, getStudentCardStatusConfig } from '@/utils/professor/studentCard';
import { Pressable, Text, View } from 'react-native';
import StatusChip from './StatusChip';

export default function StudentCard({
  student,
  onPress,
  compact = false,
  style,
}: StudentCardProps) {
  const selectedStatus = getStudentCardStatusConfig(student);

  const initials =
    student.initials ??
    student.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();

  const correctionsLabel = getStudentCardCorrectionsLabel(student.pendingCorrections ?? 0);

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${student.name}, ${selectedStatus.label}`}
      accessibilityHint={onPress ? STUDENT_CARD_MESSAGES.openProfileHint : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [studentCardStyles.pressable, { opacity: pressed ? 0.86 : 1 }, style]}
    >
      <View style={[studentCardStyles.contentRow, compact ? studentCardStyles.contentRowCompact : undefined]}>
        <View style={studentCardStyles.mainInfo}>
          <View style={studentCardStyles.avatar}>
            <Text style={studentCardStyles.avatarText}>{initials}</Text>
          </View>

          <View style={studentCardStyles.textContainer}>
            <Text numberOfLines={1} style={studentCardStyles.name}>
              {student.name}
            </Text>

            <Text numberOfLines={1} style={studentCardStyles.subtitle}>
              {student.className}
              {student.lastActivityAt ? ` · Última atividade: ${student.lastActivityAt}` : ''}
            </Text>
          </View>
        </View>

        <View style={studentCardStyles.metaRow}>
          <StatusChip label={selectedStatus.label} tone={selectedStatus.tone} dot />

          {!!student.pendingCorrections && <StatusChip label={correctionsLabel} tone="info" />}

          <Text style={studentCardStyles.metaText}>
            {student.pendingActivities}{' '}
            {student.pendingActivities === 1 ? STUDENT_CARD_MESSAGES.pendingLabelSingular : STUDENT_CARD_MESSAGES.pendingLabelPlural}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}