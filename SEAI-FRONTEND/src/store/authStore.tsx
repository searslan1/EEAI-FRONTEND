import { create } from 'zustand';
import { login as apiLogin, logout as apiLogout, refreshAccessToken } from '../services/authService';

// AuthState tür tanımları
type AuthState = {
  token: string | null; // Kullanıcı tokeni
  isAuthenticated: boolean; // Kullanıcı giriş durumu
  loading: boolean; // Yükleme durumu
  login: (email: string, password: string) => Promise<void>; // Giriş işlevi
  logout: () => Promise<void>; // Çıkış işlevi
  initializeAuth: () => void; // İlk doğrulama
  refreshToken: () => Promise<void>; // Token yenileme
};

// Zustand Store
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  loading: false,

   // Kullanıcı giriş işlemi
   login: async (email, password) => {
    try {
      set({ loading: true });
      const response = await apiLogin(email, password);

      if (!response || !response.token) {
        throw new Error('Geçersiz yanıt alındı. Giriş başarısız.');
      }

      const { token } = response; // `token` artık tanımlı
      localStorage.setItem('authToken', token); // Tokeni localStorage'a kaydet
      set({ token, isAuthenticated: true }); // Auth durumunu güncelle
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      set({ loading: false });
    }
  },
  // Kullanıcı çıkış işlemi
  logout: async () => {
    try {
      set({ loading: true });
      await apiLogout(); // API'den çıkış işlemini çağır
      localStorage.removeItem('authToken'); // Tokeni localStorage'dan kaldır
      set({ token: null, isAuthenticated: false }); // Auth durumunu sıfırla
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Çıkış sırasında bir hata oluştu.');
    } finally {
      set({ loading: false });
    }
  },

  // Uygulama ilk yüklendiğinde doğrulama işlemi
  initializeAuth: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      set({ token, isAuthenticated: true }); // Token varsa kullanıcıyı giriş yapmış göster
    }
  },

// Token yenileme işlemi
refreshToken: async () => {
  try {
    const response = await refreshAccessToken();

    if (!response || !response.accessToken) {
      throw new Error('Geçersiz yanıt alındı. Token yenileme başarısız.');
    }

    const { accessToken } = response; // `accessToken` artık tanımlı
    localStorage.setItem('authToken', accessToken); // Yeni tokeni localStorage'a kaydet
    set({ token: accessToken }); // Tokeni güncelle
  } catch (error) {
    console.error('Token refresh error:', error);
    set({ token: null, isAuthenticated: false }); // Token yenileme başarısızsa auth durumunu sıfırla
    localStorage.removeItem('authToken');
    throw new Error('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
  }
},
}));