import { useApi } from '@/hooks/useApi';
import useStorage from '@/hooks/useStorage';

interface data {
	accessToken: string,
	refreshToken: string
}

export async function refreshTokens() {
  const { data, loading, error, post } = useApi<data>();

  const {
    storedValue: refresh_token,
    setItem: setRefresh_token,
  } = useStorage('refresh_token');
  const {
    storedValue: access_token,
    setItem: setAccess_token,
  } = useStorage('access_token');
  const {
    storedValue: expiresAt,
    setItem: setExpiresAt,
  } = useStorage('expiresAt');
  

  if (!refresh_token) return false

  try {
     await post('/api/auth/refresh_access_token', {
      refreshToken: refresh_token
      })
    // const res = await fetch('https://tu-api.com/api/auth/refresh', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ refresh_token: refresh_token }),
    // })

    if (error) return false

    const expiresAt = Date.now() + 3000 * 1000;

    if (data) {
      setAccess_token('access_token', data?.accessToken)
      setRefresh_token('refresh_token', data?.accessToken)
      setExpiresAt('expiresAt', expiresAt.toString())
    }

    return true
  } catch (e) {
    return false
  }
}