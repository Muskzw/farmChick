import { router } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { supabase } from '../../lib/supabase';

export default function SignupScreen() {
    const [fullName, setFullName] = React.useState('');
    const [farmName, setFarmName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    farm_name: farmName,
                }
            }
        });

        if (error) {
            Alert.alert(error.message);
        } else {
            Alert.alert('Success', 'Please check your inbox for email verification!');
            router.replace('/(auth)/login');
        }
        setLoading(false);
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-6 justify-center">
                <Text className="text-3xl font-bold text-primary mb-2">Create Account</Text>
                <Text className="text-gray-600 mb-8">Start planning your first batch.</Text>

                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <Input
                    label="Farm Name"
                    placeholder="Sunny Side Farm"
                    value={farmName}
                    onChangeText={setFarmName}
                />
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
                    label={loading ? "Loading..." : "Create Account"}
                    className="mt-4"
                    onPress={signUpWithEmail}
                    disabled={loading}
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
