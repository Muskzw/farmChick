import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
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
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView
                className="flex-1 px-4 py-6"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text className="text-2xl font-bold text-gray-900 mb-6">Marketplace</Text>

                <View className="flex-row gap-2 mb-6 overflow-hidden">
                    <Button
                        label="All"
                        variant={category === 'all' ? 'primary' : 'outline'}
                        className="flex-1 py-2"
                        onPress={() => setCategory('all')}
                    />
                    <Button
                        label="Feed"
                        variant={category === 'feed' ? 'primary' : 'outline'}
                        className="flex-1 py-2"
                        onPress={() => setCategory('feed')}
                    />
                    <Button
                        label="Chicks"
                        variant={category === 'chicks' ? 'primary' : 'outline'}
                        className="flex-1 py-2"
                        onPress={() => setCategory('chicks')}
                    />
                </View>

                {loading && !refreshing ? (
                    <ActivityIndicator size="large" color="#2E7D32" />
                ) : products.length === 0 ? (
                    <View className="items-center justify-center py-10">
                        <Text className="text-gray-500">No products found.</Text>
                    </View>
                ) : (
                    <View className="flex-row flex-wrap gap-4">
                        {products.map((item) => (
                            <View key={item.id} className="w-[47%] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <View className="h-32 bg-gray-200 items-center justify-center">
                                    {item.image_url ? (
                                        <Image source={{ uri: item.image_url }} className="w-full h-full" resizeMode="cover" />
                                    ) : (
                                        <Text className="text-gray-400">No Image</Text>
                                    )}
                                </View>
                                <View className="p-3">
                                    <Text className="font-bold text-gray-900" numberOfLines={1}>{item.name}</Text>
                                    <Text className="text-primary font-bold mt-1">${item.price.toFixed(2)}</Text>
                                    <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>{item.description}</Text>
                                    <Button label="Buy" className="mt-2 py-1" />
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
