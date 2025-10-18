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
import { MyContextLogin, useLoginContext } from '@/hooks/useLoginContext';
import { RoleProvider } from '@/hooks/useRoleContext';
import { refreshTokens } from '@/scripts/Refresh';
import useStorage from '@/hooks/useStorage';
import { AppState } from 'react-native';
import useRefreshTokens from '@/hooks/useRefreshTokens';


// Evita que el splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  console.log('🌟 Renderizando RootLayout');
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const {refreshTokens } = useRefreshTokens();
  const {
    storedValue: expiresAt,
    setItem: setExpiresAt,
  } = useStorage('expiresAt');
  
  useEffect(() => {
    console.log('⏳ Comprobando estado de la sesión...');
    if ((fontsLoaded || fontError) && (!expiresAt || Date.now() < Number(expiresAt))) {
      console.log('✅ Sesión válida, cargando aplicación...');  
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, expiresAt]);

  
  useEffect(() => {
    const refresh = async () => {
      if (expiresAt && Date.now() >= Number(expiresAt)) {
        console.log('🤠Token expirado, refrescando...');
        await refreshTokens()
      }
    }
    
    refresh();
  }, [expiresAt]);
  
  // Pantalla de carga mientras se cargan las fuentes
  if (!fontsLoaded) {
    return (
      // <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background }} />
      <View style={{ flex: 1, backgroundColor: 'oranje' }}></View> 
    );
  }
  
  
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