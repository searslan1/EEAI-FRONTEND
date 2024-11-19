import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import InterviewManagement from '../pages/InterviewManagement/InterviewManagement';
import QuestionPanel from '../pages/QuestionManagement/QuestionPanel';
import LoginPage from '../pages/MainPage/MainPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'; // PublicRoute bileşeni

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute restricted={true}>
              <LoginPage />
            </PublicRoute>
          }
        />
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
