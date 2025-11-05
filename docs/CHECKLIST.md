# VaporChat - Setup Checklist

Use this checklist to ensure everything is properly configured before running the app.

## ✅ Prerequisites

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm or pnpm installed (`npm --version`)
- [ ] MongoDB Atlas account created
- [ ] Expo CLI installed (`expo --version`)
- [ ] iOS Simulator or Android Emulator set up (for development)

## ✅ MongoDB Setup

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with username and password
- [ ] IP address whitelisted (use `0.0.0.0/0` for development)
- [ ] Connection string copied
- [ ] Database name set to `vaporchat` in connection string

## ✅ Backend Setup

- [ ] Navigated to `backend/` directory
- [ ] Ran `npm install`
- [ ] Created `.env` file in `backend/` directory
- [ ] Added all required environment variables:
  - [ ] `PORT=5000`
  - [ ] `MONGODB_URI=mongodb+srv://...`
  - [ ] `JWT_SECRET=your-secret-key`
  - [ ] `JWT_EXPIRES_IN=7d`
  - [ ] `CLIENT_URL=http://localhost:8081`
- [ ] No TypeScript errors when starting server
- [ ] Backend starts successfully with `npm run dev`
- [ ] See "MongoDB connected successfully" message
- [ ] See "Server running on port 5000" message
- [ ] Can access `http://localhost:5000/health` in browser

## ✅ Mobile Setup

- [ ] Navigated to `mobile/` directory
- [ ] Ran `npm install`
- [ ] Updated `app/config/api.ts` with correct backend URL:
  - [ ] For iOS Simulator: `http://localhost:5000`
  - [ ] For Android Emulator: `http://10.0.2.2:5000`
  - [ ] For Physical Device: `http://YOUR_COMPUTER_IP:5000`
- [ ] Logo file exists at `public/VaporChatLogo.png`
- [ ] No TypeScript errors
- [ ] Expo starts successfully with `npm start`

## ✅ File Structure Verification

### Backend Files
- [ ] `backend/package.json`
- [ ] `backend/tsconfig.json`
- [ ] `backend/.env` (you created this)
- [ ] `backend/src/server.ts`
- [ ] `backend/src/config/database.ts`
- [ ] `backend/src/models/User.ts`
- [ ] `backend/src/models/Room.ts`
- [ ] `backend/src/models/Message.ts`
- [ ] `backend/src/controllers/authController.ts`
- [ ] `backend/src/controllers/roomController.ts`
- [ ] `backend/src/routes/authRoutes.ts`
- [ ] `backend/src/routes/roomRoutes.ts`
- [ ] `backend/src/middleware/auth.ts`
- [ ] `backend/src/middleware/errorHandler.ts`
- [ ] `backend/src/sockets/chatSocket.ts`

### Mobile Files
- [ ] `mobile/package.json`
- [ ] `mobile/tsconfig.json`
- [ ] `mobile/app.json`
- [ ] `mobile/App.tsx`
- [ ] `mobile/app/types/index.ts`
- [ ] `mobile/app/config/api.ts`
- [ ] `mobile/app/context/AuthContext.tsx`
- [ ] `mobile/app/services/api.ts`
- [ ] `mobile/app/services/socket.ts`
- [ ] `mobile/app/navigation/AppNavigator.tsx`
- [ ] `mobile/app/components/GradientButton.tsx`
- [ ] `mobile/app/components/VaporInput.tsx`
- [ ] `mobile/app/components/Header.tsx`
- [ ] `mobile/app/components/Footer.tsx`
- [ ] `mobile/app/screens/LoginScreen.tsx`
- [ ] `mobile/app/screens/SignupScreen.tsx`
- [ ] `mobile/app/screens/HomeScreen.tsx`
- [ ] `mobile/app/screens/ChatRoomScreen.tsx`

### Documentation Files
- [ ] `README.md` (main)
- [ ] `SETUP.md`
- [ ] `QUICK_START.md`
- [ ] `FEATURES.md`
- [ ] `ARCHITECTURE.md`
- [ ] `PROJECT_SUMMARY.md`
- [ ] `CHECKLIST.md` (this file)
- [ ] `backend/README.md`
- [ ] `mobile/README.md`

## ✅ Testing

### Backend Tests
- [ ] Backend server is running
- [ ] Can access health endpoint: `http://localhost:5000/health`
- [ ] MongoDB connection is successful
- [ ] No errors in backend terminal

### Mobile App Tests
- [ ] App launches without errors
- [ ] Can see Login screen
- [ ] Can navigate to Signup screen
- [ ] No red error screens

### End-to-End Test
- [ ] **Sign Up**
  - [ ] Can create account with email/password
  - [ ] Redirects to Home screen after signup
  - [ ] Token saved (stays logged in after app restart)

- [ ] **Create Room**
  - [ ] Can enter room name
  - [ ] Can enter room password
  - [ ] Can enter display name
  - [ ] Tapping "Create" navigates to ChatRoom
  - [ ] Room name appears in header

- [ ] **Join Room** (use second device or account)
  - [ ] Can enter same room name
  - [ ] Can enter correct password
  - [ ] Wrong password shows error
  - [ ] Successfully joins room

- [ ] **Chat**
  - [ ] Can type message
  - [ ] Tapping "Send" sends message
  - [ ] Message appears instantly
  - [ ] Other user sees message in real-time
  - [ ] Own messages appear on right
  - [ ] Other messages appear on left with display name

- [ ] **Vaporize**
  - [ ] Tapping "Vaporize History" shows confirmation
  - [ ] Confirming deletes all messages
  - [ ] Both users see empty chat
  - [ ] Can send new messages after vaporize

- [ ] **Exit Room**
  - [ ] Tapping "Exit Room" returns to Home
  - [ ] Can create/join another room

- [ ] **Logout**
  - [ ] Can logout from Home screen
  - [ ] Returns to Login screen
  - [ ] Token is cleared

## ✅ Common Issues Resolved

- [ ] If "Cannot connect to backend":
  - [ ] Backend is running
  - [ ] URL in `app/config/api.ts` is correct
  - [ ] For Android, using `10.0.2.2` instead of `localhost`
  - [ ] For physical device, on same Wi-Fi network

- [ ] If "MongoDB connection error":
  - [ ] Connection string is correct
  - [ ] Username and password are correct
  - [ ] IP is whitelisted in MongoDB Atlas
  - [ ] Special characters in password are URL-encoded

- [ ] If "Module not found" errors:
  - [ ] Ran `npm install` in both directories
  - [ ] Cleared Expo cache with `expo start -c`
  - [ ] Deleted `node_modules` and reinstalled

- [ ] If "Port 5000 already in use":
  - [ ] Changed PORT in `.env` to another number
  - [ ] Updated mobile config to match

## ✅ Production Readiness (Optional)

- [ ] Changed JWT_SECRET to a strong random value
- [ ] Updated CLIENT_URL for production
- [ ] Set NODE_ENV to "production"
- [ ] Configured production MongoDB cluster
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Set up logging (e.g., Winston)
- [ ] Configured SSL/HTTPS
- [ ] Built mobile app for production
- [ ] Updated API URLs in mobile app to production backend
- [ ] Tested on both iOS and Android devices

## 🎉 Ready to Use!

If all checkboxes above are checked, your VaporChat application is fully set up and ready to use!

### Quick Commands

**Start Development:**
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Mobile
cd mobile && npm start
```

**Test the App:**
1. Press `i` (iOS) or `a` (Android)
2. Sign up with any email
3. Create a room
4. Chat away!
5. Vaporize when done!

### Next Steps
- Customize the UI colors
- Add more features (see FEATURES.md)
- Deploy to production (see README.md)
- Share with friends!

---

**Congratulations! VaporChat is ready to go! 💨**

