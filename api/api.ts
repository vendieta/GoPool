// src/api/api.ts
import axios from 'axios';
import { Alert } from 'react-native';

const api = axios.create({
    baseURL: 'https://qb2dfea1va.execute-api.us-east-2.amazonaws.com/v1',
    timeout: 7000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response) {
        console.error('Error de respuesta:', error.response.status, error.response.data);
        error.response.data.msg?  Alert.alert("Error", error.response.data.msg) : 
        error.response.data.error.message ?  Alert.alert("Error", error.response.data.error.message) :
        error.response.data ?  Alert.alert("Error", error.response.data.error) : null; 
    } else if (error.request) {
        console.error('Error de conexión:', error.request);
    } else {
        console.error('Error:', error.message);
    }
    return Promise.reject(error);
}
);

// export const setAuthToken = (token: string | null) => {
// if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// } else {
//     delete api.defaults.headers.common['Authorization'];
// }
// };

export const apiService = {
get: async <T>(endpoint: string, params?: any, config?: any): Promise<T> => {
    const response = await api.get<T>(endpoint, { params, ...config });
    return response.data;
},
post: async <T>(endpoint: string, data: any, config?: any): Promise<T> => {
    const response = await api.post<T>(endpoint, data, config);
    return response.data;
},
put: async <T>(endpoint: string, data: any, config?: any): Promise<T> => {
    const response = await api.put<T>(endpoint, data, config);
    return response.data;
},
delete: async <T>(endpoint: string, config?: any): Promise<T> => {
    const response = await api.delete<T>(endpoint, config);
    return response.data;
},
};

export default api;
