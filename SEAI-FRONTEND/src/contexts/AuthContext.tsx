    import { createContext, useState, useEffect, ReactNode,  } from 'react';
    import authService from '../services/authService'; // Backend API servisleri
    import { IUser } from '../types/IUser'; // Kullanıcı tipi tanımları
    import { useNavigate } from 'react-router-dom';

    // AuthContext türü
    interface AuthContextType {
    user: IUser | null; // Kullanıcı bilgileri
    isAuthenticated: boolean; // Kullanıcı giriş yapmış mı?
    login: (email: string, password: string) => Promise<void>; // Giriş işlevi
    logout: () => Promise<void>; // Çıkış işlevi
    refreshUser: () => Promise<void>; // Kullanıcı verilerini yenile
    isLoading: boolean; // Yükleme durumu
    }

    // Varsayılan değer
    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    // Sağlayıcı bileşeni
    export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Yükleme durumu
    const navigate = useNavigate();

    // Kullanıcıyı yenileme işlemi
    const refreshUser = async () => {
        try {
        setIsLoading(true);
        const userData = await authService.getCurrentUser();
        if (userData) {
            const formattedUser: IUser = {
            id: 'dummyId', // Eğer backend'den `id` gelmiyorsa, uygun bir değer atanmalı.
            role: 'user', // Backend'den rol bilgisi yoksa varsayılan bir değer eklenir.
            ...userData, // Backend'den gelen diğer kullanıcı bilgileri
            };
            setUser(formattedUser); // Kullanıcıyı güncelle
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
        } catch (error) {
        console.error('Kullanıcı verileri alınırken hata:', error);
        setUser(null);
        setIsAuthenticated(false);
        } finally {
        setIsLoading(false);
        }
    };

    // Giriş işlemi
    const login = async (email: string, password: string) => {
        try {
        setIsLoading(true);
        const response = await authService.login(email, password);
        if (!response || !response.token) {
            throw new Error('Giriş işlemi sırasında hata oluştu. Yanıt geçersiz.');
        }
        const { token } = response;
        localStorage.setItem('accessToken', token);
        await refreshUser();
        navigate('/dashboard'); // Başarılı giriş sonrası yönlendirme
        } catch (error) {
        console.error('Giriş yapılırken hata:', error);
        throw error; // Hata mesajını bileşene ilet
        } finally {
        setIsLoading(false);
        }
    };

    // Çıkış işlemi
    const logout = async () => {
        try {
        setIsLoading(true);
        await authService.logout(); // Backend çıkışı
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login'); // Çıkış sonrası yönlendirme
        } catch (error) {
        console.error('Çıkış yapılırken hata:', error);
        } finally {
        setIsLoading(false);
        }
    };

    // İlk yüklemede kullanıcıyı kontrol et
    useEffect(() => {
        const initializeAuth = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            await refreshUser();
        } else {
            setIsLoading(false);
        }
        };
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, refreshUser, isLoading }}>
        {children}
        </AuthContext.Provider>
    );
    };

    // // Context'i kullanmak için hook
    // export const useAuth = (): AuthContextType => {
    // const context = useContext(AuthContext);
    // if (!context) {
    //     throw new Error("useAuth hook'u AuthProvider dışında kullanılamaz");
    // }
    // return context;
    // };
