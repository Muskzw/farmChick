import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import GlassCard from '../../components/GlassCard';
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

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <View className="flex-1 bg-background-dark">
            <LinearGradient
                colors={['#064E3B', '#020617']}
                className="absolute inset-0"
            />
            <SafeAreaView className="flex-1 justify-center px-6">
                <View className="mb-10 items-center">
                    <View className="w-20 h-20 bg-primary-500/20 rounded-full items-center justify-center mb-6 border border-primary-500/30">
                        <Text className="text-4xl">🐣</Text>
                    </View>
                    <Text className="text-4xl font-bold text-white text-center mb-2 tracking-tight">Welcome Back</Text>
                    <Text className="text-text-muted text-center text-lg">Sign in to manage your farm</Text>
                </View>

                <GlassCard variant="dark" intensity="high" className="p-6">
                    {/* <Input
                        label="Email Address"
                        placeholder="farmer@example.com"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        icon="mail-outline"
                    /> */}
                    <View className="mb-4 bg-slate-800 p-4 rounded-xl">
                        <Text className="text-white mb-2">Email</Text>
                        <TextInput
                            className="text-white"
                            placeholder="Email"
                            placeholderTextColor="#64748B"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* <Input
                        label="Password"
                        placeholder="••••••••"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        icon="lock-closed-outline"
                    /> */}
                    <View className="mb-4 bg-slate-800 p-4 rounded-xl">
                        <Text className="text-white mb-2">Password</Text>
                        <TextInput
                            className="text-white"
                            placeholder="Password"
                            placeholderTextColor="#64748B"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <Button
                        label={loading ? "Signing in..." : "Sign In"}
                        className="mt-6"
                        onPress={signInWithEmail}
                        loading={loading}
                        variant="primary"
                        size="lg"
                    />
                </GlassCard>

                <View className="flex-row justify-center mt-8">
                    <Text className="text-text-muted">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                        <Text className="text-primary-400 font-bold">Create Account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
