import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type PublicRouteProps = {
  children: JSX.Element;
  restricted?: boolean; // Giriş yapılmış kullanıcıları kısıtla
};

export default function PublicRoute({ children, restricted = false }: PublicRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated && restricted) {
    // Kullanıcı giriş yapmışsa ve rota kısıtlıysa dashboard'a yönlendir
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
