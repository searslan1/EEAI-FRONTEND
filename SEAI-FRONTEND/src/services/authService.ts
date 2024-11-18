import axios from 'axios'; // Axios modülünü normal şekilde import ediyoruz
import API from './apiService';

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

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/admin/login`, { email, password });
    return response.data; // token ve mesaj
  } catch (error) {
    const axiosError = error as ErrorResponse; // Hata nesnesini manuel olarak ErrorResponse türüne çeviriyoruz
    throw new Error(axiosError.response?.data?.message || 'Login failed');
  }
};

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
    return response.data; // token ve mesaj
  } catch (error) {
    const axiosError = error as ErrorResponse; // Hata nesnesini manuel olarak ErrorResponse türüne çeviriyoruz
    throw new Error(axiosError.response?.data?.message || 'Registration failed');
  }
};

export const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
    const response = await API.post<{ accessToken: string }>('/auth/refresh'); // Artık API doğru şekilde tanımlı
    return response.data; // accessToken döner
  };

export const logout = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/admin/logout`);
  } catch (error) {
    const axiosError = error as ErrorResponse; // Hata nesnesini manuel olarak ErrorResponse türüne çeviriyoruz
    throw new Error(axiosError.response?.data?.message || 'Logout failed');
  }
};
