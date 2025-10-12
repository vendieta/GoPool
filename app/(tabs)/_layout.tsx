import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useTheme } from '@/components/Themed/ContextTheme';
import AntDesign from '@expo/vector-icons/AntDesign';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  console.log('🚀 Renderizando TabLayout');





  const { theme } = useTheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {

    if (loaded ) {

      SplashScreen.hideAsync();
    }
  }, [loaded]);




  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: 'oranje' }}></View> ;
  }

  const backgroundColor = theme.name === 'light' ? '#fff' : '#333';
  const activeTintColor = theme.name === 'light' ? Colors.light.primary : Colors.dark.primary;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Tabs
        screenOptions={{
          animation: 'none',
          tabBarActiveTintColor: activeTintColor,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});