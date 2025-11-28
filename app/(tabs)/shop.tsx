import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import GlassCard from '../../components/GlassCard';
import { supabase } from '../../lib/supabase';

type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    image_url: string | null;
};

export default function ShopScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [category, setCategory] = useState<string>('all');

    const fetchProducts = async () => {
        try {
            let query = supabase.from('products').select('*');

            if (category !== 'all') {
                query = query.eq('category', category.toLowerCase());
            }

            const { data, error } = await query;

            if (error) throw error;

            if (data) {
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
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
                    <Text className="text-3xl font-bold text-white mb-6 tracking-tight">Marketplace</Text>

                    <View className="flex-row gap-2 mb-6 overflow-hidden">
                        <Button
                            label="All"
                            variant={category === 'all' ? 'primary' : 'ghost'}
                            className="flex-1 py-2"
                            onPress={() => setCategory('all')}
                            textClassName={category !== 'all' ? 'text-slate-400' : ''}
                        />
                        <Button
                            label="Feed"
                            variant={category === 'feed' ? 'primary' : 'ghost'}
                            className="flex-1 py-2"
                            onPress={() => setCategory('feed')}
                            textClassName={category !== 'feed' ? 'text-slate-400' : ''}
                        />
                        <Button
                            label="Chicks"
                            variant={category === 'chicks' ? 'primary' : 'ghost'}
                            className="flex-1 py-2"
                            onPress={() => setCategory('chicks')}
                            textClassName={category !== 'chicks' ? 'text-slate-400' : ''}
                        />
                    </View>

                    {loading && !refreshing ? (
                        <ActivityIndicator size="large" color="#10B981" />
                    ) : products.length === 0 ? (
                        <View className="items-center justify-center py-10">
                            <Text className="text-text-muted text-lg">No products found.</Text>
                        </View>
                    ) : (
                        <View className="flex-row flex-wrap gap-4">
                            {products.map((item) => (
                                <GlassCard key={item.id} variant="light" intensity="low" className="w-[47%] p-0 overflow-hidden mb-4 border-white/10">
                                    <View className="h-32 bg-slate-800 items-center justify-center">
                                        {item.image_url ? (
                                            <Image source={{ uri: item.image_url }} className="w-full h-full" resizeMode="cover" />
                                        ) : (
                                            <Text className="text-slate-600">No Image</Text>
                                        )}
                                    </View>
                                    <View className="p-3">
                                        <Text className="font-bold text-white text-lg" numberOfLines={1}>{item.name}</Text>
                                        <Text className="text-primary-400 font-bold mt-1">${item.price.toFixed(2)}</Text>
                                        <Text className="text-xs text-slate-400 mt-1" numberOfLines={1}>{item.description}</Text>
                                        <Button label="Buy" size="sm" className="mt-3 py-1" />
                                    </View>
                                </GlassCard>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
