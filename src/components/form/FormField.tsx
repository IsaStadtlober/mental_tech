import { useState } from 'react';
import { Text, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

import { inputPresets, theme } from '../../constants/theme';
import { useFadeUp } from '../../hooks/useAnimations';
import { styles } from '../../styles';
import { FormFieldProps } from '../../types/components';

export function FormField({
    label,
    value,
    onChangeText,
    placeholder,
    preset = 'educator',
    center = false,
    keyboardType,
    secureTextEntry,
    maxLength,
    editable = true,
    error = false,
}: FormFieldProps) {
    const [isFocused, setIsFocused] = useState(false);
    const p = inputPresets[preset];
    const wrapStyle = useFadeUp(80, 380);

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
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                maxLength={maxLength}
                editable={editable}
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
                        textAlign: center ? 'center' : 'left',
                        opacity: editable ? 1 : 0.7,
                    },
                ]}
            />
        </Animated.View>
    );
}