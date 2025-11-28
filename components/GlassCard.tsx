import React from 'react';
import { View, ViewProps } from 'react-native';

interface GlassCardProps extends ViewProps {
    variant?: 'default' | 'dark' | 'light';
    intensity?: 'low' | 'medium' | 'high';
}

const GlassCard = ({
    children,
    style,
    variant = 'default',
    intensity = 'medium',
    className,
    ...props
}: GlassCardProps) => {

    // Base styles for glass effect
    const baseStyles = "rounded-2xl border border-white/10 overflow-hidden";

    // Variant styles
    const variantStyles = {
        default: "bg-surface-DEFAULT/30",
        dark: "bg-background-dark/50",
        light: "bg-white/10",
    };

    // Intensity (backdrop blur simulation via opacity layering if needed, 
    // but mostly handled by bg opacity in RN where backdrop-filter isn't always available)
    // For web we could add backdrop-blur classes if using nativewind with web support
    const intensityStyles = {
        low: "backdrop-blur-sm",
        medium: "backdrop-blur-md",
        high: "backdrop-blur-lg",
    };

    return (
        <View
            className={`${baseStyles} ${variantStyles[variant]} ${intensityStyles[intensity]} ${className}`}
            style={style}
            {...props}
        >
            {/* Optional: Add a subtle gradient overlay or noise texture here if desired */}
            <View className="p-4">
                {children}
            </View>
        </View>
    );
};

export default GlassCard;
