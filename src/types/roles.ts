import React from 'react';

export type RoleType = 'student' | 'educator';
export type ChosenRole = 'aluno' | 'educador' | null;

export interface RoleMiniIconProps {
    type: RoleType;
    active: boolean;
}

export interface RoleChoiceCardProps {
    type: RoleType;
    active: boolean;
    title: string;
    description: string;
    onPress: () => void;
    delay?: number;
}

export interface OptionButtonProps {
    children: React.ReactNode;
    onPress: () => void;
}