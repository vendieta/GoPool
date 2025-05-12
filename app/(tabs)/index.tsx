import ScrollRefresh from '@/components/ScrollRefresh';
import { useNavigation } from "expo-router";
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import LoginScreen from '../(sesionScreen)/homeLogin';
import useStorage from '@/hooks/useStorage';
import { useAuth } from '@/hooks/useContext';

// Evitar que el splash se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const { refreshToken, loading } = useStorageContext(); // Hook correcto
  const { setIsAuthenticated } = useAuth(); // Hook del AuthContext

  const [fontsLoaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Cargar splash y fuentes
  useEffect(() => {
    const initialize = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular carga
      setIsLoading(false);
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    initialize();
  }, [fontsLoaded]);

  // Autenticación: actualiza isAuthenticated en cuanto se tenga refreshToken
  useEffect(() => {
    if (!loading) {
      if (refreshToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [refreshToken, loading]);

  // Navegación: configura el tabBar según sesión
  useEffect(() => {
    if (!refreshToken) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
        headerShown: false
      });
    } else {
      navigation.setOptions({
        headerShown: true,
        tabBarStyle: { display: "flex" },
      });
    };
  }, [navigation, refreshToken]);

  // Mostrar pantalla de carga si no se ha terminado de cargar
  if (!fontsLoaded || isLoading || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Mostrar contenido según autenticación
  return refreshToken ? <ScrollRefresh /> : <LoginScreen />;
}
