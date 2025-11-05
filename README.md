<div align="center">
  <img src="public/VaporChatLogo.png" alt="VaporChat Logo" width="200"/>
  
  # VaporChat
  
  ### Ephemeral messaging for the modern age 💨
  
  A sleek mobile chat application with ephemeral messaging, built using AI. Create private rooms, chat in real-time, and vaporize conversations when you're done.
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socket.io&logoColor=white)](https://socket.io/)
  
</div>

---

## 👋 Introduction

I created this project using AI tools as part of our first sprint at [Overclock AI Engineering Accelerator](https://overclockaccelerator.com/). It took me about 4-5 hours to put this project together, and **I did not write a single line of code**. Even this README was created using AI.

### 🎨 Design Process

I started by searching for inspiration photos on [Cosmos](https://www.cosmos.so/home). After finding a few designs I liked (saved in the `inspo_images/` directory), I uploaded them to [ChatGPT](https://chatgpt.com/) and asked it to create a logo using those images as reference. After 4-5 iterations, I got the perfect logo you see today.

### 💻 Development Process

I spent about 30-40 minutes putting the [initial prompt](docs/prompt.md) together., I fed everything to [Cursor](https://cursor.com/) along with the logo and the [mockup](docs/mockup.png) provided by my instructor. With no mockup, I probably would have spent an extra 15-20 minutes putting a simple desgin together. I was very specific about:
- Technologies to use (React Native, Express.js, MongoDB, Socket.io)
- Visual style (vaporwave aesthetic, dark theme)
- Core functionality (auth, real-time chat, vaporize feature)

Cursor generated all the code quickly and even created documentation automatically without being asked!

### 🚀 Deployment Journey

I started off attempting to use Vercel but quickly found out that [Vercel](https://vercel.com/) does not have WebSocket support so Cursor suggested switching over to Railway.

- **Backend**: Spent ~1 hour troubleshooting environment variables on [Railway](https://railway.com/) (first time using it), but successfully got it running
- **Database**: Set up a free [MongoDB Atlas](https://www.mongodb.com/products/platform/cloud) cluster
- **Mobile**: Spent ~30 minutes resolving React Native and Expo package version mismatches
- **Build**: Successfully deployed as iOS and Android apps locally using [Expo EAS](https://expo.dev/eas)

### 💰 Total Cost

The best part? This project cost me **very little** to build:

| Tool | Cost | Notes |
|------|------|-------|
| [Cursor](https://cursor.com/) | **$20/month** | AI-powered IDE with Claude Sonnet |
| [ChatGPT Plus](https://chatgpt.com/) | **$20/month** | Used for logo generation |
| [Railway](https://railway.com/) | **$0** | Free tier for backend hosting |
| [MongoDB Atlas](https://www.mongodb.com/products/platform/cloud) | **$0** | Free M0 cluster (512MB storage) |
| [Expo](https://expo.dev/) | **$0** | Free tier for development builds |
| **Total Monthly Cost** | **$40** | Just AI tool subscriptions! |

**It really is amazing and mind-blowing how far AI has come!** 🤖


### 📚 Documentation

For detailed information, check out our comprehensive documentation:

- **[Architecture Guide](docs/ARCHITECTURE.md)** - System design, data flow, and technical architecture
- **[Features](docs/FEATURES.md)** - Detailed feature breakdown and usage guide
- **[Quick Start](docs/QUICK_START.md)** - Get up and running in 5 minutes
- **[Setup Guide](docs/SETUP.md)** - Complete installation and configuration
- **[Project Summary](docs/PROJECT_SUMMARY.md)** - High-level project overview
- **[Documentation Index](docs/DOCUMENTATION_INDEX.md)** - Complete documentation index

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [📡 API Documentation](#-api-documentation)
- [🎨 Design Philosophy](#-design-philosophy)
- [🔒 Security Features](#-security-features)
- [💻 Development](#-development)
- [🚢 Production Deployment](#-production-deployment)

---

## ✨ Features

<table>
  <tr>
    <td>🔐</td>
    <td><strong>User Authentication</strong><br/>Secure signup and login with JWT tokens</td>
  </tr>
  <tr>
    <td>💬</td>
    <td><strong>Real-time Chat</strong><br/>Instant messaging powered by Socket.io</td>
  </tr>
  <tr>
    <td>🚪</td>
    <td><strong>Room Management</strong><br/>Create and join password-protected chat rooms</td>
  </tr>
  <tr>
    <td>💨</td>
    <td><strong>Vaporize History</strong><br/>Delete all messages in a room permanently</td>
  </tr>
  <tr>
    <td>🎨</td>
    <td><strong>Vapor Theme</strong><br/>Beautiful dark UI with gradient effects</td>
  </tr>
  <tr>
    <td>📱</td>
    <td><strong>Cross-platform</strong><br/>iOS and Android support via React Native + Expo</td>
  </tr>
</table>

## 📁 Project Structure

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
├── mobile/            # React Native + Expo frontend
│   ├── app/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── navigation/
│   │   ├── context/
│   │   ├── services/
│   │   └── types/
│   ├── App.tsx
│   └── package.json
│
├── docs/              # Project documentation
│   ├── ARCHITECTURE.md
│   ├── FEATURES.md
│   ├── QUICK_START.md
│   ├── SETUP.md
│   └── PROJECT_SUMMARY.md
│
└── README.md          # This file
```

## 🚀 Getting Started

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
npx expo start
```

5. Run on your preferred platform:
- Press `i` for **iOS Simulator**
- Press `a` for **Android Emulator**  
- Press `w` for **Web browser**
- Scan QR code with **Expo Go** app for physical device

## 🛠️ Tech Stack

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

## 📡 API Documentation

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

## 🎨 Design Philosophy

VaporChat embraces a **vapor aesthetic** with:
- Pure black backgrounds (#000000)
- White and gray gradients
- Smooth, flowing UI elements
- Minimalist interface
- Premium feel with generous spacing

The design is inspired by vapor/smoke-like flowing shapes, creating a modern and ephemeral atmosphere that matches the app's core functionality.

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- Secure room passwords
- HTTPS ready for production

## 💻 Development

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
npx expo start              # Start Expo dev server
npx expo start --clear      # Start with cache cleared
npx expo start --ios        # Start and open iOS simulator
npx expo start --android    # Start and open Android emulator
npx expo-doctor             # Check for project issues
```

## 🚢 Production Deployment

### Backend
1. Deploy to a hosting service (Heroku, Railway, DigitalOcean)
2. Set up MongoDB Atlas production database
3. Configure environment variables
4. Enable HTTPS

### Mobile App
1. Build for development: `eas build --profile development --platform ios`
2. Build for production: `eas build --profile production --platform all`
3. Submit to stores: `eas submit --platform all`

---

<div align="center">
  
  ### VaporChat
  
  **Ephemeral messaging for the modern age**
  
  Made with ❤️ using React Native, Express.js, and MongoDB
  
  [Report Bug](https://github.com/marioaburto10/vapor-chat-mobile-app/issues) · [Request Feature](https://github.com/marioaburto10/vapor-chat-mobile-app/issues)
  
  © 2025 VaporChat. All rights reserved.
  
</div>
