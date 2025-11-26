import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function ProfileScreen() {
    const { session } = useAuth();
    const [fullName, setFullName] = useState('');
    const [farmName, setFarmName] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (session?.user) {
            getProfile();
        }
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, farm_name`)
                .eq('id', session.user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setFullName(data.full_name);
                setFarmName(data.farm_name);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile() {
        try {
            setSaving(true);
            if (!session?.user) throw new Error('No user on the session!');

            const updates = {
                id: session.user.id,
                full_name: fullName,
                farm_name: farmName,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }

            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setSaving(false);
        }
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert('Error', error.message);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6">My Profile</Text>

                <View className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <Input
                        label="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="John Doe"
                    />
                    <Input
                        label="Farm Name"
                        value={farmName}
                        onChangeText={setFarmName}
                        placeholder="Sunny Side Farm"
                    />

                    <Button
                        label={saving ? "Saving..." : "Save Changes"}
                        onPress={updateProfile}
                        disabled={loading || saving}
                        className="mt-2"
                    />
                </View>

                <Button
                    label="Sign Out"
                    variant="outline"
                    onPress={signOut}
                    className="border-red-500"
                    textClassName="text-red-500"
                />
            </ScrollView>
        </SafeAreaView>
    );
}
