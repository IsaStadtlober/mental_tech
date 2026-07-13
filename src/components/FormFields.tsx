import { useState } from 'react';
import { KeyboardTypeOptions, Text, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

import { useFadeUp } from '../animations/animations';
import { inputPresets } from '../constants/inputPresets';
import { theme } from '../constants/theme';
import { styles } from '../styles/styles';

interface FormFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  preset?: 'educator' | 'student';
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
    <Animated.View style={[{ gap: 6 }, wrapStyle]}>
      {!!label && (
        <Text
          style={[
            styles.inputLabel,
            {
              fontSize: p.labelSize,
            },
          ]}
        >
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
            backgroundColor: isFocused ? '#FFFFFF' : p.bg,
            borderColor: isFocused || value
              ? error
                ? theme.danger
                : p.activeBorder
              : 'transparent',
            textAlign: center ? 'center' : 'left',
            opacity: editable ? 1 : 0.7,
          },
        ]}
      />
    </Animated.View>
  );
}

interface PasswordFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: boolean;
}

export function PasswordField({
  label,
  value,
  onChangeText,
  placeholder,
  error = false,
}: PasswordFieldProps) {
  const p = inputPresets.educator;
  const wrapStyle = useFadeUp(120, 380);

  return (
    <Animated.View style={[{ gap: 6 }, wrapStyle]}>
      {!!label && (
        <Text
          style={[
            styles.inputLabel,
            {
              fontSize: p.labelSize,
            },
          ]}
        >
          {label}
        </Text>
      )}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        style={[
          styles.input,
          {
            paddingVertical: p.py,
            paddingHorizontal: p.px,
            fontSize: p.fontSize,
            borderRadius: p.radius,
            backgroundColor: p.bg,
            borderColor: value
              ? error
                ? theme.danger
                : p.activeBorder
              : 'transparent',
          },
        ]}
      />
    </Animated.View>
  );
}