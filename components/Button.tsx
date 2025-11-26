import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary' | 'outline';
    label: string;
    textClassName?: string;
}

export function Button({ variant = 'primary', label, className, textClassName, ...props }: ButtonProps) {
    const baseStyle = "px-4 py-3 rounded-lg flex items-center justify-center";
    const variants = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        outline: "border-2 border-primary bg-transparent",
    };
    const textVariants = {
        primary: "text-white font-bold text-lg",
        secondary: "text-white font-bold text-lg",
        outline: "text-primary font-bold text-lg",
    };

    return (
        <TouchableOpacity
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            <Text className={`${textVariants[variant]} ${textClassName}`}>{label}</Text>
        </TouchableOpacity>
    );
}
