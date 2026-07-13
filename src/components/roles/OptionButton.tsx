import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';
import { OptionButtonProps } from '../../types/components';

export function OptionButton({ children, onPress }: OptionButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.optionButton}
            activeOpacity={0.75}
        >
            <Text style={styles.optionText}>{children}</Text>
            <Text style={styles.optionArrow}>→</Text>
        </TouchableOpacity>
    );
}