// ============================================
// Auth Context — Authentication State Management
// ============================================
// Manages user authentication state (user info, token).
// Provides login, register, logout, and profile update functions.
// Persists auth data in localStorage.

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ---- State ----
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('taskflow_token'));
  const [loading, setLoading] = useState(true);

  // ---- Load user on mount (if token exists) ----
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (error) {
          // Token is invalid or expired
          console.error('Failed to load user:', error);
          localStorage.removeItem('taskflow_token');
          localStorage.removeItem('taskflow_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  // ---- Register ----
  const register = useCallback(async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data);
      setToken(data.token);
      localStorage.setItem('taskflow_token', data.token);
      localStorage.setItem('taskflow_user', JSON.stringify(data));
      toast.success('Account created successfully! 🎉');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  }, []);

  // ---- Login ----
  const login = useCallback(async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setUser(data);
      setToken(data.token);
      localStorage.setItem('taskflow_token', data.token);
      localStorage.setItem('taskflow_user', JSON.stringify(data));
      toast.success(`Welcome back, ${data.name}! 👋`);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  }, []);

  // ---- Logout ----
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('taskflow_token');
    localStorage.removeItem('taskflow_user');
    toast.success('Logged out successfully');
  }, []);

  // ---- Update Profile ----
  const updateProfile = useCallback(async (userData) => {
    try {
      const data = await authService.updateProfile(userData);
      setUser(data);
      setToken(data.token);
      localStorage.setItem('taskflow_token', data.token);
      localStorage.setItem('taskflow_user', JSON.stringify(data));
      toast.success('Profile updated successfully!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      toast.error(message);
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
