import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import GlassCard from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

type Batch = {
    id: string;
    name: string;
    breed: string;
    start_date: string;
    status: 'active' | 'planning' | 'sold';
    initial_count: number;
};

export default function FarmScreen() {
    const router = useRouter();
    const { session } = useAuth();
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchBatches = async () => {
        try {
            if (!session?.user) return;

            const { data, error } = await supabase
                .from('batches')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                setBatches(data);
            }
        } catch (error) {
            console.error('Error fetching batches:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchBatches();
    }, [session]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchBatches();
    };

    return (
        <View className="flex-1 bg-background-dark">
            <LinearGradient
                colors={['#064E3B', '#020617']}
                className="absolute inset-0"
            />
            <SafeAreaView className="flex-1">
                <ScrollView
                    className="flex-1 px-4 py-6"
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10B981" />
                    }
                >
                    <Text className="text-3xl font-bold text-white mb-6 tracking-tight">My Batches</Text>

                    {loading && !refreshing ? (
                        <ActivityIndicator size="large" color="#10B981" />
                    ) : batches.length === 0 ? (
                        <View className="items-center justify-center py-10">
                            <Text className="text-text-muted mb-4 text-lg">No batches found.</Text>
                            <Button label="Start Your First Batch" onPress={() => router.push('/batch/new')} />
                        </View>
                    ) : (
                        batches.map((batch) => (
                            <GlassCard
                                key={batch.id}
                                variant="default"
                                intensity="medium"
                                className={`mb-4 border-white/5 ${batch.status === 'planning' ? 'opacity-75' : ''}`}
                            >
                                <View className="flex-row justify-between items-start mb-2">
                                    <View>
                                        <Text className="text-xl font-bold text-white">{batch.name}</Text>
                                        <Text className="text-text-muted">{batch.breed} • {new Date(batch.start_date).toLocaleDateString()}</Text>
                                    </View>
                                    <View className={`px-3 py-1 rounded-full ${batch.status === 'active' ? 'bg-primary-500/20 border border-primary-500/50' : batch.status === 'planning' ? 'bg-secondary-500/20 border border-secondary-500/50' : 'bg-slate-700/50 border border-slate-600'}`}>
                                        <Text className={`text-xs font-bold ${batch.status === 'active' ? 'text-primary-400' : batch.status === 'planning' ? 'text-secondary-400' : 'text-slate-400'}`}>
                                            {batch.status.toUpperCase()}
                                        </Text>
                                    </View>
                                </View>

                                {batch.status === 'active' && (
                                    <>
                                        <View className="h-2 bg-slate-700 rounded-full mt-2 mb-4 overflow-hidden">
                                            <View className="h-full bg-primary-500 w-1/3" />
                                        </View>

                                        <View className="flex-row justify-between border-t border-white/10 pt-4">
                                            <View>
                                                <Text className="text-text-muted text-xs uppercase tracking-wider">Birds</Text>
                                                <Text className="font-bold text-white text-lg">{batch.initial_count}</Text>
                                            </View>
                                            <View>
                                                <Text className="text-text-muted text-xs uppercase tracking-wider">Avg Weight</Text>
                                                <Text className="font-bold text-white text-lg">--</Text>
                                            </View>
                                            <View>
                                                <Text className="text-text-muted text-xs uppercase tracking-wider">FCR</Text>
                                                <Text className="font-bold text-white text-lg">--</Text>
                                            </View>
                                        </View>

                                        <Button label="View Details" variant="outline" className="mt-4 py-2 border-white/20" textClassName="text-white" onPress={() => router.push(`/batch/${batch.id}/log`)} />
                                    </>
                                )}

                                {batch.status === 'planning' && (
                                    <Button label="Pre-arrival Checklist" variant="secondary" className="mt-4 py-2" onPress={() => router.push(`/batch/${batch.id}/checklist`)} />
                                )}
                            </GlassCard>
                        ))
                    )}

                    {batches.length > 0 && (
                        <Button label="+ Start New Batch" className="mt-4 mb-8 shadow-lg shadow-primary-900/50" onPress={() => router.push('/batch/new')} />
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
