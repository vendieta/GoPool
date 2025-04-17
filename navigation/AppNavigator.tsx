import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatListScreen } from '../app/(chat)/ChatListScreen';
import { ChatScreen } from '../app/(chat)/ChatScreen';
import { UserListScreen } from '../app/(chat)/UserListScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={({ route }) => ({
        headerBackTitleVisible: false,
        // Protección adicional para todas las pantallas
        title: route.params?.otherParticipant 
          ? `${route.params.otherParticipant.firstName} ${route.params.otherParticipant.lastName}`
          : route.name
      })}
    >
      <Stack.Screen 
        name="ChatList" 
        component={ChatListScreen} 
        options={{ title: 'Chats' }} 
      />
      
      <Stack.Screen 
        name="Chat"
        component={ChatScreen}
        initialParams={{  // Parámetros iniciales de protección
          chatId: 'default-chat-id',
          otherParticipant: {
            _id: 'default-user-id',
            firstName: 'Usuario',
            lastName: 'Default',
            email: ''
          }
        }}
      />
      
      <Stack.Screen 
        name="UserList" 
        component={UserListScreen}
        options={{ title: 'Nuevo Chat' }}
      />
    </Stack.Navigator>
  );
};