import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type PublicRouteProps = {
  children: JSX.Element;
  restricted?: boolean; // Giriş yapılmış kullanıcıları kısıtla
};

export default function PublicRoute({ children, restricted = false }: PublicRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated && restricted) {
    // Giriş yapılmış kullanıcılar için dashboard yönlendirme
    return (
      <Navigate
        to="/dashboard"
        replace
        state={{ message: 'Zaten giriş yaptınız, dashboarda yönlendiriliyorsunuz.' }}
      />
    );
  }

  return children;
}
