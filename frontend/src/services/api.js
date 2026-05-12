// ============================================
// API Service — Axios Instance Configuration
// ============================================
// Creates a configured Axios instance for making HTTP requests.
// Automatically adds the JWT token to every request and
// handles 401 errors (expired/invalid token).

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  // In development, the Vite proxy handles routing to the backend
  // In production, the backend serves the frontend
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---- Request Interceptor ----
// Automatically add the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('taskflow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ---- Response Interceptor ----
// Handle 401 errors globally (token expired/invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored auth data
      localStorage.removeItem('taskflow_token');
      localStorage.removeItem('taskflow_user');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
