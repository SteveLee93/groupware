import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
// import Calendar from './pages/Calendar';
// import Documents from './pages/Documents';
// import Approval from './pages/Approval';
import Login from './pages/Login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/calendar"
        element={
          <PrivateRoute>
            <Calendar />
          </PrivateRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <PrivateRoute>
            <Documents />
          </PrivateRoute>
        }
      />
      <Route
        path="/approval"
        element={
          <PrivateRoute>
            <Approval />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
}

export default AppRoutes;
