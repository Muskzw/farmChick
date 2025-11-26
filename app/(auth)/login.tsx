import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export default function LoginScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-6 justify-center">
                <Text className="text-3xl font-bold text-primary mb-8">Welcome Back</Text>

                <Input label="Email" placeholder="farmer@example.com" keyboardType="email-address" />
                <Input label="Password" placeholder="********" secureTextEntry />

                <Button
                    label="Login"
                    className="mt-4"
                    onPress={() => router.replace('/(tabs)')}
                />

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-600">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                        <Text className="text-primary font-bold">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
