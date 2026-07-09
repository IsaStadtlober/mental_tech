import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    TextInput,
    KeyboardTypeOptions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { theme, fonts, inputPresets } from '@/constants/theme';
import { useFadeUp } from '@/hooks/useAnimations';

interface FormFieldProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    preset?: 'student' | 'educator';
    center?: boolean;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    maxLength?: number;
    editable?: boolean;
    error?: boolean;
}

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
        <Animated.View style={[styles.wrapper, wrapStyle]}>
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
                        borderRadius: p.radius,
                        backgroundColor: p.bg,
                        textAlign: center ? 'center' : 'left',
                        fontFamily: center ? fonts.headlineBold : fonts.bodyRegular,
                        borderColor: error
                            ? theme.danger
                            : isFocused
                                ? p.activeBorder
                                : theme.border,
                    },
                ]}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 6,
    },
    inputLabel: {
        fontFamily: fonts.bodyBold,
        color: theme.textMuted,
        paddingHorizontal: 4,
    },
    input: {
        width: '100%',
        borderWidth: 1.5,
        color: theme.textDark,
    },
});