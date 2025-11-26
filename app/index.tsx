import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';

export default function LandingScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-6 justify-center items-center">
                <View className="mb-10 items-center">
                    <Text className="text-4xl font-bold text-primary mb-2">FarmChick</Text>
                    <Text className="text-lg text-gray-600 text-center">
                        Master your broiler farm from planning to profit.
                    </Text>
                </View>

                <View className="w-full gap-4">
                    <Button
                        label="Get Started"
                        onPress={() => router.push('/(auth)/signup')}
                    />
                    <Button
                        label="I have an account"
                        variant="outline"
                        onPress={() => router.push('/(auth)/login')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
