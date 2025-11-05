import express from 'express';
import {
  createRoom,
  joinRoom,
  getRoomDetails,
  getRoomMessages,
  vaporizeRoomHistory,
} from '../controllers/roomController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All room routes require authentication
router.use(authenticate);

router.post('/create', createRoom);
router.post('/join', joinRoom);
router.get('/:roomId', getRoomDetails);
router.get('/:roomId/messages', getRoomMessages);
router.delete('/:roomId/vaporize', vaporizeRoomHistory);

export default router;

