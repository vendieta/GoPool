import ScrollRefresh from '@/components/ScrollRefresh';
import LoginScreen from '@/app/(sesionScreen)/homeLogin';
import { useNavigation } from "expo-router";
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Configuración inicial del splash screen
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  // Estados para simular la sesión (esto será reemplazado por tu lógica real después)
  const [session, setSession] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Efecto para manejar la carga inicial
  useEffect(() => {
    const initialize = async () => {
      // Simulación de carga de sesión (1.5 segundos)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aquí iría tu lógica real de verificación de sesión
      // setSession(!!sessionReal);
      
      setSession(false); // Simulamos que no hay sesión por defecto
      setIsLoading(false);
      
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    initialize();
  }, [fontsLoaded]);

  // Efecto para manejar cambios en la navegación
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: session ? "flex" : "none" },
      headerShown: !!session
    });
  }, [session, navigation]);

  // Pantalla de carga mientras se inicializa
  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Renderizado condicional basado en el estado de sesión
  return session ? <ScrollRefresh /> : <LoginScreen />;
}