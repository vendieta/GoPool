import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { useFonts } from 'expo-font';

// SplashScreen.preventAutoHideAsync();

export default function layout() {
  // const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }
    
  return(
      <Stack initialRouteName="LoginScreen" screenOptions={{animation: 'none', headerShown: false, 
      // presentation:'modal'
      }}>
        {/* <Stack.Screen name="index" options={{ 
        headerShown: false,
        headerLeft: () => null, // Pasar una función que retorne 
        gestureEnabled: false, // Deshabilitar gesto de retroceso en 
        }}/> */}
          <Stack.Screen name="LoginScreen" />
          <Stack.Screen name="createCount" />
          <Stack.Screen name="createCountDriver" />
          <Stack.Screen name="createCountUser" />
       {/* <Stack.Screen name="homeLogin" options={{title:'Configuraciones', headerShown: false}}/> */}
        
      </Stack>
  )
} 