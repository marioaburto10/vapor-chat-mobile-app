# VaporChat - Quick Start Guide

Get VaporChat running in **5 minutes**! 🚀

## Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] npm or pnpm installed
- [ ] MongoDB Atlas account created
- [ ] Expo CLI installed (`npm install -g expo-cli`)

## 1. Clone & Install (2 minutes)

```bash
# Navigate to project root
cd vapor-chat-mobile-app

# Install backend dependencies
cd backend
npm install

# Install mobile dependencies
cd ../mobile
npm install
```

## 2. MongoDB Setup (1 minute)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Whitelist IP: `0.0.0.0/0` (for development)

## 3. Backend Configuration (1 minute)

Create `backend/.env`:

```bash
cd backend
touch .env
```

Add this (replace with your values):

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/vaporchat
JWT_SECRET=any-random-secret-key-here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:8081
```

## 4. Start Backend (30 seconds)

```bash
cd backend
npm run dev
```

✅ You should see: `✅ MongoDB connected successfully`

## 5. Configure Mobile App (30 seconds)

**For iOS Simulator or Android Emulator:**
- No changes needed! The default config works.

**For Physical Device:**
1. Find your computer's IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Update `mobile/app/config/api.ts`:
   ```typescript
   export const API_BASE_URL = 'http://YOUR_IP_HERE:5000';
   export const SOCKET_URL = 'http://YOUR_IP_HERE:5000';
   ```

## 6. Start Mobile App (30 seconds)

Open a **new terminal**:

```bash
cd mobile
npm start
```

Press:
- **`i`** for iOS Simulator (Mac only)
- **`a`** for Android Emulator
- **Scan QR code** with Expo Go app on your phone

## 7. Test It! (30 seconds)

1. **Sign Up** with any email/password
2. **Create a Room**: name="test", password="1234", displayName="You"
3. **Open on another device** or account
4. **Join the Room**: same name/password, different displayName
5. **Chat away!** 💬
6. **Vaporize** to delete everything! 💨

---

## Quick Commands Reference

```bash
# Backend
cd backend
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Run production

# Mobile
cd mobile
npm start        # Start Expo
npm run ios      # iOS Simulator
npm run android  # Android Emulator
expo start -c    # Clear cache
```

## Common Issues

**Can't connect to backend?**
- Check backend is running on port 5000
- For Android Emulator, use `http://10.0.2.2:5000` in `app/config/api.ts`
- For physical device, ensure same Wi-Fi network

**MongoDB connection error?**
- Check your connection string in `.env`
- Verify IP is whitelisted in MongoDB Atlas
- Check username and password are correct

**Expo won't start?**
```bash
cd mobile
rm -rf node_modules
npm install
expo start -c
```

---

## Next Steps

- Read **SETUP.md** for detailed instructions
- Check **FEATURES.md** for full feature list
- Review **ARCHITECTURE.md** for technical details

**Happy chatting! 💨**

