import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/components/Themed/ContextTheme';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MyContextLogin } from '@/hooks/useLoginContext';
import { RoleProvider } from '@/hooks/useRoleContext';
import { refreshTokens } from '@/scripts/Refresh';
import useStorage from '@/hooks/useStorage';
import { AppState } from 'react-native'


// Evita que el splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const {
    storedValue: expiresAt,
    setItem: setExpiresAt,
  } = useStorage('expiresAt');


  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Pantalla de carga mientras se cargan las fuentes
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background }} />
    );
  }



useEffect(() => {
  const subscription = AppState.addEventListener('change', async (state) => {
    if (state === 'active') {
      if (Date.now() >= Number(expiresAt)) {
        await refreshTokens()
      }
    }
  })

  return () => subscription.remove()
}, [])

  return (
    <MyContextLogin>
      <RoleProvider>
        <ThemeProvider>
            {/* StatusBar configurable */}
            <StatusBar/>
            <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack 
                screenOptions={{ 
                  animation: 'fade', 
                  presentation: 'modal',
                  headerShown: false // Ocultar header por defecto
                }}
              >
                {/* Grupos de rutas principales */}
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(sesionScreen)" />
                <Stack.Screen name="(serviceScreen)" />
                
                {/* Rutas específicas */}
                <Stack.Screen 
                  name="+not-found" 
                  options={{ 
                    title: 'Página no encontrada',
                    animation: 'fade'
                  }} 
                />
                
              </Stack>
            </NavigationThemeProvider>
        </ThemeProvider>
      </RoleProvider>
    </MyContextLogin>
  );
}