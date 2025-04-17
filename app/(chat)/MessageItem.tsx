import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../types/chat/chat';
import { format } from 'date-fns';

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  return (
    <View style={[
      styles.messageContainer,
      isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
    ]}>
      <Text style={styles.messageText}>{message.message}</Text>
      <Text style={styles.timeText}>
        {format(new Date(message.createdAt), 'HH:mm')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 0,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 10,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});