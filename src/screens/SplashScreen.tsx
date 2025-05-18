import { View, Image, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { resetAndNavigate } from '../utils/NavigationUtils';
import { getString } from '../service/storage';
import { jwtDecode } from 'jwt-decode';
import { refreshTokens } from '../service/request/auth';

interface DecodedToken {
    exp: number
}

const SplashScreen = () => {

    const tokenCheck = async () => {
        const accessToken = getString('accessToken');
        const refreshAccessToken = getString('refreshAccessToken');
        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
            const decodedRefreshAccessToken = refreshAccessToken ? jwtDecode<DecodedToken>(refreshAccessToken) : null;

            const currentTime = Date.now() / 1000;
            if (decodedRefreshAccessToken !== null && decodedRefreshAccessToken.exp < currentTime) {
                resetAndNavigate('Login');
                Alert.alert('Session expired, please login again!');
                return;
            }

            if (decodedAccessToken?.exp < currentTime) {
                const refreshed = await refreshTokens();
                if (!refreshed) {
                    Alert.alert('There was an error!');
                    return;
                }
            }

            resetAndNavigate('Home');
            return;
        }
        resetAndNavigate('Login');
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            tokenCheck();
        }, 1000);

        return (() => clearTimeout(timeoutId));
    }, []);

    return (

        <View className="flex-1 justify-center bg-white items-center">
            <Image
                source={require('../assets/images/logo_t.png')}
                className="h-[30%] w-[60%]"
                resizeMode="contain" />
        </View>
    );
};

export default SplashScreen;
