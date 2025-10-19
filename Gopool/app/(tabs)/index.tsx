import ScrollRefresh from '@/components/ScrollRefresh';
import { router, useNavigation } from "expo-router";
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
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
    storedValue: access_token,
    setItem: setAccess_token,
    removeItem: removeAccess_token,
    loadingStorage: loadingAccess_token
  } = useStorage('access_token');
  const {
    storedValue: refresh_token,
    setItem: setRefresh_token,
    removeItem: removeRefresh_token,
    loadingStorage: loadingRefresh_token
  } = useStorage('refresh_token');
  const {
    storedValue: userId,
    setItem: setId,
    removeItem: removeId,
    loadingStorage: loadingId
  } = useStorage('userId');
  const {
    storedValue: userEmail,
    setItem: setUserEmail,
    removeItem: removeUserEmail,
    loadingStorage: loadingUserEmail
  } = useStorage('userEmail');
  const {
    storedValue: role,
    setItem: setRole,
    removeItem: removeRole,
    loadingStorage: loadingRole
  } = useStorage('role');
  const {
    storedValue: name,
    setItem: setName,
    removeItem: removeName,
    loadingStorage: loadingName
  } = useStorage('name');
  const {
    storedValue: lastName,
    setItem: setLastName,
    removeItem: removeLastName,
    loadingStorage: loadingLastName,
  } = useStorage('lastName');
  const {
    storedValue: expiresAt,
    setItem: setExpiresAt,
    removeItem: removeExpiresAt,
  } = useStorage('expiresAt');
  console.log('rol inicial',isDriver)
  console.log('storage del rol: ', role, !role)
  console.log(expiresAt,lastName,name,role,userEmail,userId,refresh_token,access_token);
  console.log(loadingAccess_token,loadingRefresh_token,loadingId,loadingUserEmail,loadingRole,loadingName,loadingLastName );
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

  // Cargar splash y fuentes
  useEffect(() => {
    const initialize = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular carga evita que aparezca una pantalla antes de la otra
      setIsLoading(false);
      if (!loadingAccess_token && !loadingRefresh_token && !loadingId && !loadingUserEmail && !loadingRole && !loadingName && !loadingLastName) {
        await SplashScreen.hideAsync();
      }
    };
    initialize();
  }, [loadingAccess_token, loadingRefresh_token, loadingId, loadingUserEmail, loadingRole, loadingName, loadingLastName]);

  // Navegación: configura el tabBar según sesión
  useEffect(() => {
    if (!state || (expiresAt && Date.now() > Number(expiresAt))) {
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
  }, [navigation, state, expiresAt]);


  useEffect(() => {
    // pendieta poner un alert de error de sesion expirada
    const outSession = async () => {
      console.log(access_token,refresh_token,userEmail,userId,role);
      await removeRefresh_token('refresh_token');
      await removeAccess_token('access_token');
      await removeUserEmail('userEmail');
      await removeId('userId');
      await removeRole('role');
      await removeName('name');
      await removeLastName('lastName');
      await removeExpiresAt('expiresAt');
      // await removeCars('cars')
      toggleState();
      if (isDriver){toggleRole()};
      console.log(access_token,refresh_token,userEmail,userId,role);
    router.replace('/');
  };

  if ( !refresh_token && state ) {
    outSession();
  }

  }, [refresh_token]);

  // Mostrar pantalla de carga si no se ha terminado de cargar
  if (isLoading || ((expiresAt && Date.now() > Number(expiresAt)) && state)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={'green'}/>
      </View>
    );
  }

  // Mostrar contenido según autenticación
  return state ? <ScrollRefresh /> : <LoginScreen />;
}
