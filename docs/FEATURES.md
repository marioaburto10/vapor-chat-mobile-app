# VaporChat - Features & Functionality

## Core Features

### 1. User Authentication
- ✅ Sign up with email and password
- ✅ Login with credentials
- ✅ Persistent authentication (stays logged in)
- ✅ Secure password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Logout functionality

### 2. Room Management
- ✅ Create password-protected rooms
- ✅ Join existing rooms with correct password
- ✅ Room name validation (unique, 3+ characters)
- ✅ Password protection (4+ characters)
- ✅ Display name customization per room

### 3. Real-time Chat
- ✅ Send messages instantly
- ✅ Receive messages in real-time
- ✅ Socket.io integration
- ✅ Message persistence in MongoDB
- ✅ Load chat history on room join
- ✅ Visual distinction between own and others' messages
- ✅ Display names shown with messages
- ✅ Auto-scroll to latest messages
- ✅ Character limit (1000 chars per message)

### 4. Vaporize History
- ✅ Delete all messages in a room
- ✅ Confirmation dialog before deletion
- ✅ Immediate update for all users
- ✅ Permanent deletion from database

### 5. User Interface
- ✅ Vapor-themed design (black/white/gray)
- ✅ Gradient buttons
- ✅ Smooth animations
- ✅ Responsive layout
- ✅ Dark mode optimized
- ✅ Custom logo integration
- ✅ Professional header and footer
- ✅ Keyboard-aware inputs

## Technical Features

### Backend
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose ODM
- ✅ WebSocket real-time communication
- ✅ Input validation and sanitization
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Environment variable management
- ✅ TypeScript for type safety
- ✅ Password hashing and comparison
- ✅ JWT token generation and verification

### Frontend
- ✅ React Native + Expo framework
- ✅ TypeScript throughout
- ✅ React Navigation for routing
- ✅ Context API for state management
- ✅ AsyncStorage for persistence
- ✅ Axios for HTTP requests
- ✅ Socket.io client integration
- ✅ Custom reusable components
- ✅ Platform-specific optimizations

## User Flows

### New User Flow
1. Open app → See Login screen
2. Tap "Sign Up"
3. Enter email, password, confirm password
4. Tap "Sign Up"
5. Automatically logged in → Home screen

### Login Flow
1. Open app → See Login screen
2. Enter email and password
3. Tap "Login"
4. Navigate to Home screen

### Create Room Flow
1. On Home screen, "Create a Room" is default
2. Enter room name
3. Enter password
4. Enter display name
5. Tap "Create"
6. Navigate to Chat Room

### Join Room Flow
1. On Home screen, tap "Join a Room"
2. Enter room name
3. Enter password
4. Enter display name
5. Tap "Join"
6. Navigate to Chat Room

### Chat Flow
1. In Chat Room
2. Type message in input field
3. Tap "Send"
4. Message appears instantly for all users
5. Messages scroll to bottom automatically

### Vaporize Flow
1. In Chat Room
2. Tap "Vaporize History"
3. Confirm deletion
4. All messages deleted
5. All users see empty chat

### Exit Room Flow
1. In Chat Room
2. Tap "Exit Room"
3. Return to Home screen
4. Socket disconnects from room

## Security Features

- ✅ Password hashing (bcrypt with salt rounds)
- ✅ JWT authentication
- ✅ Protected API routes
- ✅ Token expiration
- ✅ Input validation
- ✅ SQL injection prevention (NoSQL)
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Secure environment variables

## Data Models

### User
- email (unique, validated)
- password (hashed)
- createdAt
- updatedAt

### Room
- roomName (unique, case-insensitive)
- password (hashed)
- createdBy (user reference)
- createdAt

### Message
- roomId (room reference)
- userId (user reference)
- displayName
- content
- timestamp

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login user

### Rooms
- `POST /api/rooms/create` - Create room (auth required)
- `POST /api/rooms/join` - Join room (auth required)
- `GET /api/rooms/:roomId` - Get room details (auth required)
- `GET /api/rooms/:roomId/messages` - Get messages (auth required)
- `DELETE /api/rooms/:roomId/vaporize` - Delete messages (auth required)

### System
- `GET /health` - Health check

## Socket.io Events

### Client → Server
- `join_room` - Join a chat room
- `send_message` - Send a message
- `leave_room` - Leave a room
- `vaporize_room` - Delete all messages

### Server → Client
- `receive_message` - New message received
- `user_joined` - User joined notification
- `user_left` - User left notification
- `room_vaporized` - Room history deleted
- `error` - Error notification

## Future Enhancements (Not Implemented)

### Potential Features
- [ ] User profiles with avatars
- [ ] Direct messaging
- [ ] Message reactions/emojis
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Message search
- [ ] Image/file sharing
- [ ] Voice messages
- [ ] Push notifications
- [ ] Room settings (admin controls)
- [ ] User blocking
- [ ] Report functionality
- [ ] Message editing
- [ ] Message deletion (individual)
- [ ] Room member list
- [ ] Online status indicators
- [ ] Message timestamps in UI
- [ ] Dark/light theme toggle
- [ ] Multiple device support
- [ ] End-to-end encryption
- [ ] Two-factor authentication
- [ ] Password reset via email
- [ ] Room expiration (auto-delete)
- [ ] Message export

## Performance Optimizations

- ✅ Message pagination (limit 100)
- ✅ Efficient MongoDB indexing
- ✅ Socket.io room-based broadcasting
- ✅ Auto-scroll optimization
- ✅ Keyboard handling
- ✅ Lazy loading of screens

## Cross-platform Support

- ✅ iOS (Simulator and Device)
- ✅ Android (Emulator and Device)
- 🔄 Web (via Expo, may need adjustments)

## Design Principles

1. **Minimalism**: Clean, uncluttered interface
2. **Vapor Aesthetic**: Black, white, gray color scheme
3. **Fluidity**: Smooth animations and transitions
4. **Accessibility**: Clear typography and contrast
5. **Consistency**: Uniform components and patterns
6. **Responsiveness**: Adapts to different screen sizes

---

**VaporChat** - Where conversations come and go like vapor 💨

