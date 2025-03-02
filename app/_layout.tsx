import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/hooks/userContext';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  // const router = useRouter();
  // router.replace('/createRouteUser');r
  
  // const router = useRouter();
  // const [user, setUser] = useState(false);  // Inicializa el estado como null en lugar de false
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

  // useEffect(() => {
  //   if (user === false) {
  //     // Puedes agregar alguna lógica para verificar si el usuario está autenticado
  //     // Si el usuario no está autenticado, rediriges al formulario de creación de usuario
  //     router.replace('/createRouteUser');
  //   }
  // }, [router]);



  return (
    //   {/* // Este codigo nos permite hacer adaptativo la apk para el tema que tenga el usuario */}
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name='(secondaryTabs)' options={{headerShown: false}}/>
          <Stack.Screen name='(sesionScreen)' options={{headerShown: false}}/>
          <Stack.Screen name='(createService)' options={{headerShown: false}}/>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
