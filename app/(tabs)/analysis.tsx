import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function AnalysisScreen() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6">Analysis</Text>

                <View className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <Text className="text-lg font-bold text-gray-900 mb-2">Estimated Profit</Text>
                    <Text className="text-4xl font-bold text-primary">$4,250</Text>
                    <Text className="text-gray-500">Based on current mortality and market price.</Text>
                </View>

                <View className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <Text className="text-lg font-bold text-gray-900 mb-4">Growth Chart</Text>
                    <View className="h-40 bg-gray-50 rounded flex items-center justify-center border border-dashed border-gray-300">
                        <Text className="text-gray-400">[Chart Placeholder]</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
