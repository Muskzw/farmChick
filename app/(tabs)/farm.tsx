import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button } from '../../components/Button';

export default function FarmScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6">My Batches</Text>

                {/* Active Batch */}
                <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
                    <View className="flex-row justify-between items-start mb-2">
                        <View>
                            <Text className="text-lg font-bold text-gray-900">Batch #24</Text>
                            <Text className="text-gray-500">Cobb 500 • Started Nov 10</Text>
                        </View>
                        <View className="bg-green-100 px-2 py-1 rounded">
                            <Text className="text-green-800 text-xs font-bold">ACTIVE</Text>
                        </View>
                    </View>

                    <View className="h-2 bg-gray-100 rounded-full mt-2 mb-4 overflow-hidden">
                        <View className="h-full bg-primary w-1/3" />
                    </View>

                    <View className="flex-row justify-between border-t border-gray-100 pt-4">
                        <View>
                            <Text className="text-gray-500 text-xs">Mortality</Text>
                            <Text className="font-bold text-red-600">1.2%</Text>
                        </View>
                        <View>
                            <Text className="text-gray-500 text-xs">Avg Weight</Text>
                            <Text className="font-bold text-gray-900">450g</Text>
                        </View>
                        <View>
                            <Text className="text-gray-500 text-xs">FCR</Text>
                            <Text className="font-bold text-gray-900">1.1</Text>
                        </View>
                    </View>

                    <Button label="View Details" variant="outline" className="mt-4 py-2" onPress={() => router.push('/batch/24/log')} />
                </View>

                {/* Planning Batch */}
                <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 opacity-75">
                    <View className="flex-row justify-between items-start mb-2">
                        <View>
                            <Text className="text-lg font-bold text-gray-900">Batch #25</Text>
                            <Text className="text-gray-500">Planning Phase</Text>
                        </View>
                        <View className="bg-yellow-100 px-2 py-1 rounded">
                            <Text className="text-yellow-800 text-xs font-bold">PLANNING</Text>
                        </View>
                    </View>

                    <Text className="text-gray-600 mt-2 mb-4">Arrival Date: Dec 15</Text>
                    <Button label="Pre-arrival Checklist" variant="secondary" className="py-2" onPress={() => router.push('/batch/25/checklist')} />
                </View>

                <Button label="+ Start New Batch" className="mt-4" onPress={() => router.push('/batch/new')} />
            </ScrollView>
        </SafeAreaView>
    );
}
