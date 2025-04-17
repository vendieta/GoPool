import { Users } from '../types/chat/chat';
export type RootStackParamList = {
    ChatList: undefined;
    Chat: { chatId: string; otherParticipant: Users };
    UserList: undefined;
  };