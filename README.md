# VaporChat

A modern mobile chat application with ephemeral messaging. Create private rooms, chat in real-time, and vaporize conversations when you're done.

## Features

- 🔐 **User Authentication**: Secure signup and login
- 💬 **Real-time Chat**: Instant messaging with Socket.io
- 🚪 **Room Management**: Create and join password-protected rooms
- 💨 **Vaporize History**: Delete all messages in a room permanently
- 🎨 **Vapor Theme**: Beautiful black, white, and gray gradient design
- 📱 **Cross-platform**: iOS and Android support via React Native + Expo

## Project Structure

```
vapor-chat-mobile-app/
├── backend/           # Express.js + MongoDB backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── sockets/
│   │   └── server.ts
│   └── package.json
│
└── mobile/            # React Native + Expo frontend
    ├── app/
    │   ├── components/
    │   ├── screens/
    │   ├── navigation/
    │   ├── context/
    │   ├── services/
    │   └── types/
    ├── App.tsx
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- MongoDB Atlas account
- Expo CLI (for mobile development)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vaporchat
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:8081
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Mobile App Setup

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Update the API configuration in `app/config/api.ts`:
```typescript
// For local development
export const API_BASE_URL = 'http://localhost:5000';

// For physical device, use your computer's IP
export const API_BASE_URL = 'http://192.168.1.XXX:5000';
```

4. Start the Expo development server:
```bash
npm start
```

5. Run on your preferred platform:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app for physical device

## Tech Stack

### Backend
- **Express.js**: Web framework
- **MongoDB + Mongoose**: Database
- **Socket.io**: Real-time communication
- **JWT**: Authentication
- **bcrypt**: Password hashing
- **TypeScript**: Type safety

### Frontend
- **React Native + Expo**: Mobile framework
- **TypeScript**: Type safety
- **React Navigation**: Navigation
- **Socket.io Client**: Real-time messaging
- **Axios**: HTTP requests
- **AsyncStorage**: Persistent storage
- **Expo Linear Gradient**: Gradient effects

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user

### Rooms
- `POST /api/rooms/create` - Create new room
- `POST /api/rooms/join` - Join existing room
- `GET /api/rooms/:roomId` - Get room details
- `GET /api/rooms/:roomId/messages` - Get message history
- `DELETE /api/rooms/:roomId/vaporize` - Delete all room messages

### Socket.io Events
- `join_room` - Join a chat room
- `send_message` - Send a message
- `receive_message` - Receive new message
- `leave_room` - Leave a room
- `vaporize_room` - Vaporize room history
- `room_vaporized` - Room history deleted notification

## Design Philosophy

VaporChat embraces a **vapor aesthetic** with:
- Pure black backgrounds (#000000)
- White and gray gradients
- Smooth, flowing UI elements
- Minimalist interface
- Premium feel with generous spacing

The design is inspired by vapor/smoke-like flowing shapes, creating a modern and ephemeral atmosphere that matches the app's core functionality.

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- Secure room passwords
- HTTPS ready for production

## Development

### Backend Development
```bash
cd backend
npm run dev      # Start with hot reload
npm run build    # Build for production
npm start        # Run production build
```

### Mobile Development
```bash
cd mobile
npm start        # Start Expo dev server
npm run ios      # Run on iOS
npm run android  # Run on Android
```

## Production Deployment

### Backend
1. Deploy to a hosting service (Heroku, Railway, DigitalOcean)
2. Set up MongoDB Atlas production database
3. Configure environment variables
4. Enable HTTPS

### Mobile App
1. Build iOS app: `expo build:ios`
2. Build Android app: `expo build:android`
3. Submit to App Store / Google Play

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

**VaporChat** - Ephemeral messaging for the modern age 💨
