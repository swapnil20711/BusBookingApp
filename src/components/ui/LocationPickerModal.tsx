import { Text, Modal, TouchableOpacity, FlatList, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { locations } from '../../utils/dummyData';
import { SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';

interface LocationPickerModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (location: string, type: 'from' | 'to') => void;
    type: 'from' | 'to';
    fromLocation?: string;
}

const screenHeight = Dimensions.get('screen').height;

const LocationItem = ({
    item,
    onSelect,
    type,
    fromLocation,
    onClose
}: {
    item: string;
    onSelect: (location: string, type: 'from' | 'to') => void;
    type: 'from' | 'to';
    fromLocation?: string;
    onClose: () => void
}) => (
    <TouchableOpacity
        onPress={() => {
            if (type === 'to' && item === fromLocation) {
                return;
            }
            onSelect(item, type);
            onClose();
        }}
        className="p-3 border-b border-gray-300"
    >
        <Text>{item}</Text>
    </TouchableOpacity>
);

const EmptyComponent = () => (
    <View style={{ height: screenHeight - 300, justifyContent: 'center', alignItems: 'center' }}>
        <Text className="text-lg text-gray-500">No Location found!</Text>
    </View>
);

const HeaderComponent = ({
    type,
    search,
    setSearch,
}: {
    type: 'from' | 'to';
    search: string;
    setSearch: (value: string) => void;
}) => (
    <View>
        <Text className="text-lg font-bold text-center mb-4">
            Select {type === 'from' ? 'Departure' : 'Destination'} city
        </Text>
        <TextInput
            onChangeText={setSearch}
            value={search}
            outlineStyle={{ borderRadius: 32 }}
            placeholder="Search city..."
            style={{ backgroundColor: 'white' }}
            mode="outlined"
            inputMode='search'
        />
    </View>
);

const FooterComponent = ({ onClose }: { onClose: () => void }) => (
    <TouchableOpacity onPress={onClose} className="p-3 bg-gray-300 rounded-lg mt-4">
        <Text className="text-center text-black font-bold">Cancel</Text>
    </TouchableOpacity>
);

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
    visible,
    onClose,
    onSelect,
    type,
    fromLocation,
}) => {
    const [search, setSearch] = useState('');
    const filteredLocations = locations.filter((location) =>
        location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Modal transparent={false} visible={visible} animationType="slide">
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    className="bg-white p-4"
                    data={filteredLocations}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <LocationItem onClose={onClose} item={item} onSelect={onSelect} type={type} fromLocation={fromLocation} />
                    )}
                    ListEmptyComponent={<EmptyComponent />}
                    ListHeaderComponent={
                        <HeaderComponent
                            type={type}
                            search={search}
                            setSearch={setSearch} />
                    }
                    ListFooterComponent={<FooterComponent onClose={onClose} />}
                />
            </SafeAreaView>
        </Modal>
    );
};

export default LocationPickerModal;
