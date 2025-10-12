// src/hooks/useRefreshTokens.ts
import { useEffect, useCallback } from 'react';
import { useApi } from '@/hooks/useApi';
import useStorage from '@/hooks/useStorage';
import { AppState } from 'react-native';

interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

export default function useRefreshTokens() {
  console.log('🙊🙊🙊el hook esta funcionando')
  const { data, error, post } = useApi<TokensResponse>();

  const {
    storedValue: refresh_token,
    setItem: setRefreshToken,
  } = useStorage('refresh_token');

  const {
    storedValue: access_token,
    setItem: setAccessToken,
  } = useStorage('access_token');

  const {
    storedValue: expiresAt,
    setItem: setExpiresAt,
  } = useStorage('expiresAt');

  useEffect(()=> {
    const newExpiresAt = Date.now() + 2 * 60 * 1000;
    // const newExpiresAt = Date.now() + 3000 * 1000;
    
    if (data) {
      console.log('🛅🛅🛅🛅datos del tokend', data?.accessToken, data?.refreshToken, newExpiresAt, data)
      setAccessToken('access_token', data.accessToken);
      setRefreshToken('refresh_token', data.refreshToken);
      setExpiresAt('expiresAt', newExpiresAt.toString());
    }
  },[data])

  // --- Función que hace el refresh manual o automático ---
  const refreshTokens = useCallback(async () => {
    if (!refresh_token) return false;

    try {
      await post('/api/auth/refresh_access_token', {
        refreshToken: refresh_token,
      });

      if (error) return false;

      return true;
    } catch {
      console.error('error en acctualizar el token')
      return false;
    }
  }, [refresh_token, data, error, post, setAccessToken, setRefreshToken, setExpiresAt]);

  // --- 1. Refresca automáticamente si la app vuelve al primer plano ---
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        console.log('🎉🎉🎉🎉 el volver a pantalla esta funcionando')
        if (Date.now() >= Number(expiresAt)) {
          await refreshTokens();
          console.log('📢📢📢📢📢📢 se actulizo el tokend por volver a primer plano')
        }
      }
    });

    return () => subscription.remove();
  }, [expiresAt, refreshTokens]);

  // --- 2. Opcional: chequeo automático cada cierto tiempo ---
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log('🎉🎉🎉🎉 el intervalo de tiempo esta funcionando')

      if (Date.now() >= Number(expiresAt)) {
        await refreshTokens();
        console.log('📣📣📣📣📣 se actulizo el tokend de forma atomaticamente')

      }
    }, 60 * 1000); // cada minuto

    return () => clearInterval(interval);
  }, [expiresAt, refreshTokens]);

  return { refreshTokens, access_token, error };
}
