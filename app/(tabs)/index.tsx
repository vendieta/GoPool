import ScrollRefresh from '@/components/ScrollRefresh';
import { useNavigation } from "expo-router";
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import LoginScreen from '../(sesionScreen)/LoginScreen';
import { useLoginContext } from '@/hooks/useLoginContext';
import useStorage from '@/hooks/useStorage';
import { useRoleContext } from '@/hooks/useRoleContext';

// Evitar que el splash se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const { isDriver, toggleRole } = useRoleContext();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const {state, toggleState} = useLoginContext();
  const {
    storedValue: refresh_token
  } = useStorage('refresh_token');
  const {
    storedValue: role,
    setItem: setRole,
  } = useStorage('role');
  console.log('rol inicial',isDriver)
  console.log('storage del rol: ', role, !role)
  // console.log('este es el storage que se ve si se guarda en web:    ', refresh_token)
  // console.log('este es el state:    ',state)
  // useEffect(() => {
  //   if (refresh_token) {
  //     if (!state) {
  //       toggleState()
  //     }
  //   }
  // }, [])
  console.log('esto es el tipo que se muestra: ', role)
  console.log('esto es el tipo que se muestra: ', role)
  useEffect(() => {
    if (refresh_token && !state) {
      toggleState()
    }
  }, [refresh_token])

  useEffect(() => {
    if ( !isDriver && role) {
      toggleRole()
    }
  }, [role])


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

  // Navegación: configura el tabBar según sesión
  useEffect(() => {
    if (!state) {
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
  }, [navigation, state]);

  // Mostrar pantalla de carga si no se ha terminado de cargar
  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Mostrar contenido según autenticación
  return state ? <ScrollRefresh /> : <LoginScreen />;
}
