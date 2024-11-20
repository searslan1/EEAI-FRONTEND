import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export type AuthResponse = {
  token: string;
  message?: string;
};

export type ErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

// Login Fonksiyonu
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/admin/login`, { email, password });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Login failed'); // Bu eklenmeli
  }
};

// Register Fonksiyonu
export const register = async (
  companyName: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
      companyName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Registration failed'); // Bu eklenmeli
  }
};

// Token Yenileme Fonksiyonu
export const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
  try {
    const response = await axios.post<{ accessToken: string }>(`${API_URL}/auth/refresh`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw new Error('Refresh token failed'); // Bu eklenmeli
  }
};

// Logout Fonksiyonu
export const logout = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/admin/logout`);
  } catch (error) {
    handleApiError(error);
    throw new Error('Logout failed'); // Bu eklenmeli
  }
};

// Hata Yönetim Fonksiyonu
const handleApiError = (error: unknown): never => {
  const axiosError = error as ErrorResponse;
  const message = axiosError.response?.data?.message || 'An unexpected error occurred';
  throw new Error(message);
};
