import type { StyleProp, ViewStyle } from 'react-native';
import type { StatusChipTone } from './statusChip';
import type { Student } from './students';

export interface StudentCardProps {
    student: Student;
    onPress?: () => void;
    compact?: boolean;
    style?: StyleProp<ViewStyle>;
}

export interface StudentCardStatusConfig {
    label: string;
    tone: StatusChipTone;
}