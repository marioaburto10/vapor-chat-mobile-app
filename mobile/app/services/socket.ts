import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/api';
import { Message } from '../types';

class SocketService {
  private socket: Socket | null = null;

  connect(token: string): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomId: string, displayName: string): void {
    this.socket?.emit('join_room', { roomId, displayName });
  }

  leaveRoom(roomId: string, displayName: string): void {
    this.socket?.emit('leave_room', { roomId, displayName });
  }

  sendMessage(roomId: string, content: string, displayName: string): void {
    this.socket?.emit('send_message', { roomId, content, displayName });
  }

  vaporizeRoom(roomId: string): void {
    this.socket?.emit('vaporize_room', { roomId });
  }

  onReceiveMessage(callback: (message: Message) => void): void {
    this.socket?.on('receive_message', callback);
  }

  onRoomVaporized(callback: () => void): void {
    this.socket?.on('room_vaporized', callback);
  }

  onUserJoined(callback: (data: { displayName: string; timestamp: Date }) => void): void {
    this.socket?.on('user_joined', callback);
  }

  onUserLeft(callback: (data: { displayName: string; timestamp: Date }) => void): void {
    this.socket?.on('user_left', callback);
  }

  onError(callback: (error: { message: string }) => void): void {
    this.socket?.on('error', callback);
  }

  removeAllListeners(): void {
    this.socket?.removeAllListeners();
  }
}

export default new SocketService();

