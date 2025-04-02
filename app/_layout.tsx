import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/hooks/userContext';
import { ThemeProvider } from '@/components/Themed/ContextTheme'; // Nuestro ThemeProvider

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider> {/* Nuestro ThemeProvider para el ThemeContext */}
        <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ animation: 'fade', presentation: 'modal' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="(secondaryTabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(sesionScreen)" options={{ headerShown: false }} />
            <Stack.Screen name="(serviceScreen)" options={{ headerShown: false }} />
            <Stack.Screen name="(createService)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </NavigationThemeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}