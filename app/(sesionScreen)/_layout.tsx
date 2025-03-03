import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { AuthProvider } from "@/hooks/userContext";

SplashScreen.preventAutoHideAsync();

export default function layout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
    
  return(
    <AuthProvider>
      <Stack screenOptions={{animation: 'none', presentation:'modal'}}>
        <Stack.Screen name="index" options={{ 
        headerShown: false,
        headerLeft: () => null, // Pasar una función que retorne 
        gestureEnabled: false, // Deshabilitar gesto de retroceso en 
        }}/>
        <Stack.Screen name="createCount" options={{title:'Estado de cuenta', headerShown: false}}/>
        <Stack.Screen name="sesionOn" options={{title:'buy', headerShown: false}}/>
        <Stack.Screen name="createCountU" options={{title:'Configuraciones', headerShown: false}}/>
        <Stack.Screen name="createCountE" options={{title:'Configuraciones', headerShown: false}}/>
      </Stack>
    </AuthProvider>
  )
}