import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function AnalysisScreen() {
    const { session } = useAuth();
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState<{ labels: string[], datasets: { data: number[] }[] } | null>(null);
    const [activeBatchName, setActiveBatchName] = useState<string>('');

    useEffect(() => {
        if (session?.user) {
            fetchAnalysisData();
        }
    }, [session]);

    async function fetchAnalysisData() {
        try {
            setLoading(true);
            if (!session?.user) return;

            // 1. Get the most recent active batch
            const { data: batches, error: batchError } = await supabase
                .from('batches')
                .select('id, name')
                .eq('user_id', session.user.id)
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1);

            if (batchError) throw batchError;

            if (!batches || batches.length === 0) {
                setChartData(null);
                setLoading(false);
                return;
            }

            const batch = batches[0];
            setActiveBatchName(batch.name);

            // 2. Get daily logs for this batch
            const { data: logs, error: logsError } = await supabase
                .from('daily_logs')
                .select('date, weight')
                .eq('batch_id', batch.id)
                .order('date', { ascending: true });

            if (logsError) throw logsError;

            if (logs && logs.length > 0) {
                // Process data for chart
                // Filter out logs with no weight recorded to avoid 0 drops if not intended, 
                // or keep them if 0 means something. For growth, usually we want actual measurements.
                const validLogs = logs.filter(log => log.weight > 0);

                if (validLogs.length > 0) {
                    // Take last 7 entries if too many, to keep chart readable, or just all
                    // Let's take up to 10 recent points
                    const recentLogs = validLogs.slice(-10);

                    const labels = recentLogs.map(log => {
                        const d = new Date(log.date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                    });
                    const data = recentLogs.map(log => log.weight);

                    setChartData({
                        labels,
                        datasets: [{ data }]
                    });
                } else {
                    setChartData(null);
                }
            }
        } catch (error) {
            console.error('Error fetching analysis:', error);
        } finally {
            setLoading(false);
        }
    }

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
                    <Text className="text-lg font-bold text-gray-900 mb-4">
                        Growth Chart {activeBatchName ? `(${activeBatchName})` : ''}
                    </Text>

                    {loading ? (
                        <View className="h-56 items-center justify-center">
                            <ActivityIndicator size="large" color="#2E7D32" />
                        </View>
                    ) : chartData ? (
                        <View className="items-center overflow-hidden">
                            <LineChart
                                data={chartData}
                                width={Dimensions.get('window').width - 80} // Container padding
                                height={220}
                                yAxisSuffix="g"
                                chartConfig={{
                                    backgroundColor: "#ffffff",
                                    backgroundGradientFrom: "#ffffff",
                                    backgroundGradientTo: "#ffffff",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#2E7D32"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </View>
                    ) : (
                        <View className="h-40 bg-gray-50 rounded flex items-center justify-center border border-dashed border-gray-300">
                            <Text className="text-gray-400 text-center px-4">
                                No weight data available for active batch. Start logging daily weights!
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
