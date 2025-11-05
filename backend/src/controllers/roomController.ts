import { Response } from 'express';
import Room from '../models/Room';
import Message from '../models/Message';
import { AuthRequest } from '../middleware/auth';

// Create a new room
export const createRoom = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { roomName, password } = req.body;
    const userId = req.userId;

    // Validation
    if (!roomName || !password) {
      res.status(400).json({ error: 'Room name and password are required' });
      return;
    }

    if (roomName.length < 3) {
      res.status(400).json({ error: 'Room name must be at least 3 characters' });
      return;
    }

    if (password.length < 4) {
      res.status(400).json({ error: 'Password must be at least 4 characters' });
      return;
    }

    // Check if room already exists
    const existingRoom = await Room.findOne({ 
      roomName: { $regex: new RegExp(`^${roomName}$`, 'i') } 
    });
    
    if (existingRoom) {
      res.status(400).json({ error: 'Room name already exists' });
      return;
    }

    // Create new room
    const room = new Room({
      roomName,
      password,
      createdBy: userId,
    });

    await room.save();

    res.status(201).json({
      message: 'Room created successfully',
      room: {
        id: room._id,
        roomName: room.roomName,
        createdAt: room.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Join a room (validate room name and password)
export const joinRoom = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { roomName, password } = req.body;

    // Validation
    if (!roomName || !password) {
      res.status(400).json({ error: 'Room name and password are required' });
      return;
    }

    // Find room (case-insensitive)
    const room = await Room.findOne({ 
      roomName: { $regex: new RegExp(`^${roomName}$`, 'i') } 
    });

    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    // Verify password
    const isPasswordValid = await room.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid room password' });
      return;
    }

    res.status(200).json({
      message: 'Room validated successfully',
      room: {
        id: room._id,
        roomName: room.roomName,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get room details
export const getRoomDetails = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId).select('-password');

    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    res.status(200).json({
      room: {
        id: room._id,
        roomName: room.roomName,
        createdAt: room.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get messages for a room
export const getRoomMessages = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { roomId } = req.params;
    const limit = parseInt(req.query.limit as string) || 100;

    // Verify room exists
    const room = await Room.findById(roomId);
    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    // Get messages
    const messages = await Message.find({ roomId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .select('userId displayName content timestamp');

    // Convert MongoDB IDs to strings
    const formattedMessages = messages.reverse().map((msg) => ({
      id: String(msg._id),
      userId: String(msg.userId),
      displayName: msg.displayName,
      content: msg.content,
      timestamp: msg.timestamp,
    }));

    res.status(200).json({
      messages: formattedMessages,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Vaporize room history (delete all messages)
export const vaporizeRoomHistory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { roomId } = req.params;

    // Verify room exists
    const room = await Room.findById(roomId);
    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    // Delete all messages in the room
    const result = await Message.deleteMany({ roomId });

    res.status(200).json({
      message: 'Room history vaporized successfully',
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

