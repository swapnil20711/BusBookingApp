import { View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import { UserCircleIcon } from 'react-native-heroicons/solid'
import { logout } from '../service/request/auth';
import Bookings from '../components/home/Bookings';

const HomeScreen = () => {
    return (
        <View className="flex-1 bg-white px-4">
            <View className="flex-row justify-between py-2">
                <Text className="font-okra font-semibold text-3xl">Bus tickets</Text>
                <UserCircleIcon
                    color={'red'}
                    size={38}
                    onPress={logout} />
            </View>

            <Bookings />
        </View>
    );
};

export default HomeScreen;
