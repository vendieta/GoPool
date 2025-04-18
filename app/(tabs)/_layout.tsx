import { Tabs } from 'expo-router';
import React , { useEffect} from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Slot } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { ThemedView } from '@/components/ThemedView';
import { ThemeProvider } from '@/hooks/useContextTheme';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
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
    // este themedView no hace nada por ahora no lo quito pero para producciion si 
    <ThemeProvider>
      <Tabs
        screenOptions={{
          animation: 'none', 
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            headerShown:true,
            headerTitle:'GOPOOL',
            title: 'HOME',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="rutas"
          options={{
            title: 'Ruta',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={color} />,
          }}
        />
        
        
      </Tabs>  
    </ThemeProvider>
    )
}
