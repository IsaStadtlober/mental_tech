import { KeyboardTypeOptions } from 'react-native';

export interface FormFieldProps {
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

export interface PasswordFieldProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: boolean;
}