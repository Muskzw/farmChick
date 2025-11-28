import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function DashboardScreen() {
  const { session } = useAuth();
  const [activeBatches, setActiveBatches] = useState(0);
  const [totalBirds, setTotalBirds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('Farmer');

  const fetchStats = async () => {
    try {
      if (!session?.user) return;

      // Fetch User Profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .single();

      if (profile?.full_name) setUserName(profile.full_name.split(' ')[0]);

      // Fetch Batches
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
    <View className="flex-1 bg-background-dark">
      <LinearGradient
        colors={['#064E3B', '#020617']}
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1 px-5 py-6"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10B981" />
          }
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Text>
              <Text className="text-3xl font-bold text-white tracking-tight">Hi, {userName}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/profile')}
              className="bg-surface-light/10 p-1 rounded-full border border-white/10"
            >
              <View className="w-10 h-10 bg-primary-500/20 rounded-full items-center justify-center">
                <FontAwesome name="user" size={18} color="#10B981" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Quick Stats Grid */}
          <View className="flex-row gap-4 mb-8">
            <GlassCard variant="default" intensity="medium" className="flex-1 border-primary-500/30">
              <View className="bg-primary-500/20 w-10 h-10 rounded-full items-center justify-center mb-3">
                <FontAwesome name="cubes" size={18} color="#10B981" />
              </View>
              <Text className="text-primary-200 text-xs font-bold uppercase tracking-wider">Active Batches</Text>
              <Text className="text-4xl font-bold text-white mt-1">{activeBatches}</Text>
            </GlassCard>

            <GlassCard variant="default" intensity="medium" className="flex-1 border-secondary-500/30">
              <View className="bg-secondary-500/20 w-10 h-10 rounded-full items-center justify-center mb-3">
                <FontAwesome name="twitter" size={18} color="#F59E0B" />
              </View>
              <Text className="text-secondary-200 text-xs font-bold uppercase tracking-wider">Total Birds</Text>
              <Text className="text-4xl font-bold text-white mt-1">{totalBirds}</Text>
            </GlassCard>
          </View>

          {/* Quick Actions */}
          <Text className="text-xl font-bold text-white mb-4 tracking-tight">Quick Actions</Text>
          <View className="flex-row flex-wrap gap-3 mb-8">
            <TouchableOpacity
              className="flex-1 min-w-[45%]"
              onPress={() => router.push('/(tabs)/farm')}
            >
              <GlassCard variant="light" intensity="low" className="items-center py-6">
                <View className="w-12 h-12 bg-blue-500/20 rounded-full items-center justify-center mb-3">
                  <FontAwesome name="edit" size={20} color="#60A5FA" />
                </View>
                <Text className="font-bold text-white">Log Data</Text>
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 min-w-[45%]"
              onPress={() => router.push('/(tabs)/shop')}
            >
              <GlassCard variant="light" intensity="low" className="items-center py-6">
                <View className="w-12 h-12 bg-purple-500/20 rounded-full items-center justify-center mb-3">
                  <FontAwesome name="shopping-cart" size={20} color="#A78BFA" />
                </View>
                <Text className="font-bold text-white">Order Feed</Text>
              </GlassCard>
            </TouchableOpacity>
          </View>

          {/* Alerts */}
          <Text className="text-xl font-bold text-white mb-4 tracking-tight">Alerts</Text>
          <GlassCard variant="default" intensity="medium" className="flex-row items-start gap-4 border-l-4 border-l-secondary-500">
            <View className="mt-1">
              <FontAwesome name="bell" size={20} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-white text-lg mb-1">Vaccination Due</Text>
              <Text className="text-slate-300 leading-relaxed">Batch #24 needs Gumboro vaccine tomorrow. Don't forget!</Text>
            </View>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
