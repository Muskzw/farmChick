import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import GlassCard from '../../components/GlassCard';
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
        const redirectTo = Linking.createURL('/(auth)/login');
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: redirectTo,
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
        <View className="flex-1 bg-background-dark">
            <LinearGradient
                colors={['#064E3B', '#020617']}
                className="absolute inset-0"
            />
            <SafeAreaView className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 py-10">
                    <View className="mb-8 items-center">
                        <View className="w-16 h-16 bg-primary-500/20 rounded-full items-center justify-center mb-4 border border-primary-500/30">
                            <Text className="text-3xl">🌱</Text>
                        </View>
                        <Text className="text-3xl font-bold text-white text-center mb-2 tracking-tight">Create Account</Text>
                        <Text className="text-text-muted text-center text-lg">Start your journey with FarmChick</Text>
                    </View>

                    <GlassCard variant="dark" intensity="high" className="p-6">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={fullName}
                            onChangeText={setFullName}
                            icon="person-outline"
                        />
                        <Input
                            label="Farm Name"
                            placeholder="Sunny Side Farm"
                            value={farmName}
                            onChangeText={setFarmName}
                            icon="leaf-outline"
                        />
                        <Input
                            label="Email Address"
                            placeholder="farmer@example.com"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            icon="mail-outline"
                        />
                        <Input
                            label="Password"
                            placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            icon="lock-closed-outline"
                        />

                        <Button
                            label={loading ? "Creating Account..." : "Sign Up"}
                            className="mt-6"
                            onPress={signUpWithEmail}
                            loading={loading}
                            variant="primary"
                            size="lg"
                        />
                    </GlassCard>

                    <View className="flex-row justify-center mt-8 mb-10">
                        <Text className="text-text-muted">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                            <Text className="text-primary-400 font-bold">Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
