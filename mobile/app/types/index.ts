// User types
export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Room types
export interface Room {
  id: string;
  roomName: string;
  createdAt?: string;
}

export interface RoomResponse {
  message: string;
  room: Room;
}

// Message types
export interface Message {
  id: string;
  userId: string;
  displayName: string;
  content: string;
  timestamp: Date;
}

export interface MessagesResponse {
  messages: Message[];
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  ChatRoom: {
    roomId: string;
    roomName: string;
    displayName: string;
  };
};

