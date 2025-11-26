import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button } from '../../components/Button';

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Good Morning,</Text>
            <Text className="text-lg text-gray-600">Sunny Side Farm</Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            <Text className="text-primary font-bold">🔔</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Text className="text-gray-500 text-sm">Active Birds</Text>
            <Text className="text-2xl font-bold text-primary">2,500</Text>
          </View>
          <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Text className="text-gray-500 text-sm">Batch Age</Text>
            <Text className="text-2xl font-bold text-secondary">Day 14</Text>
          </View>
        </View>

        {/* Action Cards */}
        <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
        <View className="gap-4">
          <Button label="Log Daily Data" onPress={() => router.push('/batch/24/log')} />
          <Button label="Order Feed" variant="secondary" onPress={() => router.push('/(tabs)/shop')} />
        </View>

        {/* Recent Alerts */}
        <Text className="text-lg font-bold text-gray-900 mt-8 mb-4">Alerts</Text>
        <View className="p-4 rounded-xl border border-red-100 bg-red-50">
          <Text className="font-bold text-red-800">Vaccination Due</Text>
          <Text className="text-red-600">Gumboro vaccination is due tomorrow.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
