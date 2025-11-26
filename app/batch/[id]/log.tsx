import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

export default function DailyLogScreen() {
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-gray-900 mb-2">Daily Log</Text>
                <Text className="text-gray-500 mb-6">Batch #{id} • Day 15</Text>

                <Input label="Mortality (Deaths)" placeholder="0" keyboardType="numeric" />
                <Input label="Culls" placeholder="0" keyboardType="numeric" />
                <Input label="Feed Consumed (Bags)" placeholder="0" keyboardType="numeric" />
                <Input label="Average Weight (g)" placeholder="0" keyboardType="numeric" />
                <Input label="Water Intake (L)" placeholder="0" keyboardType="numeric" />

                <Input label="Notes" placeholder="Any observations..." multiline numberOfLines={3} className="h-24 text-top" />

                <Button
                    label="Save Log"
                    className="mt-4"
                    onPress={() => router.back()}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
