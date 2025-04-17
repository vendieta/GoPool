import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatListScreen } from '../(chat)/ChatListScreen';
import { ChatScreen } from '../(chat)/ChatScreen';
import { UserListScreen } from '../(chat)/UserListScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ChatList">
      <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Chats' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ 
        title: `${route.params.otherParticipant.firstName} ${route.params.otherParticipant.lastName}` 
      })} />
      <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'New Chat' }} />
    </Stack.Navigator>
  );
};