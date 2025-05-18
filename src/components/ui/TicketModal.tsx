import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { ArrowUpOnSquareIcon, XMarkIcon } from 'react-native-heroicons/solid';
import Svg, { Circle, Line } from 'react-native-svg';

interface TicketModalProps {
    visible: boolean;
    onClose: () => void;
    bookingInfo: any;
}
const TicketModal: React.FC<TicketModalProps> = ({ visible, onClose, bookingInfo }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View className="flex-1 justify-center items-center" style={{ backgroundColor: '#2A2526' }}>
                <TouchableOpacity
                    onPress={() => {
                        onClose()
                    }} className="bg-white mb-5 shadow-sm p-1 rounded-full">
                    <XMarkIcon color={'black'} size={22} />
                </TouchableOpacity>
                <View className="bg-white overflow-hidden rounded-xl w-[90%] p-4 shadow-lg relative">
                    <Text className="text-center font-okra font-bold mb-2">Your Ticket</Text>
                    <View className="absolute left-[-14px] top-[60%] -translate-y-1/2" >
                        <Svg height={40} width={28}>
                            <Circle cx={14} cy={14} r={14} fill={'#2A2526'} />
                        </Svg>
                    </View>

                    <View className="absolute right-[-14px] top-[60%] -translate-y-1/2" >
                        <Svg height={40} width={28}>
                            <Circle cx={14} cy={14} r={14} fill={'#2A2526'} />
                        </Svg>
                    </View>
                    <View className="bg-gray-100 p-3 rounded-lg">
                        <Text className="text-gray-700 font-semibold">
                            {bookingInfo?.from} → {bookingInfo?.to}
                        </Text>
                        <Text className="text-gray-700 text-sm">
                            {bookingInfo?.departureTime} - {bookingInfo?.arrivalTime} ,{' '}
                            {bookingInfo?.date}
                        </Text>
                    </View>
                    <View className="mt-3">
                        <Text className="text-gray-700">{bookingInfo?.company}</Text>
                        <Text className="text-gray-500 text-sm">{bookingInfo?.busType}</Text>
                    </View>

                    <View className="mt-3">
                        <Text className="text-gray-700">Seats</Text>
                        <Text className="text-gray-500 text-sm">{bookingInfo?.seats.toString()}</Text>
                    </View>

                    <View className="my-6 w-full">
                        <Svg height={2} width={'100%'}>
                            <Line
                                x1="0"
                                y1="1"
                                x2="100%"
                                y2="1"
                                stroke={'gray'}
                                strokeWidth="2"
                                strokeDasharray="6,6"
                            />
                        </Svg>
                    </View>
                    <View className="mt-3">
                        <Text className="text-gray-700">
                            Ticket #: {bookingInfo?.ticketNumber}
                        </Text>
                        <Text className="text-gray-700">
                            PNR #: {bookingInfo?.pnr}
                        </Text>
                        <Text className="text-lg font-bold text-green-600 mt-2">
                            ₹ {bookingInfo?.fare}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity className="bg-red-500 flex-row gap-2 rounded-lg mt-4 justify-center items-center p-3">
                    <ArrowUpOnSquareIcon color={'#fff'} />
                    <Text className="text-white font-semibold">Share your Ticket</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default TicketModal;
