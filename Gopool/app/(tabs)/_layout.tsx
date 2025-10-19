import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useEffect, useState } from 'react';
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native';
// import TabBarBackground from '@/components/ui/TabBarBackground';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import * as SplashScreen from 'expo-splash-screen';
// import { useFonts } from 'expo-font';
// import { useTheme } from '@/components/Themed/ContextTheme';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function TabLayout() {
  console.log('🚀 Renderizando TabLayout');
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // animation: 'none',
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
            headerShown: true,
            headerTitle: 'GOPOOL',
            headerRight: () => ( <TouchableOpacity
              onPress={() => alert("Botón derecho presionado!")}
              style={{ paddingHorizontal: 5, marginRight: 15}}
            >
              <AntDesign name="filter" size={24} color="white" />
              {/* También podrías usar un <Text> o cualquier componente */}
            </TouchableOpacity>),
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} 
            />,
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
  );
}
