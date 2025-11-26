import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button } from '../../components/Button';

export default function ShopScreen() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6">Marketplace</Text>

                <View className="flex-row gap-2 mb-6 overflow-hidden">
                    <Button label="Feed" variant="primary" className="flex-1 py-2" />
                    <Button label="Equipment" variant="outline" className="flex-1 py-2" />
                    <Button label="Chicks" variant="outline" className="flex-1 py-2" />
                </View>

                <View className="flex-row flex-wrap gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <View key={item} className="w-[47%] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <View className="h-32 bg-gray-200 items-center justify-center">
                                <Text className="text-gray-400">Image</Text>
                            </View>
                            <View className="p-3">
                                <Text className="font-bold text-gray-900">Broiler Starter Feed</Text>
                                <Text className="text-primary font-bold mt-1">$25.00</Text>
                                <Text className="text-xs text-gray-500 mt-1">50kg Bag</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
