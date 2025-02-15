import React , {useEffect} from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationIndependentTree, ThemeProvider , DarkTheme , DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import { Platform, SafeAreaView } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Componentes
import HomeScreen from './app';
import NotFoundScreen from '../+not-found';
import Perfil from './profile';
import Rutas from './rutas';
import createCount from '../(sesionScreen)/createCount';
import sesionOff from '../(sesionScreen)/sesionOff';

const user = false;

export default function Navigation() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style='dark' translucent={true}/>
      <NavigationIndependentTree>
        {user ? <LoginOn/> : <LoginOff/>}
      </NavigationIndependentTree>
    </>


  );
}

const Stack = createNativeStackNavigator();

function LoginOff() {
  const colorScheme = useColorScheme();

  return (
  
    <Stack.Navigator
    // screenOptions={
    //   {statusBarTranslucent: true,
    //     statusBarBackgroundColor: colorScheme === 'dark' ? 'light' : 'auto' ,
    //     statusBarStyle: colorScheme === 'dark' ? 'light' : 'auto'
    //   }}
    >
      <Stack.Screen
        name="Root"
        component={sesionOff}
        options={{ headerShown: false }}
        />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
        />
       
      {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group> */}
    </Stack.Navigator>
    
  );
};

function LoginOn(){
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name='LoginOn'
        options={{headerShown:false}}
        component={BottomTabNavigator}

        />
    </Stack.Navigator>
  );
};

const BottomTap= createBottomTabNavigator();

function BottomTabNavigator(){
  return(
    <BottomTap.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
        // tabBarActiveTintColor: Colors[colorScheme].tint,
      >
      <BottomTap.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'GOPOOL',
          tabBarLabel: 'Home',
          headerShown: true,
          headerStyle: {
            backgroundColor: 'black' 
          },
          
          headerTitleStyle:{
            color: 'white'
          },
          
          // tabBarIcon({color, size}) {
          // },
        }}
        />
      
      <BottomTap.Screen
        name='Rutas'
        component={Rutas}
        options={{
          title: 'Rutas',
          headerShown: false,
          // tabBarIcon({color, size}) {
          // },
        }}
        />
      
      <BottomTap.Screen
        name='Perfil'
        component={Perfil}
        options={{
          title: 'Perfil',
          headerShown: false,
          // tabBarIcon({color, size}) {
          // },
        }}
        />
      
    </BottomTap.Navigator>
  );
}