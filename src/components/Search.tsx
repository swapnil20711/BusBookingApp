import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { navigate } from '../utils/NavigationUtils';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import { Button, TouchableRipple } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePickerModal from './ui/DatePickerModal';
import LocationPickerModal from './ui/LocationPickerModal';

const Search = () => {
    const [from, setFrom] = useState<string | null>(null);
    const [to, setTo] = useState<string | null>(null);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [locationType, setLocationType] = useState<'from' | 'to'>('from');
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const options = ['Today', 'Tomorrow'];

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);

    const handleLocationSet = (location: string, type: 'from' | 'to') => {
        if (type === 'from') {
            setFrom(location);
            if (location === to) {
                setTo(null);
            }
        } else {
            setTo(location);
        }
    };

    const handleSearchBuses = () => {
        if (!from || !to) {
            Alert.alert('Missing information', 'Please select both departure and destination locations.');
            return;
        }

        if (from === to) {
            Alert.alert('Invalid Selection', 'Departure and destination locations cannot be the same.');
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) {
            Alert.alert('Invalid Date', 'Please select a future date for your journey.');
            return;
        }

        navigate('BusListing', { item: { from, to, date } });

    };

    return (
        <View>
            <View className="border rounded-xl border-gray-400 mt-4 ">
                <View>
                    <TouchableRipple
                        onPress={() => {
                            setLocationType('from');
                            setShowLocationPicker(true);
                        }}
                        className="flex-row items-center border-b-[1px] border-gray-400">
                        <View className="flex-row my-6 mx-3">
                            <Image className="h-6 w-6" source={require('../assets/images/bus.png')} />
                            <Text className="mx-4 w-[90%] text-lg font-okra text-gray-700">{from || 'From'}</Text>
                        </View>
                    </TouchableRipple >
                    <TouchableRipple
                        onPress={() => {
                            setLocationType('to');
                            setShowLocationPicker(true);
                        }} className="flex-row items-center">
                        <View className="flex-row my-6 mx-3">
                            <Image className="h-6 w-6" source={require('../assets/images/bus.png')} />
                            <Text className="mx-4 w-[90%] text-lg font-okra text-gray-700">{to || 'To'}</Text>
                        </View>
                    </TouchableRipple>
                </View>
                <TouchableRipple
                    onPress={() => {
                        setShowDatePicker(true);
                    }}
                    className="flex-row items-center border-t-[1px] border-gray-400">
                    <View className="flex-row my-4 mx-3 items-center flex-1">
                        <CalendarDaysIcon />
                        <View className="flex-row mx-4 justify-between flex-1">
                            <View>
                                <Text className="color-gray-500">Date of Journey</Text>
                                <Text className="text-2xl font-bold">{date.toLocaleDateString('en-GB', {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: 'short',
                                })}</Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                                {options.map((option) => {
                                    return (
                                        <TouchableOpacity onPress={() => { }} className="bg-red-200 p-3 rounded-3xl">
                                            <Text className="font-okra font-semibold text-lg">{option}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </TouchableRipple >
                <TouchableOpacity
                    onPress={() => {
                        setFrom(to);
                        setTo(from);
                    }}
                    style={{ position: 'absolute', right: 40, top: 50, bottom: 0 }}>
                    <MaterialIcon
                        style={{ padding: 4 }}
                        color={'#fff'}
                        className="rounded-3xl bg-gray-500" size={24} name="swap-vertical" />
                </TouchableOpacity>
            </View>
            <Button
                onPress={() => {
                    handleSearchBuses();
                }}
                // eslint-disable-next-line react/no-unstable-nested-components
                icon={() => <MaterialIcon size={18} color={'#fff'} name="magnify" />}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ marginTop: 12, backgroundColor: '#CF3239' }}
                mode="contained">Search buses
            </Button>

            <Image className="h-40 rounded-lg mt-4 w-full" source={require('../assets/images/sidebus.jpg')} />

            <DatePickerModal
                maxDate={maxDate}
                visible={showDatePicker}
                selectedDate={new Date()}
                onClose={() => {
                    setShowDatePicker(false);
                }}
                onConfirm={setDate}
            />

            <LocationPickerModal
                onClose={() => {
                    setShowLocationPicker(false);
                }}
                onSelect={handleLocationSet}
                fromLocation={from || undefined}
                visible={showLocationPicker}
                type={locationType}
            />
        </View>
    );
};

export default Search;
