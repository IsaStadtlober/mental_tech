import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';
import { OptionButtonProps } from '../../types/roles';

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