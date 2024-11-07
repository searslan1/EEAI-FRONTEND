import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InterviewManagement from './pages/InterviewManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/interview-management" element={<InterviewManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
