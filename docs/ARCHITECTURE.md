# VaporChat - Architecture Documentation

## System Architecture

VaporChat follows a **client-server architecture** with real-time communication capabilities.

```
╔═══════════════════════════════════════════════════════════╗
║                    Mobile Clients                         ║
║               (React Native + Expo)                       ║
║                                                           ║
║   ┌─────────┐   ┌─────────┐   ┌─────────┐               ║
║   │   iOS   │   │ Android │   │   Web   │               ║
║   └─────────┘   └─────────┘   └─────────┘               ║
╚════════════════════╦═════════════╦════════════════════════╝
                     ║             ║
                     ║ HTTP/REST   ║ WebSocket
                     ║             ║
╔════════════════════╩═════════════╩════════════════════════╗
║                   Backend Server                          ║
║              (Express.js + Socket.io)                     ║
║                                                           ║
║  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐     ║
║  │  REST API   │  │  Socket.io  │  │     Auth     │     ║
║  │  Endpoints  │  │  Real-time  │  │  Middleware  │     ║
║  └─────────────┘  └─────────────┘  └──────────────┘     ║
╚═══════════════════════╦═══════════════════════════════════╝
                        ║
                        ║ Mongoose ODM
                        ║
╔═══════════════════════╩═══════════════════════════════════╗
║                    MongoDB Atlas                          ║
║                  (Cloud Database)                         ║
║                                                           ║
║   ┌─────────┐    ┌─────────┐    ┌──────────┐            ║
║   │  Users  │    │  Rooms  │    │ Messages │            ║
║   └─────────┘    └─────────┘    └──────────┘            ║
╚═══════════════════════════════════════════════════════════╝
```

## Technology Stack

### Backend
```
Express.js (Web Framework)
    ├── TypeScript (Type Safety)
    ├── Socket.io (WebSocket Server)
    ├── Mongoose (MongoDB ODM)
    ├── JWT (Authentication)
    ├── bcrypt (Password Hashing)
    └── CORS (Cross-Origin Resource Sharing)
```

### Frontend
```
React Native + Expo (Mobile Framework)
    ├── TypeScript (Type Safety)
    ├── React Navigation (Routing)
    ├── Socket.io Client (Real-time)
    ├── Axios (HTTP Client)
    ├── AsyncStorage (Local Storage)
    └── Expo Linear Gradient (UI Effects)
```

## Backend Architecture

### Folder Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.ts         # MongoDB connection
│   ├── models/
│   │   ├── User.ts            # User schema & methods
│   │   ├── Room.ts            # Room schema & methods
│   │   └── Message.ts         # Message schema
│   ├── controllers/
│   │   ├── authController.ts  # Auth logic
│   │   └── roomController.ts  # Room logic
│   ├── routes/
│   │   ├── authRoutes.ts      # Auth endpoints
│   │   └── roomRoutes.ts      # Room endpoints
│   ├── middleware/
│   │   ├── auth.ts            # JWT verification
│   │   └── errorHandler.ts   # Error handling
│   ├── sockets/
│   │   └── chatSocket.ts      # Socket.io logic
│   └── server.ts              # App entry point
├── .env                       # Environment variables
├── package.json
└── tsconfig.json
```

### Request Flow (REST API)
```
Client Request
    ↓
Express App
    ↓
CORS Middleware
    ↓
Body Parser
    ↓
Auth Middleware (if protected)
    ↓
Route Handler
    ↓
Controller Logic
    ↓
Database Query (Mongoose)
    ↓
Response
```

### WebSocket Flow
```
Client Connects
    ↓
Socket.io Authentication Middleware
    ↓
Connection Established
    ↓
Client Joins Room
    ↓
Client Sends Message
    ↓
Server Saves to Database
    ↓
Server Broadcasts to Room
    ↓
All Clients Receive Message
```

## Frontend Architecture

### Folder Structure
```
mobile/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── GradientButton.tsx
│   │   ├── VaporInput.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── screens/            # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── ChatRoomScreen.tsx
│   ├── navigation/         # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── context/           # React Context
│   │   └── AuthContext.tsx
│   ├── services/          # API services
│   │   ├── api.ts
│   │   └── socket.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   └── config/            # Configuration
│       └── api.ts
├── assets/                # Images, fonts, etc.
├── App.tsx               # Root component
├── app.json             # Expo configuration
├── package.json
└── tsconfig.json
```

### Component Hierarchy
```
App.tsx
    └── SafeAreaProvider
        └── AuthProvider (Context)
            └── NavigationContainer
                └── Stack Navigator
                    ├── Auth Stack (if not logged in)
                    │   ├── LoginScreen
                    │   └── SignupScreen
                    └── App Stack (if logged in)
                        ├── HomeScreen
                        │   ├── Header
                        │   ├── VaporInput (x3)
                        │   ├── GradientButton
                        │   └── Footer
                        └── ChatRoomScreen
                            ├── Header (Room Name)
                            ├── FlatList (Messages)
                            ├── Input + Send Button
                            └── Action Buttons
```

### State Management
```
AuthContext (Global)
    ├── user: User | null
    ├── token: string | null
    ├── loading: boolean
    ├── login()
    ├── signup()
    └── logout()

Screen State (Local)
    ├── Form inputs
    ├── Loading states
    └── UI state
```

## Data Models

### User Model
```typescript
{
  _id: ObjectId,
  email: string (unique, indexed),
  password: string (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Room Model
```typescript
{
  _id: ObjectId,
  roomName: string (unique, indexed),
  password: string (hashed),
  createdBy: ObjectId (ref: User),
  createdAt: Date
}
```

### Message Model
```typescript
{
  _id: ObjectId,
  roomId: ObjectId (ref: Room, indexed),
  userId: ObjectId (ref: User),
  displayName: string,
  content: string,
  timestamp: Date (indexed)
}
```

## Authentication Flow

### Signup
```
1. User enters email, password, confirmPassword
2. Frontend validates inputs
3. POST /api/auth/signup
4. Backend validates & hashes password
5. Creates user in database
6. Generates JWT token
7. Returns token + user data
8. Frontend stores in AsyncStorage
9. AuthContext updates state
10. Navigates to Home screen
```

### Login
```
1. User enters email, password
2. Frontend validates inputs
3. POST /api/auth/login
4. Backend finds user by email
5. Compares password with bcrypt
6. Generates JWT token
7. Returns token + user data
8. Frontend stores in AsyncStorage
9. AuthContext updates state
10. Navigates to Home screen
```

### Persistent Login
```
1. App launches
2. AuthContext checks AsyncStorage
3. If token exists, sets user state
4. Socket connects with token
5. User stays logged in
```

## Real-time Chat Flow

### Join Room
```
1. User enters room details
2. POST /api/rooms/join (validate)
3. Navigate to ChatRoom screen
4. GET /api/rooms/:id/messages (load history)
5. Socket.emit('join_room')
6. User added to Socket room
7. Other users notified
```

### Send Message
```
1. User types message
2. Taps Send button
3. Socket.emit('send_message')
4. Server receives event
5. Saves to MongoDB
6. Server broadcasts to room
7. All clients receive message
8. UI updates with new message
```

### Vaporize
```
1. User taps Vaporize History
2. Confirmation dialog
3. DELETE /api/rooms/:id/vaporize
4. Server deletes all messages
5. Socket.emit('vaporize_room')
6. All clients receive event
7. Messages cleared from UI
```

## Security Measures

### Authentication
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- Token stored securely in AsyncStorage
- Token sent in Authorization header
- Middleware validates token on protected routes

### Authorization
- All room/message endpoints require authentication
- User ID extracted from JWT token
- Room passwords hashed like user passwords
- Password verification before room access

### Input Validation
- Email format validation
- Password length requirements
- Room name length validation
- Message character limits
- Mongoose schema validation

### Database Security
- MongoDB Atlas with authentication
- Connection string in environment variables
- Unique indexes prevent duplicates
- NoSQL injection prevention via Mongoose

## Performance Considerations

### Database
- Indexed fields: email, roomName, roomId, timestamp
- Compound index: roomId + timestamp
- Message pagination (limit 100)
- Connection pooling via Mongoose

### Frontend
- Lazy screen loading
- FlatList for efficient message rendering
- Auto-scroll optimization
- Keyboard handling
- AsyncStorage for persistence

### Network
- Socket.io compression
- Room-based broadcasting (not global)
- Efficient message payloads
- Connection pooling

## Scalability

### Current Limitations
- Single server instance
- No load balancing
- No message pagination in UI
- No caching layer
- No CDN for assets

### Future Scaling Options
- **Horizontal Scaling**: Multiple server instances with Redis
- **Load Balancer**: Distribute traffic across servers
- **Database Sharding**: Split data across multiple databases
- **Caching**: Redis for frequently accessed data
- **CDN**: Serve static assets from edge locations
- **Message Queue**: RabbitMQ for async processing
- **Microservices**: Separate auth, chat, and rooms

## Deployment Architecture

### Development
```
Backend: localhost:5000
Mobile: Expo Dev Server (localhost:8081)
Database: MongoDB Atlas (cloud)
```

### Production (Recommended)
```
Backend: Heroku/Railway/DigitalOcean
Mobile: App Store / Google Play
Database: MongoDB Atlas (production cluster)
Static Assets: AWS S3 + CloudFront
```

## Error Handling

### Backend
- Try-catch blocks in async functions
- Error middleware for consistent responses
- Mongoose validation errors
- JWT verification errors
- Custom error messages

### Frontend
- Try-catch for API calls
- Alert dialogs for user feedback
- Loading states during operations
- Network error handling
- Socket reconnection logic

## Testing Strategy (Recommended)

### Backend
- Unit tests for controllers
- Integration tests for routes
- Database connection tests
- Socket.io event tests

### Frontend
- Component tests
- Navigation tests
- Context tests
- E2E tests with Detox

## Monitoring & Logging

### Current
- Console logs for debugging
- Mongoose connection events
- Socket.io connection events

### Recommended
- Winston for structured logging
- Sentry for error tracking
- Analytics (Mixpanel/Amplitude)
- Performance monitoring (New Relic)

---

**VaporChat Architecture** - Built for real-time, ephemeral communication 💨

