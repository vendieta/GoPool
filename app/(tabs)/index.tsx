import ScrollRefresh from '@/components/ScrollRefresh';
import { useEffect } from 'react';
import { useNavigation } from "expo-router";
import { useUserInfo } from '@/hooks/userContext';
import LoginScreen from '@/app/(sesionScreen)/homeLogin';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// ! mejorar esta pantalla porque cuando se abre se muestra el login por un tiempo y despues el index

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const { session } = useUserInfo();
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



// import ScrollRefresh from '@/components/ScrollRefresh';
// import { useEffect , useState} from 'react';
// import { useNavigation, useRouter } from "expo-router";
// import { useUserInfo } from '@/hooks/userContext';
// import LoginScreen from '../(sesionScreen)/homeLogin';
// import * as SplashScreen from 'expo-splash-screen';
// import { useFonts } from 'expo-font';

// // // debo descomentar el codigo que esta en el archivo fontfaceobserver.standalone.js

// SplashScreen.preventAutoHideAsync();

// export default function HomeScreen() {
//   const { session } = useUserInfo();
//   const navigation = useNavigation();
//   const [loaded] = useFonts({
//       SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
//     });
  
//     useEffect(() => {
//       if (loaded) {
//         SplashScreen.hideAsync();
//       }
//     }, [loaded]);
  
//     if (!loaded) {
//       return null;
//     }
//   useEffect(() => {
//     console.log("Valor de session:", session); // Ver si cambia en tiempo real
//     if (!session) {
//       navigation.setOptions({
//         tabBarStyle: { display: "none" },
//         headerShown: false
//       });
//     } else {
//       navigation.setOptions({
//         headerShown: true,
//         tabBarStyle: { display: "flex" }, // Vuelve a mostrarlo si el usuario inicia sesión
//       });
//     }
//   }, [session, navigation]); // Se ejecuta cuando `session` cambia


//   return session ? <ScrollRefresh /> : <LoginScreen />;
// }



