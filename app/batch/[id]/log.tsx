import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { supabase } from '../../../lib/supabase';

export default function DailyLogScreen() {
    const { id } = useLocalSearchParams();
    const [mortality, setMortality] = React.useState('');
    const [culls, setCulls] = React.useState('');
    const [feed, setFeed] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function saveLog() {
        setLoading(true);
        const { error } = await supabase
            .from('daily_logs')
            .insert({
                batch_id: id,
                date: new Date().toISOString().split('T')[0],
                mortality: parseInt(mortality) || 0,
                culls: parseInt(culls) || 0,
                feed_intake: parseFloat(feed) || 0,
                weight: parseFloat(weight) || 0,
                notes
            });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Daily log saved!');
            router.back();
        }
        setLoading(false);
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-4 py-6">
                <Text className="text-2xl font-bold text-gray-900 mb-2">Daily Log</Text>
                <Text className="text-gray-500 mb-6">Batch #{id} • Today</Text>

                <Input
                    label="Mortality (Deaths)"
                    placeholder="0"
                    keyboardType="numeric"
                    value={mortality}
                    onChangeText={setMortality}
                />
                <Input
                    label="Culls"
                    placeholder="0"
                    keyboardType="numeric"
                    value={culls}
                    onChangeText={setCulls}
                />
                <Input
                    label="Feed Consumed (kg)"
                    placeholder="0"
                    keyboardType="numeric"
                    value={feed}
                    onChangeText={setFeed}
                />
                <Input
                    label="Average Weight (g)"
                    placeholder="0"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                />

                <Input
                    label="Notes"
                    placeholder="Any observations..."
                    multiline
                    numberOfLines={3}
                    className="h-24 text-top"
                    value={notes}
                    onChangeText={setNotes}
                />

                <Button
                    label={loading ? "Saving..." : "Save Log"}
                    className="mt-4"
                    onPress={saveLog}
                    disabled={loading}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
