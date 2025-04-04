import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/components/Themed/ContextTheme';
import { View } from 'react-native';

// Evita que el splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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

  return (
    <ThemeProvider>
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
          
          {/* StatusBar configurable */}
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </Stack>
      </NavigationThemeProvider>
    </ThemeProvider>
  );
}