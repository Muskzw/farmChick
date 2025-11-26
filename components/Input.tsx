import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
    return (
        <View className="flex flex-col gap-2 mb-4">
            {label && <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</Text>}
            <TextInput
                className={`px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-primary ${className}`}
                placeholderTextColor="#9CA3AF"
                {...props}
            />
        </View>
    );
}
