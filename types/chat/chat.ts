// types/chat.ts
export interface Users {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  }
  
  export interface Message {
    _id: string;
    message: string;
    sender: Users;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Chats {
    _id: string;
    participant_id_one: Users;
    participant_id_two: Users;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ChatWithLastMessage extends Chats {
    lastMessage?: string;
    lastMessageDate?: string;
    unreadCount?: number;
  }

  export type RootStackParamList = {
    ChatList: undefined;
    Chat: { chatId: string; otherParticipant: Users };
    UserList: undefined;
  };