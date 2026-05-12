// App.jsx — Main application with routing and context providers
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import { PageSpinner } from './components/ui/Spinner';

// Protected Route wrapper — redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Public Route wrapper — redirects to dashboard if already authenticated
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageSpinner />;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
};

// App Routes (inside AuthProvider so hooks work)
const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute><TaskProvider><Layout /></TaskProvider></ProtectedRoute>}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>

    {/* Catch-all redirect */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppRoutes />
          {/* Toast notification container */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              className: 'toast-custom',
              success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
