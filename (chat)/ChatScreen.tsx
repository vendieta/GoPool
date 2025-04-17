import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { ChatMessage } from '../api/chatmessage/chatMessage';
import { UnreadMessages } from '../api/unreadmessage/unreadMessages';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Message } from '../types/chat/chat';
import { Auth } from '../api/auth/auth';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();

export const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { chatId, otherParticipant } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const authController = new Auth();

  
  //AGREGAR FUNCION QUE RETORNE EL ID DEL USUARIO ACTUAL
  const currentUserId = 'your_current_user_id'; // Replace with logic to fetch the current user's ID

  const fetchMessages = useCallback(async () => {
    try {
      const token = await authController.getAccessToken();
      if (token) {
        const messagesResponse = await chatMessageController.getAll(token, chatId);
        const total = await chatMessageController.getTotal(token, chatId);
        setMessages(messagesResponse);
        setTotalMessages(total);
        
        // Marcar mensajes como leídos
        await unreadMessagesController.setTotalReadMessages(chatId, total);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  useEffect(() => {
    fetchMessages();
    
    // Opcional: Configurar polling o WebSocket para actualizaciones en tiempo real
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const handleSendMessage = async (message: string) => {
    try {
      const token = await authController.getAccessToken();
      if (token) {
        await chatMessageController.sendText(token, chatId, message);
        await fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <MessageItem 
      message={item} 
      isCurrentUser={item.sender._id === currentUserId} 
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          inverted
          onContentSizeChange={() => flatListRef.current?.scrollToOffset({ offset: 0 })}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>No messages yet</Text>
            </View>
          }
        />
      </View>
      <MessageInput onSendMessage={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});