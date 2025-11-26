import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/Button';

export default function ChecklistScreen() {
    const { id } = useLocalSearchParams();
    const [items, setItems] = useState([
        { id: 1, text: 'Clean and disinfect the coop', checked: true },
        { id: 2, text: 'Check heating system (Brooders)', checked: true },
        { id: 3, text: 'Ensure fresh litter is spread', checked: false },
        { id: 4, text: 'Check water lines and drinkers', checked: false },
        { id: 5, text: 'Pre-heat the house (24h before)', checked: false },
        { id: 6, text: 'Prepare feed trays', checked: false },
    ]);

    const toggleItem = (itemId: number) => {
        setItems(items.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
        ));
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-gray-900 mb-2">Pre-arrival Checklist</Text>
                <Text className="text-gray-500 mb-6">Batch #{id} • 2 Days to Arrival</Text>

                <View className="gap-4">
                    {items.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            className="flex-row items-center p-4 bg-gray-50 rounded-xl border border-gray-100"
                            onPress={() => toggleItem(item.id)}
                        >
                            <View className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${item.checked ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                {item.checked && <FontAwesome name="check" size={14} color="white" />}
                            </View>
                            <Text className={`text-lg flex-1 ${item.checked ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Button
                    label="Save Progress"
                    className="mt-8"
                    onPress={() => router.back()}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
