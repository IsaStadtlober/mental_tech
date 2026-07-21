export interface EducatorProfileData {
    name: string;
    email: string;
}

export interface EducatorProfileScreenProps {
    name: string;
    email: string;
    onBack: () => void;
    onSave: (data: EducatorProfileData) => void;
}

export interface PreferenceRowProps {
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export interface PasswordInputProps {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder: string;
    largeText: boolean;
}