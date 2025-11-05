# VaporChat Backend

Backend server for VaporChat mobile application.

## Tech Stack
- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- Socket.io (Real-time chat)
- JWT Authentication

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure your MongoDB Atlas connection string in `.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vaporchat
JWT_SECRET=your-secret-key
PORT=5000
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Rooms
- `POST /api/rooms/create` - Create new chat room
- `POST /api/rooms/join` - Join existing room
- `GET /api/rooms/:roomId` - Get room details
- `GET /api/rooms/:roomId/messages` - Get room message history
- `DELETE /api/rooms/:roomId/vaporize` - Delete all room messages

### Socket.io Events

#### Client → Server
- `join_room` - Join a room
- `send_message` - Send a message
- `leave_room` - Leave a room
- `vaporize_room` - Vaporize room history

#### Server → Client
- `receive_message` - Receive new message
- `user_joined` - User joined notification
- `user_left` - User left notification
- `room_vaporized` - Room history deleted
- `error` - Error notification

## Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

