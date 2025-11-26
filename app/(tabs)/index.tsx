import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function DashboardScreen() {
  const { session } = useAuth();
  const [activeBatches, setActiveBatches] = useState(0);
  const [totalBirds, setTotalBirds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      if (!session?.user) return;

      const { data: batches, error } = await supabase
        .from('batches')
        .select('initial_count')
        .eq('user_id', session.user.id)
        .eq('status', 'active');

      if (error) throw error;

      if (batches) {
        setActiveBatches(batches.length);
        const birds = batches.reduce((acc, batch) => acc + batch.initial_count, 0);
        setTotalBirds(birds);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [session]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-4 py-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>
            <Text className="text-gray-500">Welcome back, Farmer</Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            {/* Profile Icon Placeholder */}
            <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
              <Text className="text-white font-bold">F</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Text className="text-gray-500 text-xs font-bold uppercase">Active Batches</Text>
            <Text className="text-3xl font-bold text-gray-900 mt-1">{activeBatches}</Text>
          </View>
          <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Text className="text-gray-500 text-xs font-bold uppercase">Total Birds</Text>
            <Text className="text-3xl font-bold text-gray-900 mt-1">{totalBirds}</Text>
          </View>
        </View>

        {/* Actions */}
        <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
        <View className="gap-4 mb-8">
          <Button
            label="Log Daily Data"
            onPress={() => router.push('/(tabs)/farm')}
          />
          <Button
            label="Order Feed"
            variant="secondary"
            onPress={() => router.push('/(tabs)/shop')}
          />
        </View>

        {/* Alerts/Notifications */}
        <Text className="text-lg font-bold text-gray-900 mb-4">Alerts</Text>
        <View className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mb-4">
          <Text className="font-bold text-yellow-800 mb-1">Vaccination Due</Text>
          <Text className="text-yellow-700 text-sm">Batch #24 needs Gumboro vaccine tomorrow.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
