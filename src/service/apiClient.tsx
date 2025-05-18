import axios from 'axios';
import { BASE_URL } from './config';
import { getString, setString } from './storage';

const apiClient = axios.create({
    baseURL: BASE_URL,
});


// Request interceptor
apiClient.interceptors.request.use(
    async config => {
        const token = getString('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);


// Response interceptor
apiClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 403) {
            const refreshToken = getString('refreshToken');
            if (!refreshToken) {
                Promise.reject(error);
            }
            try {
                const { data } = await apiClient.post(`${BASE_URL}/user/refresh`, {
                    refreshToken,
                });
                setString('accessToken', data?.accessToken);
                error.config.headers.Authorization = `Bearer ${data?.accessToken}`;
                return axios(error.config);

            } catch (refreshError) {
                Promise.reject(refreshError);
            }
            return Promise.reject(error);
        }
    }
);

export default apiClient
