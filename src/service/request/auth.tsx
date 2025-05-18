import axios from 'axios';
import { resetAndNavigate } from '../../utils/NavigationUtils';
import apiClient from '../apiClient';
import { deleteFromMMKV, getString, setString } from '../storage';

export const loginWithGoogle = async (idToken: string) => {
    const { data } = await apiClient.post('/user/login', { id_token: idToken });
    setString('accessToken', data?.accessToken);
    setString('refreshAccessToken', data?.refreshAccessToken);
    return data?.user;
};

export const logout = () => {
    deleteFromMMKV('accessToken');
    deleteFromMMKV('refreshAccessToken');
    resetAndNavigate('Login');
};

export const refreshTokens = async (): Promise<boolean> => {
    try {
        const refreshToken = getString('refreshAccessToken');

        if (!refreshToken) {
            throw new Error('No refresh token found!');
        }

        const { data } = await axios.post('/user/refresh', {
            refreshToken,
        });

        if (data?.accessToken) {
            setString('accessToken', data?.accessToken);
            return true;
        }

        throw new Error('Invalid refresh response');

    } catch (error) {
        console.log(error);
        logout();
        return false;
    }
};





