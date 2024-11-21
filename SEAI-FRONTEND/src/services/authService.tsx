import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance oluşturma
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authorization header ekleme veya kaldırma
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// API Yanıt Türleri
export type AuthResponse = {
  token: string;
  message?: string;
};

export type ErrorResponse = {
  response?: {
    data?: { message?: string };
    status?: number;
  };
};

// Login işlemi
export const login = async (email: string, password: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Beklenmeyen bir hata oluştu';
      console.error(`API Error: ${message}`);
      throw new Error(message); // Hata mesajını doğru bir şekilde fırlat
    }
    throw error; // Axios dışındaki hatalar için
  }
};
// Register işlemi
export const register = async (
  companyName: string,
  email: string,
  password: string
): Promise<AuthResponse | undefined> => {
  try {
    const response = await apiClient.post<AuthResponse>('/user', {
      companyName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
};

// Token yenileme işlemi
export const refreshAccessToken = async (): Promise<{ accessToken: string } | undefined> => {
  try {
    const response = await apiClient.post<{ accessToken: string }>('/auth/refresh');
    const { accessToken } = response.data;
    setAuthToken(accessToken);
    return { accessToken };
  } catch (error) {
    handleApiError(error);
    return undefined; // Hata durumunda undefined döndür
  }
};

// Logout işlemi
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
    setAuthToken(null); // Tokeni kaldır
  } catch (error) {
    handleApiError(error);
  }
};

// Şu anki kullanıcıyı al
export const getCurrentUser = async (): Promise<{ name: string; email: string } | undefined> => {
  const token = localStorage.getItem('authToken'); // Token kontrolü
  if (!token) {
    throw new Error('Token bulunamadı. Lütfen giriş yapmayı deneyin.');
  }
  setAuthToken(token); // Header'a ekle
  try {
    const response = await apiClient.get('/auth/verify');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};



// API Hata Yönetimi
const handleApiError = (error: unknown): never => {
  const axiosError = error as ErrorResponse;
  const status = axiosError.response?.status;
  let message = 'Beklenmeyen bir hata oluştu';

  if (status === 401) {
    message = 'Yetkilendirme hatası. Lütfen tekrar giriş yapın.';
    localStorage.removeItem('authToken'); // Geçersiz token varsa kaldır
  } else if (status === 403) {
    message = 'Erişim izniniz yok.';
  } else if (axiosError.response?.data?.message) {
    message = axiosError.response.data.message;
  }

  console.error(`API Error (${status}): ${message}`);
  throw new Error(message);
};


// authService Modülü
const authService = {
  login,
  register,
  logout,
  refreshAccessToken,
  getCurrentUser,
};

export default authService;
