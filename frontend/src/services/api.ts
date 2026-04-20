import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

// PRODUCTION API CLIENT - NO DEMO MODE
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 240000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or auth store
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (e) {
        console.error('Error parsing auth storage:', e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string }>) => {
    const message = error.response?.data?.error || 'Ein Fehler ist aufgetreten';
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear auth storage
      localStorage.removeItem('auth-storage');
      
      // Redirect to login if on admin page
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
        toast.error('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      toast.error('Zugriff verweigert. Sie haben keine Berechtigung für diese Aktion.');
    }
    
    // Don't show toast for login errors (handled in component)
    if (!error.config?.url?.includes('/admin/login')) {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;