import { View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '../service/request/auth';
import { resetAndNavigate } from '../utils/NavigationUtils';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import TextInputComponent from '../components/TextInputComponent';
import { Button } from 'react-native-paper';

GoogleSignin.configure({
    webClientId:
        '329195570029-gcl401ppiocsa55p680mbih973bv2p4t.apps.googleusercontent.com',
    iosClientId:
        '329195570029-rm7dqv279tj4m9e33qcup5j4js8ugrbk.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
});

const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const loginMutation = useMutation({
        mutationFn: loginWithGoogle,
        onSuccess: () => {
            resetAndNavigate('Home');
        },
        onError: (error) => {
            console.log('====================================');
            console.log('Login failed', error);
            console.log('====================================');
        },
    });

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            loginMutation.mutate(response.data?.idToken as string);
        } catch (error) {
            console.log('Google sign in error : ', error);
        }
    };
    return (
        <View className="bg-white flex-1">
            <Image
                resizeMode="cover"
                className="w-full h-64"
                source={require('../assets/images/cover.jpeg')} />
            <View className="p-4">
                <Text className="font-okra font-semibold text-xl text-center">Create Account or Sign In</Text>
            </View>
            <View className="my-4 mt-8 mx-4">
                <TextInputComponent
                    selectedCountry={{ code: '+91', name: { 'en': 'IN' }, dial_code: '+91', flag: '🇮🇳' }}
                    label={'Phone Number'}
                    value={phone}
                    mode="outlined"
                    inputMode="tel"
                    placeholder="Enter your 10 digit phone number"
                    onCountrySelect={(country) => {
                        console.log(country);
                    }}
                />
                <View className="my-4">
                    <Button
                        style={{ backgroundColor: '#CF3239', borderRadius: 8 }}
                        onPress={() => { }}
                        mode="contained">LETS GO</Button>
                </View>
                <Text className="text-center my-8 text-sm font-okra text-gray-700">
                    -------- OR --------
                </Text>

                <View className="flex items-center justify-center flex-row gap-4">
                    <TouchableOpacity onPress={handleGoogleSignIn} className="border border-1 p-2 border-gray-400">
                        <Image source={require('../assets/images/google.png')} className="w-5 h-5 contain-size" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} className="border border-1 p-2 border-gray-400">
                        <Image source={require('../assets/images/apple.png')} className="w-5 h-5 contain-size" />
                    </TouchableOpacity>
                </View>

                <Text className="mt-8 text-center text-sm font-okra font-medium mx-10 color-gray-500">By Signing up you agree to our Terms and Conditions and Privacy Policy.</Text>
            </View>
        </View >
    );
};

export default LoginScreen;
