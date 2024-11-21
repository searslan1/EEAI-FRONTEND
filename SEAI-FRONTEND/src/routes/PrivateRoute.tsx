import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    // Giriş yapılmamışsa giriş sayfasına yönlendir
    return (
      <Navigate
        to="/"
        replace
        state={{ message: 'Öncelikle giriş yapmalısınız!' }}
      />
    );
  }

  // Giriş yapılmışsa bileşeni render et
  return children;
}
