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
    const { token, message }: AuthResponse = await login(email, password);
    setUser({ token, companyName: message || 'Unknown' });
    localStorage.setItem('authToken', token);
  };

  const handleRegister = async (companyName: string, email: string, password: string) => {
    const { token }: AuthResponse = await register(companyName, email, password);
    setUser({ token, companyName });
    localStorage.setItem('authToken', token);
  };

  const handleLogout = useCallback(async () => {
    try {
      await logout(); // Backend'de oturumu sonlandır
      setUser(null); // Frontend'de kullanıcı durumunu sıfırla
      localStorage.removeItem('authToken'); // Token'ı temizle
    } catch (error) {
      console.error('Çıkış sırasında hata:', error);
    }
  }, []); // handleLogout artık sabit bir referansa sahip

  const refreshSession = useCallback(async () => {
    try {
      const { accessToken } = await refreshAccessToken();
      setUser((prevUser) => {
        if (prevUser) {
          return { ...prevUser, token: accessToken };
        }
        return prevUser;
      });
      localStorage.setItem('authToken', accessToken);
    } catch (error) {
      console.error('Token yenileme başarısız:', error);
      handleLogout(); // Sabit referansa sahip handleLogout çağrılıyor
    }
  }, [handleLogout]); // handleLogout bağımlılık dizisine eklendi

  useEffect(() => {
    const interval = setInterval(refreshSession, 10 * 60 * 1000); // 10 dakikada bir yenileme
    return () => clearInterval(interval);
  }, [refreshSession]); // refreshSession bağımlılık olarak eklendi

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !user) {
      setUser({ token, companyName: 'Saved Session' });
    }
  }, [user]);

  const isAuthenticated = !!user;

  return { user, isAuthenticated, handleLogin, handleRegister, handleLogout };
};
