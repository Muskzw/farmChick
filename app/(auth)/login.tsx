import { router } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert(error.message);
        } else {
            router.replace('/(tabs)');
        }
        setLoading(false);
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-6 justify-center">
                <Text className="text-3xl font-bold text-primary mb-8">Welcome Back</Text>

                <Input
                    label="Email"
                    placeholder="farmer@example.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <Input
                    label="Password"
                    placeholder="********"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Button
                    label={loading ? "Loading..." : "Login"}
                    className="mt-4"
                    onPress={signInWithEmail}
                    disabled={loading}
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
