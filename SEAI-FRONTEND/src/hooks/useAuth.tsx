import { useState, useEffect, useCallback } from 'react';
import { login, register, logout, refreshAccessToken, AuthResponse } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<{
    token: string;
    companyName: string;
  } | null>(() => {
    const token = localStorage.getItem('authToken');
    return token ? { token, companyName: 'Saved Session' } : null;
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      const { token, message }: AuthResponse = await login(email, password);
      setUser({ token, companyName: message || 'Unknown' });
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (companyName: string, email: string, password: string) => {
    try {
      const { token }: AuthResponse = await register(companyName, email, password);
      setUser({ token, companyName });
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
    }
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const { accessToken } = await refreshAccessToken();
      setUser((prevUser) => (prevUser ? { ...prevUser, token: accessToken } : null));
      localStorage.setItem('authToken', accessToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    const interval = setInterval(refreshSession, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshSession]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !user) {
      setUser({ token, companyName: 'Saved Session' });
    }
  }, [user]);

  const isAuthenticated = !!user;

  return { user, isAuthenticated, handleLogin, handleRegister, handleLogout };
};
