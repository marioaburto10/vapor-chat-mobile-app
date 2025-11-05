import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '../models/Message';

interface JoinRoomData {
  roomId: string;
  displayName: string;
}

interface SendMessageData {
  roomId: string;
  content: string;
  displayName: string;
}

interface VaporizeRoomData {
  roomId: string;
}

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const setupChatSocket = (io: Server): void => {
  // Authentication middleware for socket connections
  io.use((socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return next(new Error('JWT_SECRET not configured'));
      }

      const decoded = jwt.verify(token, jwtSecret) as { userId: string };
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Join a room
    socket.on('join_room', (data: JoinRoomData) => {
      const { roomId, displayName } = data;
      
      socket.join(roomId);
      console.log(`👤 ${displayName} joined room: ${roomId}`);

      // Notify others in the room
      socket.to(roomId).emit('user_joined', {
        displayName,
        timestamp: new Date(),
      });
    });

    // Send a message
    socket.on('send_message', async (data: SendMessageData) => {
      try {
        const { roomId, content, displayName } = data;
        const userId = socket.userId;

        if (!userId) {
          socket.emit('error', { message: 'User not authenticated' });
          return;
        }

        // Save message to database
        const message = new Message({
          roomId,
          userId,
          displayName,
          content,
          timestamp: new Date(),
        });

        await message.save();

        // Broadcast message to all users in the room (including sender)
        io.to(roomId).emit('receive_message', {
          id: String(message._id),
          userId: String(message.userId),
          displayName: message.displayName,
          content: message.content,
          timestamp: message.timestamp,
        });

        console.log(`💬 Message sent in room ${roomId} by ${displayName}`);
      } catch (error: any) {
        console.error('Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Vaporize room history
    socket.on('vaporize_room', async (data: VaporizeRoomData) => {
      try {
        const { roomId } = data;

        // Delete all messages (handled by controller, but we broadcast the event)
        io.to(roomId).emit('room_vaporized', {
          roomId,
          timestamp: new Date(),
        });

        console.log(`💨 Room ${roomId} history vaporized`);
      } catch (error: any) {
        console.error('Error vaporizing room:', error);
        socket.emit('error', { message: 'Failed to vaporize room' });
      }
    });

    // Leave a room
    socket.on('leave_room', (data: { roomId: string; displayName: string }) => {
      const { roomId, displayName } = data;
      
      socket.leave(roomId);
      console.log(`👋 ${displayName} left room: ${roomId}`);

      // Notify others in the room
      socket.to(roomId).emit('user_left', {
        displayName,
        timestamp: new Date(),
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

