import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Chat } from '../../api/chat/chat';
import { Auth } from '../../api/auth/auth';
import { ChatMessage } from '../../api/chatmessage/chatMessage';
import { UnreadMessages } from '../../api/unreadmessage/unreadMessages';
import { useNavigation } from '@react-navigation/native';
import { ChatWithLastMessage } from '../../types/chat/chat';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/chat/chat';
import { Users } from '../../types/chat/chat';
import { Chats } from '../../types/chat/chat';
import { User } from '../../api/user/user';
const chatController = new Chat();
const authController = new User();
const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();
const auth = new Auth();

type ChatListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatList'>;

export const ChatListScreen: React.FC = () => {
  const [chats, setChats] = useState<ChatWithLastMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigation = useNavigation<ChatListScreenNavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await auth.getAccessToken();
        setAccessToken(token);
        
        if (token) {
          // Obtener el usuario actual
          const userResponse = await authController.getMe(token);
          setCurrentUserId(userResponse._id);

          const response = await chatController.getAll(token);
          const chatsWithLastMessage = await Promise.all(
            response.map(async (chat: Chats) => {
              const lastMessage = await chatMessageController.getLastMessage(token, chat._id);
              const totalRead = await unreadMessagesController.getTotalReadMessages(chat._id);
              const totalMessages = await chatMessageController.getTotal(token, chat._id);
              
              return {
                ...chat,
                lastMessage: lastMessage.message,
                unreadCount: totalMessages - (totalRead || 0),
                lastMessageDate: lastMessage.createdAt
              };
            })
          );
          
          setChats(chatsWithLastMessage);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToChat = (chatId: string, otherParticipant: Users) => {
    navigation.navigate('Chat', { chatId, otherParticipant });
  };

  const renderItem = ({ item }: { item: ChatWithLastMessage }) => {
    const otherParticipant = item.participant_id_one._id === currentUserId ? 
      item.participant_id_two : item.participant_id_one;
    
    return (
      <TouchableOpacity 
        style={styles.chatItem} 
        onPress={() => navigateToChat(item._id, otherParticipant)}
      >
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {otherParticipant.firstName.charAt(0)}{otherParticipant.lastName.charAt(0)}
          </Text>
        </View>
        <View style={styles.chatContent}>
          <Text style={styles.chatName}>
            {otherParticipant.firstName} {otherParticipant.lastName}
          </Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        <View style={styles.chatInfo}>
          <Text style={styles.lastMessageTime}>
            {new Date(item.lastMessageDate || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          {item.unreadCount && item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No chats yet</Text>
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
  chatItem: {
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
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatInfo: {
    alignItems: 'flex-end',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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