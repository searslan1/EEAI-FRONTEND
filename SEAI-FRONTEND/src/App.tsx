import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InterviewManagement from './pages/InterviewManagement';
import QuestionPanel from './pages/QuestionPanel';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute bileşeni

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
