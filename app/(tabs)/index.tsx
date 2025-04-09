import ScrollRefresh from '@/components/ScrollRefresh';
import { useNavigation } from "expo-router";
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Configuración inicial del splash screen
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Efecto para manejar la carga inicial
  useEffect(() => {
    const initialize = async () => {
      // Simulación de carga inicial (1 segundo)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    initialize();
  }, [fontsLoaded]);

  // Configuración de navegación
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "flex" }, // Siempre mostrar la barra de pestañas
      headerShown: true // Siempre mostrar el header
    });
  }, [navigation]);

  // Pantalla de carga mientras se inicializa
  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Mostrar directamente el ScrollRefresh
  return <ScrollRefresh />;
}