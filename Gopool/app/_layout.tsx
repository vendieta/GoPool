import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
// import { useFonts } from 'expo-font';
import { useEffect } from 'react';
// import { View } from 'react-native';
import { MyContextLogin } from '@/hooks/useLoginContext';
import { RoleProvider } from '@/hooks/useRoleContext';
import useStorage from '@/hooks/useStorage';
import useRefreshTokens from '@/hooks/useRefreshTokens';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const {refreshTokens } = useRefreshTokens();
  const {
    storedValue: expiresAt,
    setItem: setExpiresAt,
  } = useStorage('expiresAt');


  useEffect(() => {
    console.log('⏳ Comprobando estado de la sesión...');
    if (!expiresAt || Date.now() < Number(expiresAt)) {
      console.log('✅ Sesión válida, cargando aplicación...');  
      
    }
  }, [expiresAt]);

   useEffect(() => {
    const refresh = async () => {
      if (expiresAt && Date.now() >= Number(expiresAt)) {
        console.log('🤠Token expirado, refrescando...');
        await refreshTokens()
      }
    }
    
    refresh();
  }, [expiresAt]);

  

  return (
    <MyContextLogin>
      <RoleProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              animation: 'fade',
              // presentation: 'modal',
              headerShown: false,
            }}
          >
            {/* Grupos de rutas principales */}
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(sesionScreen)" />
            <Stack.Screen name="(serviceScreen)" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </RoleProvider>
    </MyContextLogin>
  );
}
