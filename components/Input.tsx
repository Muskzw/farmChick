import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

export function Input({ label, error, icon, className, ...props }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="flex flex-col gap-2 mb-4">
            {label && <Text className="text-sm font-medium text-text-muted ml-1">{label}</Text>}
            <View
                className={`
                    flex-row items-center bg-surface-DEFAULT/50 border rounded-xl px-4 py-3
                    ${isFocused ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-border'}
                    ${error ? 'border-error' : ''}
                `}
            >
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={isFocused ? '#10B981' : '#94A3B8'}
                        style={{ marginRight: 10 }}
                    />
                )}
                <TextInput
                    className={`flex-1 text-text-DEFAULT text-base ${className}`}
                    placeholderTextColor="#64748B"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
            </View>
            {error && <Text className="text-xs text-error ml-1">{error}</Text>}
        </View>
    );
}
