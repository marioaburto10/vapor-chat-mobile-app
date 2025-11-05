# VaporChat Mobile App

React Native mobile application for VaporChat.

## Tech Stack
- React Native + Expo
- TypeScript
- React Navigation
- Socket.io Client
- Axios
- AsyncStorage

## Setup

1. Install dependencies:
```bash
cd mobile
npm install
```

2. Update API configuration:
   - Edit `app/config/api.ts` with your backend server URL
   - For local development on a physical device, use your computer's IP address

3. Start the development server:
```bash
npm start
```

4. Run on platform:
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web
npm run web
```

## Project Structure
```
mobile/
├── App.tsx                     # Root component
├── app/
│   ├── components/            # Reusable UI components
│   │   ├── GradientButton.tsx
│   │   ├── VaporInput.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── screens/               # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── ChatRoomScreen.tsx
│   ├── navigation/            # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── context/               # React Context
│   │   └── AuthContext.tsx
│   ├── services/              # API and Socket services
│   │   ├── api.ts
│   │   └── socket.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   └── config/                # Configuration
│       └── api.ts
```

## Features
- User authentication (Login/Signup)
- Create and join password-protected rooms
- Real-time chat messaging
- Vaporize (delete) chat history
- Persistent login with AsyncStorage

## Design
- Black background with white/gray gradients
- Vapor-themed UI with smooth animations
- Minimalist, modern interface

