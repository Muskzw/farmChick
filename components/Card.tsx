import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
    className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <View
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 ${className}`}
            {...props}
        >
            {children}
        </View>
    );
}
