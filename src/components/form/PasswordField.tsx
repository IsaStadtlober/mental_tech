import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

import { inputPresets } from '../../constants/inputPresets';
import { theme } from '../../constants/theme';
import { useFadeUp } from '../../hooks/useAnimations';
import { styles } from '../../styles/styles';
import { PasswordFieldProps } from '../../types/formFields';

export function PasswordField({
    label,
    value,
    onChangeText,
    placeholder,
    error = false,
}: PasswordFieldProps) {
    const [isFocused, setIsFocused] = useState(false);
    const p = inputPresets.educator;
    const wrapStyle = useFadeUp(120, 380);

    return (
        <Animated.View style={[{ gap: 6 }, wrapStyle]}>
            {!!label && (
                <Text style={[styles.inputLabel, { fontSize: p.labelSize }]}>
                    {label}
                </Text>
            )}

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={[
                    styles.input,
                    {
                        paddingVertical: p.py,
                        paddingHorizontal: p.px,
                        fontSize: p.fontSize,
                        backgroundColor: p.bg,
                        borderRadius: p.radius,
                        borderColor: error
                            ? theme.danger
                            : isFocused
                                ? p.activeBorder
                                : 'transparent',
                        opacity: 1,
                    },
                ]}
            />
        </Animated.View>
    );
}