import { router } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, Text } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { supabase } from '../../lib/supabase';

export default function NewBatchScreen() {
    const [name, setName] = React.useState('');
    const [breed, setBreed] = React.useState('');
    const [count, setCount] = React.useState('');
    const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = React.useState(false);

    async function createBatch() {
        if (!name || !count || !date) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            Alert.alert('Error', 'You must be logged in to create a batch');
            setLoading(false);
            return;
        }

        const { error } = await supabase
            .from('batches')
            .insert({
                user_id: user.id,
                name,
                breed,
                initial_count: parseInt(count),
                start_date: date,
                status: 'active'
            });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Batch created successfully!');
            router.back();
        }
        setLoading(false);
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6">Start New Batch</Text>

                <Input
                    label="Batch Name"
                    placeholder="e.g., Batch #26"
                    value={name}
                    onChangeText={setName}
                />
                <Input
                    label="Breed"
                    placeholder="e.g., Cobb 500"
                    value={breed}
                    onChangeText={setBreed}
                />
                <Input
                    label="Number of Chicks"
                    placeholder="e.g., 1000"
                    keyboardType="numeric"
                    value={count}
                    onChangeText={setCount}
                />
                <Input
                    label="Arrival Date"
                    placeholder="YYYY-MM-DD"
                    value={date}
                    onChangeText={setDate}
                />
                <Input label="Hatchery" placeholder="Supplier Name" />

                <Button
                    label={loading ? "Creating..." : "Create Batch"}
                    className="mt-4"
                    onPress={createBatch}
                    disabled={loading}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
