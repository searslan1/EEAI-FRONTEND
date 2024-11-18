import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    // Eğer kullanıcı oturum açmamışsa, giriş sayfasına yönlendir
    return <Navigate to="/" />;
  }

  // Eğer kullanıcı oturum açmışsa, sayfayı render et
  return children;
}
