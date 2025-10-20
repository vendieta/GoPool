import ScrollRefresh from '@/components/ScrollRefresh';
import { useLoginContext } from '@/hooks/useLoginContext';
import { useRoleContext } from '@/hooks/useRoleContext';
import useStorage from '@/hooks/useStorage';
import { router, useNavigation } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import LoginScreen from '../(sesionScreen)/LoginScreen';

// Evitar que el splash se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  console.log('🚀🚀🚀🚀🚀🚀🚀🚀 Renderizando HomeScreen');
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
  console.log('Los storage:   ',expiresAt,lastName,name,role,userEmail,userId,refresh_token,access_token);
  console.log('loadings de los storage:   ',loadingAccess_token,loadingRefresh_token,loadingId,loadingUserEmail,loadingRole,loadingName,loadingLastName );
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
      console.log('se esta cambiando la sesion📉📉📉📉📉📉📉📉📉📉📉')
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
      console.log('borrar sesion:  ',access_token,refresh_token,userEmail,userId,role);
      await removeRefresh_token('refresh_token');
      await removeAccess_token('access_token');
      await removeUserEmail('userEmail');
      await removeId('userId');
      await removeRole('role');
      await removeName('name');
      await removeLastName('lastName');
      await removeExpiresAt('expiresAt');
      // await removeCars('cars')
      if (state) {
        toggleState();
      }
      if (isDriver){toggleRole()};
      console.log('borrar el torage en el index:   ',access_token,refresh_token,userEmail,userId,role);
    router.replace('/');
  };
  
  console.log('condicion para cerrar sesion en index',(!refresh_token && state) && (!expiresAt && state) && (access_token || refresh_token || userEmail || userId || role) && !loadingAccess_token && !loadingRefresh_token && !loadingId && !loadingUserEmail && !loadingRole && !loadingName && !loadingLastName);
  if ((!refresh_token && state) && (!expiresAt && state) && (access_token || refresh_token || userEmail || userId || role) && !loadingAccess_token && !loadingRefresh_token && !loadingId && !loadingUserEmail && !loadingRole && !loadingName && !loadingLastName) {
    outSession();
  }

  }, [refresh_token, expiresAt, loadingAccess_token, loadingRefresh_token, loadingId, loadingUserEmail, loadingRole, loadingName, loadingLastName]);

  // Mostrar pantalla de carga si no se ha terminado de cargar
  if (isLoading || ((expiresAt && Date.now() > Number(expiresAt)) && state)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={'green'}/>
      </View>
    );
  }
 
  console.log('👺📉📉📉📉📉📉📉📉', state)
  // Mostrar contenido según autenticación
  return state ? <ScrollRefresh /> : <LoginScreen />;
}
