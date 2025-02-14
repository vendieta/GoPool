import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native'; // Asegúrate de importar estos componentes

// Componentes
import HomeScreen from './(tabs)/index'; // Asegúrate de que sea un componente
import Sesion from './(tabs)/profile'; // Asegúrate de que sea un componente

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        component={HomeScreen}
        options={{ title: 'Inicio', headerShown:true }}
      />
      <Stack.Screen
        name="Profile"
        component={Sesion}
        options={{ title: 'Perfil' }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}