import ScrollRefresh from '@/components/ScrollRefresh';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useNavigation, useRouter } from "expo-router";
import { View } from "react-native"; 
import { useUserInfo } from '@/hooks/userContext';
import LoginScreen from '../(sesionScreen)/home';
import { HeaderStyleInterpolators } from '@react-navigation/stack';

export default function HomeScreen() {
  const { session } = useUserInfo();
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Valor de session:", session); // Ver si cambia en tiempo real
    if (!session) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
        headerShown: false
      });
    } else {
      navigation.setOptions({
        headerShown: true,
        tabBarStyle: { display: "flex" }, // Vuelve a mostrarlo si el usuario inicia sesión
      });
    }
  }, [session, navigation]); // Se ejecuta cuando `session` cambia

  return session ? <ScrollRefresh /> : <LoginScreen />;
}




// import ScrollRefresh from '@/components/ScrollRefresh';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { useEffect, useState } from 'react';
// import { useNavigation , useRouter } from "expo-router";
// import { View } from "react-native"; 
// import { useUserInfo } from '@/hooks/userContext';
// import LoginScreen from '../(sesionScreen)';
// // debo descomentar el codigo que esta en el archivo fontfaceobserver.standalone.js
// {/*ESTA ES LA PANTALLLA DE INICIO SERIA COMO EL INDEX 
//   expo install expo-location
//   expo install react-native-maps

//   */}

// export default function HomeScreen() {
//   const isAuthenticated = false;
//   const router = useRouter();
//   const navigation = useNavigation();

//   const { session } = useUserInfo();
//   console.log('estas esto es la sesion que no me permite pasar:',session)
//   if ( session ) {
//     return <ScrollRefresh/>
//     } else {
//       navigation.setOptions({
//         tabBarStyle: { display: "none" }, // Oculta el TabBar en esta pantalla
//       });
//       return  <LoginScreen/>
//       };
//   }
