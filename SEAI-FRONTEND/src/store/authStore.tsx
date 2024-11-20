import { create } from 'zustand';
import { login as apiLogin, logout as apiLogout, refreshAccessToken } from '../services/authService';

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => void;
  refreshToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  loading: false,

  login: async (email, password) => {
    try {
      set({ loading: true });
      const { token } = await apiLogin(email, password);
      localStorage.setItem('authToken', token);
      set({ token, isAuthenticated: true });
    
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      await apiLogout();
      localStorage.removeItem('authToken');
      set({ token: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ loading: false });
    }
  },

  initializeAuth: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },

  refreshToken: async () => {
    try {
      const { accessToken } = await refreshAccessToken();
      localStorage.setItem('authToken', accessToken);
      set({ token: accessToken });
    } catch (error) {
      console.error('Token refresh error:', error);
      set({ token: null, isAuthenticated: false });
      localStorage.removeItem('authToken');
    }
  },
}));
