import ScrollRefresh from '@/components/ScrollRefresh';
import { useEffect, useState } from 'react';
import { useNavigation } from "expo-router";
import { useUserInfo } from '@/hooks/userContext';
import LoginScreen from '@/app/(sesionScreen)/homeLogin';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// ! mejorar esta pantalla porque cuando se abre se muestra el login por un tiempo y despues el index

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const { session, isLoading } = useUserInfo();
  // const { session, isLoading } = {session: 'true', isLoading: true};
  console.log('esto es lo que sale en la sesion del home:     ', session)
  const navigation = useNavigation();
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Se maneja la carga de fuentes y actualización de navegación en un solo useEffect
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // Esconde el splash cuando las fuentes se cargan
    }
    
    // Controlar las opciones de navegación solo cuando session y loaded cambien
    if (session === null) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
        headerShown: false
      });
    } else {
      navigation.setOptions({
        headerShown: true,
        tabBarStyle: { display: "flex" }, // Muestra tabBar si hay sesión
      });
    }

  }, [session, loaded, navigation]);

  if (isLoading) {
    return null; // Aquí puedes poner un spinner
  }
  // Si hay error al cargar las fuentes, puedes manejarlo aquí.
  if (error) {
    console.error('Error al cargar las fuentes:', error);
    return null; // O un componente de fallback visual
  }

  if (!loaded) {
    return null; // Puedes poner un spinner o algo que indique carga
  }

  return session ? <ScrollRefresh /> : <LoginScreen />;
}



