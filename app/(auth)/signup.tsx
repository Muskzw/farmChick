import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export default function SignupScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-6 justify-center">
                <Text className="text-3xl font-bold text-primary mb-2">Create Account</Text>
                <Text className="text-gray-600 mb-8">Start planning your first batch.</Text>

                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Farm Name" placeholder="Sunny Side Farm" />
                <Input label="Email" placeholder="farmer@example.com" keyboardType="email-address" />
                <Input label="Password" placeholder="********" secureTextEntry />

                <Button
                    label="Create Account"
                    className="mt-4"
                    onPress={() => router.replace('/(tabs)')}
                />

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-600">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text className="text-primary font-bold">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
