import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button } from '../../components/Button';
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
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView
                className="flex-1 px-4 py-6"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text className="text-2xl font-bold text-gray-900 mb-6">My Batches</Text>

                {loading && !refreshing ? (
                    <ActivityIndicator size="large" color="#2E7D32" />
                ) : batches.length === 0 ? (
                    <View className="items-center justify-center py-10">
                        <Text className="text-gray-500 mb-4">No batches found.</Text>
                        <Button label="Start Your First Batch" onPress={() => router.push('/batch/new')} />
                    </View>
                ) : (
                    batches.map((batch) => (
                        <View key={batch.id} className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 ${batch.status === 'planning' ? 'opacity-75' : ''}`}>
                            <View className="flex-row justify-between items-start mb-2">
                                <View>
                                    <Text className="text-lg font-bold text-gray-900">{batch.name}</Text>
                                    <Text className="text-gray-500">{batch.breed} • {new Date(batch.start_date).toLocaleDateString()}</Text>
                                </View>
                                <View className={`px-2 py-1 rounded ${batch.status === 'active' ? 'bg-green-100' : batch.status === 'planning' ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                                    <Text className={`text-xs font-bold ${batch.status === 'active' ? 'text-green-800' : batch.status === 'planning' ? 'text-yellow-800' : 'text-gray-800'}`}>
                                        {batch.status.toUpperCase()}
                                    </Text>
                                </View>
                            </View>

                            {batch.status === 'active' && (
                                <>
                                    <View className="h-2 bg-gray-100 rounded-full mt-2 mb-4 overflow-hidden">
                                        <View className="h-full bg-primary w-1/3" />
                                    </View>

                                    <View className="flex-row justify-between border-t border-gray-100 pt-4">
                                        <View>
                                            <Text className="text-gray-500 text-xs">Birds</Text>
                                            <Text className="font-bold text-gray-900">{batch.initial_count}</Text>
                                        </View>
                                        <View>
                                            <Text className="text-gray-500 text-xs">Avg Weight</Text>
                                            <Text className="font-bold text-gray-900">--</Text>
                                        </View>
                                        <View>
                                            <Text className="text-gray-500 text-xs">FCR</Text>
                                            <Text className="font-bold text-gray-900">--</Text>
                                        </View>
                                    </View>

                                    <Button label="View Details" variant="outline" className="mt-4 py-2" onPress={() => router.push(`/batch/${batch.id}/log`)} />
                                </>
                            )}

                            {batch.status === 'planning' && (
                                <Button label="Pre-arrival Checklist" variant="secondary" className="mt-4 py-2" onPress={() => router.push(`/batch/${batch.id}/checklist`)} />
                            )}
                        </View>
                    ))
                )}

                {batches.length > 0 && (
                    <Button label="+ Start New Batch" className="mt-4 mb-8" onPress={() => router.push('/batch/new')} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
