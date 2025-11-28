import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
    className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <View
            className={`card ${className}`}
            {...props}
        >
            {children}
        </View>
    );
}
