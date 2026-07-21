import { borderRadius, fonts, theme } from '@/constants/theme';
import {
    Pressable,
    StyleProp,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import type { Student } from '../../types/professor';
import StatusChip, {
    StatusChipTone,
} from './StatusChip';

export interface StudentCardProps {
  student: Student;
  onPress?: () => void;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function StudentCard({
  student,
  onPress,
  compact = false,
  style,
}: StudentCardProps) {
  const statusConfig: Record<
    Student['engagementStatus'],
    {
      label: string;
      tone: StatusChipTone;
    }
  > = {
    engaged: {
      label: 'Em dia',
      tone: 'success',
    },

    attention: {
      label: 'Precisa de atenção',
      tone: 'warning',
    },

    inactive: {
      label: 'Sem atividade há +7 dias',
      tone: 'danger',
    },
  };

  const selectedStatus =
    statusConfig[student.engagementStatus];

  const initials =
    student.initials ??
    student.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();

  const correctionsLabel =
    student.pendingCorrections === 1
      ? '1 correção'
      : `${student.pendingCorrections} correções`;

  return (
    <Pressable
      accessibilityRole={
        onPress ? 'button' : undefined
      }
      accessibilityLabel={`${student.name}, ${selectedStatus.label}`}
      accessibilityHint={
        onPress
          ? 'Abre o perfil do aluno'
          : undefined
      }
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        {
          padding: 16,

          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: borderRadius.xl,

          backgroundColor: theme.card,

          opacity: pressed ? 0.86 : 1,
        },


        style,
      ]}
    >
      <View
        style={{
          flexDirection: compact
            ? 'column'
            : 'row',

          alignItems: compact
            ? 'stretch'
            : 'center',

          gap: 14,
        }}
      >
        <View
          style={{
            flex: 1,
            minWidth: 0,

            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,

              flexShrink: 0,

              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: 14,

              backgroundColor:
                theme.bgSoft,
            }}
          >
            <Text
              style={{
                color: theme.primary,

                fontFamily:
                  fonts.headlineBold,

                fontSize: 14,
              }}
            >
              {initials}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: theme.textDark,

                fontFamily:
                  fonts.headlineSemibold,

                fontSize: 15,
              }}
            >
              {student.name}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                marginTop: 3,

                color:
                  theme.textMuted,

                fontFamily:
                  fonts.bodyRegular,

                fontSize: 12,
              }}
            >
              {student.className}

              {student.lastActivityAt
                ? ` · Última atividade: ${student.lastActivityAt}`
                : ''}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <StatusChip
            label={selectedStatus.label}
            tone={selectedStatus.tone}
            dot
          />

          {!!student.pendingCorrections && (
            <StatusChip
              label={correctionsLabel}
              tone="info"
            />
          )}

          <Text
            style={{
              color: theme.textMuted,

              fontFamily:
                fonts.bodyRegular,

              fontSize: 12,
            }}
          >
            {student.pendingActivities}{' '}
            {student.pendingActivities === 1
              ? 'pendente'
              : 'pendentes'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}