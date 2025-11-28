import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassCard from '../../components/GlassCard';
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
                const validLogs = logs.filter(log => log.weight > 0);

                if (validLogs.length > 0) {
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
        <View className="flex-1 bg-background-dark">
            <LinearGradient
                colors={['#064E3B', '#020617']}
                className="absolute inset-0"
            />
            <SafeAreaView className="flex-1">
                <ScrollView className="flex-1 px-4 py-6">
                    <Text className="text-3xl font-bold text-white mb-6 tracking-tight">Analysis</Text>

                    <GlassCard variant="default" intensity="medium" className="p-6 mb-6 border-primary-500/30">
                        <Text className="text-lg font-bold text-white mb-2">Estimated Profit</Text>
                        <Text className="text-4xl font-bold text-primary-400">$4,250</Text>
                        <Text className="text-slate-300 mt-1">Based on current mortality and market price.</Text>
                    </GlassCard>

                    <GlassCard variant="dark" intensity="high" className="p-6 mb-6 border-white/10">
                        <Text className="text-lg font-bold text-white mb-4">
                            Growth Chart {activeBatchName ? `(${activeBatchName})` : ''}
                        </Text>

                        {loading ? (
                            <View className="h-56 items-center justify-center">
                                <ActivityIndicator size="large" color="#10B981" />
                            </View>
                        ) : chartData ? (
                            <View className="items-center overflow-hidden rounded-2xl">
                                <LineChart
                                    data={chartData}
                                    width={Dimensions.get('window').width - 80} // Container padding
                                    height={220}
                                    yAxisSuffix="g"
                                    chartConfig={{
                                        backgroundColor: "transparent",
                                        backgroundGradientFrom: "#020617",
                                        backgroundGradientTo: "#064E3B",
                                        decimalPlaces: 0,
                                        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#10B981"
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
                            <View className="h-40 bg-white/5 rounded-xl flex items-center justify-center border border-dashed border-white/20">
                                <Text className="text-slate-400 text-center px-4">
                                    No weight data available for active batch. Start logging daily weights!
                                </Text>
                            </View>
                        )}
                    </GlassCard>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
