# VaporChat - Complete Setup Guide

Follow these steps to get VaporChat running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **pnpm** - Comes with Node.js
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Expo CLI** - Install with `npm install -g expo-cli`
- **iOS Simulator** (Mac only) or **Android Studio** for emulators

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account if you don't have one
3. Create a new cluster (free tier is fine)
4. Click "Connect" on your cluster
5. Create a database user with username and password
6. Whitelist your IP address (or use 0.0.0.0/0 for development)
7. Copy your connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/
   ```

## Step 2: Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd vapor-chat-mobile-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:
   ```bash
   touch .env
   ```

4. Open `.env` and add the following (replace with your values):
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vaporchat?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-key-change-this-to-something-random
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:8081
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

6. You should see:
   ```
   ✅ MongoDB connected successfully
   🚀 Server running on port 5000
   📡 Socket.io ready for connections
   ```

7. Test the API by visiting `http://localhost:5000/health` in your browser

## Step 3: Mobile App Setup

1. Open a **NEW terminal** window (keep the backend running)

2. Navigate to the mobile directory:
   ```bash
   cd vapor-chat-mobile-app/mobile
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. **IMPORTANT**: Update the API configuration:
   - Open `mobile/app/config/api.ts`
   - For iOS Simulator: Keep `http://localhost:5000`
   - For Android Emulator: Use `http://10.0.2.2:5000`
   - For Physical Device: Use your computer's IP address (find it with `ipconfig` on Windows or `ifconfig` on Mac/Linux)

   Example for physical device:
   ```typescript
   export const API_BASE_URL = 'http://192.168.1.100:5000';
   export const SOCKET_URL = 'http://192.168.1.100:5000';
   ```

5. Start the Expo development server:
   ```bash
   npm start
   ```

6. Run the app:
   - Press `i` to open iOS Simulator (Mac only)
   - Press `a` to open Android Emulator
   - Scan the QR code with Expo Go app on your phone

## Step 4: Test the App

1. **Create an Account**:
   - Open the app
   - Tap "Sign Up"
   - Enter email and password
   - Tap "Sign Up"

2. **Create a Room**:
   - On the home screen, ensure "Create a Room" is selected
   - Enter a room name (e.g., "test-room")
   - Enter a password (e.g., "1234")
   - Enter your display name (e.g., "John")
   - Tap "Create"

3. **Test Chat** (using a second device or account):
   - Open the app on another device or logout and create another account
   - Tap "Join a Room"
   - Enter the same room name ("test-room")
   - Enter the password ("1234")
   - Enter a different display name (e.g., "Jane")
   - Tap "Join"
   - Send messages back and forth!

4. **Test Vaporize**:
   - In the chat room, tap "Vaporize History"
   - Confirm the action
   - All messages should disappear for all users

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**:
- Check your connection string in `.env`
- Verify your IP address is whitelisted in MongoDB Atlas
- Make sure your username and password are correct (URL encode special characters)

**Port Already in Use**:
```bash
# Change PORT in .env to 5001 or another available port
```

### Mobile App Issues

**Cannot Connect to Backend**:
- Make sure backend is running on `http://localhost:5000`
- Check your API configuration in `app/config/api.ts`
- For Android Emulator, use `http://10.0.2.2:5000`
- For physical devices, use your computer's local IP address
- Make sure your phone and computer are on the same Wi-Fi network

**Expo Not Starting**:
```bash
# Clear cache and restart
expo start -c
```

**Module Not Found Errors**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**iOS Simulator Not Opening**:
- Install Xcode from Mac App Store
- Run `sudo xcode-select --switch /Applications/Xcode.app`

**Android Emulator Not Opening**:
- Install Android Studio
- Create a virtual device in AVD Manager
- Make sure the emulator is running before pressing 'a'

## Development Tips

### Hot Reload
- Backend: Changes auto-reload with nodemon
- Mobile: Shake device or press `r` to reload

### View Logs
- Backend: Check terminal where `npm run dev` is running
- Mobile: Press `j` to open Chrome DevTools

### Reset Everything
```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Mobile
cd mobile
rm -rf node_modules
expo start -c
npm install
```

## Next Steps

- Customize the UI colors in `mobile/tailwind.config.js`
- Add user profiles
- Implement message notifications
- Add image/file sharing
- Deploy to production

## Need Help?

Check the main README.md for more information or open an issue on GitHub.

---

**Happy Coding! 💨**

