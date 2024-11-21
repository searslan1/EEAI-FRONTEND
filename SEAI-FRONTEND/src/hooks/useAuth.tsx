import { useState, useEffect, useCallback } from 'react';
import {
  login,
  register,
  logout,
  refreshAccessToken,
  getCurrentUser,
  setAuthToken,
} from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<{ name: string; email: string; token: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Yükleme durumu
  const [error, setError] = useState<string | null>(null); // Hata durumu

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await login(email, password);
      if (!response || !response.token) throw new Error('Invalid login response.');
      const { token } = response;

      setAuthToken(token);
      const userData = await getCurrentUser();
      if (!userData) throw new Error('Failed to fetch user data.');
      setUser({ ...userData, token });
      localStorage.setItem('authToken', token);
    } catch (error: unknown) {
      console.error('Login error:', error);
      setError((error as Error).message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (companyName: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await register(companyName, email, password);
      if (!response || !response.token) throw new Error('Invalid registration response.');
      const { token } = response;

      setAuthToken(token);
      const userData = await getCurrentUser();
      if (!userData) throw new Error('Failed to fetch user data.');
      setUser({ ...userData, token });
      localStorage.setItem('authToken', token);
    } catch (error: unknown) {
      console.error('Registration error:', error);
      setError((error as Error).message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await logout();
      setUser(null);
      localStorage.removeItem('authToken');
    } catch (error: unknown) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await refreshAccessToken();
      if (!response || !response.accessToken) throw new Error('Failed to refresh token.');
      const { accessToken } = response;

      setAuthToken(accessToken);
      setUser((prev) => (prev ? { ...prev, token: accessToken } : null));
      localStorage.setItem('authToken', accessToken);
    } catch (error: unknown) {
      console.error('Token refresh error:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    const interval = setInterval(refreshSession, 10 * 60 * 1000); // Her 10 dakikada bir token yenileme
    return () => clearInterval(interval);
  }, [refreshSession]);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        try {
          const userData = await getCurrentUser();
          setUser({ ...userData!, token });
        } catch (error) {
          console.error('Failed to load user:', error);
        }
      }
    };
    loadUser();
  }, []);

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    loading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
