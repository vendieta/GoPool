import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
// // Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// const Stack = createStackNavigator();
// const user = false;

export default function RootLayout() {
  const [user, setUser] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    if (user !== undefined) {
      router.replace(user ? './app/(tabs)' : '/sesionOff');
  }},[user]);

  return (
    //   {/* // Este codigo nos permite hacer adaptativo la apk para el tema que tenga el usuario */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name='(secondaryTabs)' options={{headerShown: false}}/>
          <Stack.Screen name='(sesionScreen)' options={{headerShown: false}}/>
          
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
  );
}
