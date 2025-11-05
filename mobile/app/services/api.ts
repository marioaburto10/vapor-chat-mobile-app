import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';
import { AuthResponse, RoomResponse, MessagesResponse } from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  signup: async (email: string, password: string, confirmPassword: string): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/signup', {
      email,
      password,
      confirmPassword,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};

// Room API
export const roomApi = {
  createRoom: async (roomName: string, password: string): Promise<RoomResponse> => {
    const response = await api.post('/api/rooms/create', {
      roomName,
      password,
    });
    return response.data;
  },

  joinRoom: async (roomName: string, password: string): Promise<RoomResponse> => {
    const response = await api.post('/api/rooms/join', {
      roomName,
      password,
    });
    return response.data;
  },

  getRoomMessages: async (roomId: string): Promise<MessagesResponse> => {
    const response = await api.get(`/api/rooms/${roomId}/messages`);
    return response.data;
  },

  vaporizeRoom: async (roomId: string): Promise<{ message: string; deletedCount: number }> => {
    const response = await api.delete(`/api/rooms/${roomId}/vaporize`);
    return response.data;
  },
};

export default api;

