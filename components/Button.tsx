import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    label: string;
    textClassName?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    loading?: boolean;
}

export function Button({
    variant = 'primary',
    size = 'md',
    label,
    className,
    textClassName,
    icon,
    loading,
    ...props
}: ButtonProps) {
    const baseStyles = "flex-row items-center justify-center rounded-xl shadow-sm";

    const variants = {
        primary: "bg-primary-500 active:bg-primary-600 border border-transparent",
        secondary: "bg-secondary-500 active:bg-secondary-600 border border-transparent",
        outline: "bg-transparent border border-primary-500 active:bg-primary-500/10",
        ghost: "bg-transparent active:bg-surface-light/10",
    };

    const sizes = {
        sm: "py-2 px-4",
        md: "py-3 px-6",
        lg: "py-4 px-8",
    };

    const textVariants = {
        primary: "text-white font-bold tracking-wide",
        secondary: "text-white font-bold tracking-wide",
        outline: "text-primary-500 font-bold tracking-wide",
        ghost: "text-text-muted font-medium hover:text-text-DEFAULT",
    };

    const textSizes = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };

    return (
        <TouchableOpacity
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${props.disabled || loading ? 'opacity-50' : ''}`}
            activeOpacity={0.8}
            disabled={props.disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#10B981' : 'white'} />
            ) : (
                <>
                    {icon && <Ionicons name={icon} size={20} color={variant === 'outline' ? '#10B981' : 'white'} style={{ marginRight: 8 }} />}
                    <Text className={`${textVariants[variant]} ${textSizes[size]} ${textClassName}`}>
                        {label}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}
