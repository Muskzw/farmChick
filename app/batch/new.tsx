import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export default function NewBatchScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6">Start New Batch</Text>

                <Input label="Batch Name" placeholder="e.g., Batch #26" />
                <Input label="Breed" placeholder="e.g., Cobb 500" />
                <Input label="Number of Chicks" placeholder="e.g., 1000" keyboardType="numeric" />
                <Input label="Arrival Date" placeholder="YYYY-MM-DD" />
                <Input label="Hatchery" placeholder="Supplier Name" />

                <Button
                    label="Create Batch"
                    className="mt-4"
                    onPress={() => router.back()}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
