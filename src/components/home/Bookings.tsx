import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useCallback, useState } from 'react';
import Search from '../Search';
import { useQuery } from '@tanstack/react-query';
import { fetchUserTickets } from '../../service/request/bus';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, Button } from 'react-native-paper';
import BookItem from './BookItem';

const Bookings = () => {
    const [selectedTab, setSelectedTab] = useState('All');
    const { data: tickets, isLoading, isError, refetch } = useQuery({
        queryKey: ['userTickets'],
        queryFn: fetchUserTickets,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
    });

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch]));
    const [refreshing, setIsRefreshing] = useState(false);

    const onRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    };

    const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];
    const filteredBookings = selectedTab === 'All' ? tickets : tickets.filter((ticket: any) => ticket.status === selectedTab);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size={'large'} color={'teal'} />
                <Text className="text-gray-500 mt-2">Fetching bookings...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex-1 bg-white items-center justify-center" >
                <Text className="text-red-500">Failed to fetch bookings.</Text>

                <Button
                    mode="contained"
                    onPress={() => {
                        refetch();
                    }}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ backgroundColor: 'red', borderRadius: 16, marginTop: 4 }}>Retry</Button>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ListHeaderComponent={<>
                    <Search />
                    <Text className="text-2xl font-bold my-4">Past Bookings</Text>

                    <View className="flex-row mb-4 gap-4">
                        {tabs?.map((tab) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedTab(tab);
                                    }}
                                    id={tab}
                                    className={`rounded-xl text-center ${selectedTab.toLowerCase() !== tab.toLowerCase() ? 'border' : 'border-0'} border-gray-300 py-2 px-4 ${selectedTab.toLowerCase() === tab.toLowerCase() ? 'bg-red-200' : 'bg-white'} justify-center items-center`}>
                                    <Text className={`text-sm ${selectedTab.toLowerCase() === tab.toLowerCase() ? 'font-bold' : 'font-normal'}`}>{tab}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </>}
                data={filteredBookings}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                nestedScrollEnabled
                ListEmptyComponent={
                    <View className="flex-1 items-center mt-6 justify-center">
                        <Text className="text-gray-500">No bookings found.</Text>
                    </View>
                }
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item }) => {
                    return (
                        <BookItem item={item} />
                    )
                }} />
        </View>
    );
};

export default Bookings;
