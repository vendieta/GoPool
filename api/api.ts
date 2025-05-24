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
        error.response.data.msg?  Alert.alert("Error", error.response.data.msg) : null;
        error.response.data.error.message ?  Alert.alert("Error", error.response.data.error.message) : null;
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
get: async <T>(endpoint: string, params?: any): Promise<T> => {
    const response = await api.get<T>(endpoint, { params });
    return response.data;
},
post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await api.post<T>(endpoint, data);
    return response.data;
},
put: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await api.put<T>(endpoint, data);
    return response.data;
},
delete: async <T>(endpoint: string): Promise<T> => {
    const response = await api.delete<T>(endpoint);
    return response.data;
},
};

export default api;
// // src/api/api.ts
// import axios from 'axios';

// // Configuración básica de Axios
// const api = axios.create({
//   baseURL: 'https://qb2dfea1va.execute-api.us-east-2.amazonaws.com/v1', // Reemplaza con la URL de tu API
//   timeout: 10000, // Tiempo de espera antes de cancelar la petición
//   headers: {
//     'Content-Type': 'application/json',
//     // Puedes agregar headers comunes aquí, como tokens de autenticación
//   },
// });

// // Interceptor para manejar errores globalmente
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // El servidor respondió con un código de estado fuera del rango 2xx
//       console.error('Error de respuesta:', error.response.status, error.response.data);
//     } else if (error.request) {
//       // La petición fue hecha pero no se recibió respuesta
//       console.error('Error de conexión:', error.request);
//     } else {
//       // Algo pasó al configurar la petición
//       console.error('Error:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // Función para establecer el token de autenticación
// export const setAuthToken = (token: string | null) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };

// // Ejemplos de funciones para consumir la API
// export const apiService = {
//   // Ejemplo para GET
//   get: async <T>(endpoint: string, params?: any): Promise<T> => {
//     const response = await api.get<T>(endpoint, { params });
//     return response.data;
//   },

//   // Ejemplo para POST
//   post: async <T>(endpoint: string, data: any): Promise<T> => {
//     const response = await api.post<T>(endpoint, data);
//     return response.data;
//   },

//   // Ejemplo para PUT
//   put: async <T>(endpoint: string, data: any): Promise<T> => {
//     const response = await api.put<T>(endpoint, data);
//     return response.data;
//   },

//   // Ejemplo para DELETE
//   delete: async <T>(endpoint: string): Promise<T> => {
//     const response = await api.delete<T>(endpoint);
//     return response.data;
//   },
// };

// export default api;