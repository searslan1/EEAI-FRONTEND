import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type PublicRouteProps = {
  children: JSX.Element;
  restricted?: boolean; // Sadece oturum açmış kullanıcılar için sınırlı alanlar
};

export default function PublicRoute({ children, restricted = false }: PublicRouteProps) {
  const auth = useAuth();

  if (auth.isAuthenticated && restricted) {
    // Eğer kullanıcı oturum açmışsa ve bu rota sınırlıysa, dashboard'a yönlendir
    return <Navigate to="/dashboard" />;
  }

  // Eğer kullanıcı oturum açmamışsa veya sınırlı değilse sayfayı render et
  return children;
}
