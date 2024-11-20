import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import InterviewManagement from '../pages/InterviewManagement/InterviewManagement';
import QuestionPanel from '../pages/QuestionManagement/QuestionPanel';
import MainPage from '../pages/MainPage/MainPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Giriş yapılmamış kullanıcılar ana sayfaya erişebilir */}
        <Route
          path="/"
          element={
            <PublicRoute restricted={false}>
              <MainPage />
            </PublicRoute>
          }
        />
        {/* Giriş yapılmış kullanıcılar özel rotalara erişebilir */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/interview-management"
          element={
            <PrivateRoute>
              <InterviewManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <PrivateRoute>
              <QuestionPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
