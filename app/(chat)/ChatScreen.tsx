import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { ChatMessage } from '../../api/chatmessage/chatMessage';
import { UnreadMessages } from '../../api/unreadmessage/unreadMessages';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { Message } from '../../types/chat/chat';
import { Auth } from '../../api/auth/auth';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();

export const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { chatId, otherParticipant } = route.params;
  const flatListRef = useRef<FlatList>(null);
  const authController = new Auth();

  // =============================================
  // DATOS FICTICIOS PARA PRUEBAS (ELIMINAR EN PRODUCCIÓN)
  // =============================================
  const currentUserId = 'current-user-id'; // Simula el ID del usuario actual
  
  const mockMessages: Message[] = [
    {
      _id: '1',
      message: '¡Hola! ¿Cómo estás?',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      sender: {
        _id: 'other-user-1',
        firstName: otherParticipant.firstName,
        lastName: otherParticipant.lastName,
        avatar: otherParticipant.avatar,
        email: '',
      },
      updatedAt: ''
    },
    {
      _id: '2',
      message: 'Estoy probando el diseño del chat. ¿Qué opinas?',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      sender: {
        _id: currentUserId,
        firstName: 'Tú',
        lastName: '',
        avatar: 'https://example.com/your-avatar.jpg',
        email: ''
      },
      updatedAt: ''
    },
    {
      _id: '3',
      message: 'Los mensajes se ven muy bien con estos estilos 👌',
      createdAt: new Date(Date.now() - 600000).toISOString(),
      sender: {
        _id: 'other-user-1',
        firstName: otherParticipant.firstName,
        lastName: otherParticipant.lastName,
        avatar: otherParticipant.avatar,
        email: ''
      },
      updatedAt: ''
    },
    {
      _id: '4',
      message: '¡Me alegra que te guste! Acabo de añadir soporte para emojis también 😊',
      createdAt: new Date().toISOString(),
      sender: {
        _id: currentUserId,
        firstName: 'Tú',
        lastName: '',
        email: "",
        avatar: 'https://example.com/your-avatar.jpg'
      },
      updatedAt: ''
    }
  ];

  // Estado con datos ficticios
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalMessages, setTotalMessages] = useState<number>(mockMessages.length);
  // =============================================

  // Función original (deshabilitada temporalmente)
  const fetchMessages = useCallback(async () => {
    /* 
    // Código original comentado:
    try {
      const token = await authController.getAccessToken();
      if (token) {
        const messagesResponse = await chatMessageController.getAll(token, chatId);
        const total = await chatMessageController.getTotal(token, chatId);
        setMessages(messagesResponse);
        setTotalMessages(total);
        await unreadMessagesController.setTotalReadMessages(chatId, total);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
    */
    console.log('FetchMessages llamado (deshabilitado en modo prueba)');
  }, [chatId]);

  useEffect(() => {
    // Comentado para pruebas:
    // fetchMessages();
    // const interval = setInterval(fetchMessages, 5000);
    // return () => clearInterval(interval);
  }, [fetchMessages]);

  const handleSendMessage = async (message: string) => {
    // Simula el envío de mensaje
    const newMessage: Message = {
      _id: Date.now().toString(),
      message,
      createdAt: new Date().toISOString(),
      sender: {
        _id: currentUserId,
        firstName: 'Tú',
        lastName: '',
        email: "",
        avatar: 'https://example.com/your-avatar.jpg'
      },
      updatedAt: ''
    };
    
    setMessages(prev => [newMessage, ...prev]);
    setTotalMessages(prev => prev + 1);
    
    /*
    // Código original comentado:
    try {
      const token = await authController.getAccessToken();
      if (token) {
        await chatMessageController.sendText(token, chatId, message);
        await fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    */
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
              <Text>No hay mensajes aún</Text>
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
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});