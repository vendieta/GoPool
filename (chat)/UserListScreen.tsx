import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Auth } from '../api/auth/auth';
import { User } from '../api/user/user';
import { Users, RootStackParamList } from '../types/chat/chat';
import { Chat } from '../api/chat/chat';

const userController = new User();
const authController = new Auth();
const chatController = new Chat(); // Assuming you have a ChatMessage controller for creating chats
type UserListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserList'>;

export const UserListScreen: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigation = useNavigation<UserListScreenNavigationProp>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await authController.getAccessToken();
        if (token) {
          // Obtener el ID del usuario actual
          const currentUser = await userController.getMe(token);
          setCurrentUserId(currentUser._id);
          
          // Obtener todos los usuarios (la API ya debe excluir al usuario actual)
          const response = await userController.getAll(token);
          setUsers(response); // Confiamos en que la API devuelve la lista correcta
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const startNewChat = async (userId: string) => {
    try {
      const token = await authController.getAccessToken();
      if (token && currentUserId) {
        const response = await chatController.create(token, currentUserId, userId);
        const otherUser = users.find(u => u._id === userId);
        
        if (otherUser) {
          navigation.navigate('Chat', { 
            chatId: response._id, 
            otherParticipant: otherUser 
          });
        }
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const renderItem = ({ item }: { item: Users }) => (
    <TouchableOpacity 
      style={styles.userItem} 
      onPress={() => startNewChat(item._id)}
    >
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>
          {item.firstName.charAt(0)}{item.lastName.charAt(0)}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});