// src/hooks/useApi.ts
import { useState, useCallback } from 'react';
import { apiService } from '../api/api';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  get: (endpoint: string, params?: any, config?: any) => Promise<void>;
  post: (endpoint: string, data: any, config?: any) => Promise<void>;
  put: (endpoint: string, data: any, config?: any) => Promise<void>;
  delete: (endpoint: string, config?: any) => Promise<void>;
}

export const useApi = <T>(): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const get = useCallback(async (endpoint: string, params?: any, config?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get<T>(endpoint, params, config);
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Error al realizar la solicitud GET');
    } finally {
      setLoading(false);
    }
  }, []);

  const post = useCallback(async (endpoint: string, data: any, config?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.post<T>(endpoint, data, config);
      console.log('apirespondedor: ', response)
      setData(response);
    } catch (err: any) {
      console.log('api: ', err)
      setError(err.message || 'Error al realizar la solicitud POST');
    } finally {
      setLoading(false);
    }
  }, []);

  const put = useCallback(async (endpoint: string, data: any, config?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.put<T>(endpoint, data, config);
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Error al realizar la solicitud PUT');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRequest = useCallback(async (endpoint: string, config?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.delete<T>(endpoint, config);
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Error al realizar la solicitud DELETE');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    delete: deleteRequest,
  };
};