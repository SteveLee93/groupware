import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Documents from './pages/Documents';
import DocumentList from './pages/approval/DocumentList';
import DocumentForm from './pages/approval/DocumentForm';
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
      <Route
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
            <DocumentList />
          </PrivateRoute>
        }
      />
      <Route
        path="/approval/new"
        element={
          <PrivateRoute>
            <DocumentForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
