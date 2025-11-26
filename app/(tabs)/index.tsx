import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
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
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-4 py-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-3xl font-bold text-text">Dashboard</Text>
            <Text className="text-slate-500 font-medium">Welcome back, Farmer</Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            <View className="w-10 h-10 bg-primary rounded-full items-center justify-center shadow-sm">
              <Text className="text-white font-bold text-lg">F</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-4 mb-8">
          <Card className="flex-1 bg-primary border-primary">
            <Text className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Active Batches</Text>
            <Text className="text-4xl font-bold text-white mt-2">{activeBatches}</Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Birds</Text>
            <Text className="text-4xl font-bold text-text mt-2">{totalBirds}</Text>
          </Card>
        </View>

        {/* Actions */}
        <Text className="text-xl font-bold text-text mb-4">Quick Actions</Text>
        <View className="gap-4 mb-8">
          <Button
            label="Log Daily Data"
            onPress={() => router.push('/(tabs)/farm')}
            className="shadow-md"
          />
          <Button
            label="Order Feed"
            variant="secondary"
            onPress={() => router.push('/(tabs)/shop')}
            textClassName="text-primary"
          />
        </View>

        {/* Alerts/Notifications */}
        <Text className="text-xl font-bold text-text mb-4">Alerts</Text>
        <Card className="bg-yellow-50 border-yellow-100 mb-4">
          <View className="flex-row items-center gap-3 mb-2">
            <View className="w-2 h-2 rounded-full bg-yellow-500" />
            <Text className="font-bold text-yellow-800 text-lg">Vaccination Due</Text>
          </View>
          <Text className="text-yellow-700 leading-relaxed">Batch #24 needs Gumboro vaccine tomorrow.</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
