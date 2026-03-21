import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { adminService } from '../services/adminService';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; role: string } | null;
  token: string | null;
  lastActivity: number;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
  updateActivity: () => void;
  checkInactivity: () => void;
}

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      lastActivity: Date.now(),

      login: async (username: string, password: string) => {
        const response = await adminService.login({ username, password });
        set({
          isAuthenticated: true,
          user: response.user,
          token: response.token,
          lastActivity: Date.now(),
        });
      },

      logout: () => {
        adminService.logout();
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          lastActivity: Date.now(),
        });
      },

      checkAuth: () => {
        const { token, lastActivity } = get();
        const isAuth = adminService.isLoggedIn();
        
        // Check token expiry and inactivity
        if (isAuth && token) {
          const now = Date.now();
          const inactive = now - lastActivity > INACTIVITY_TIMEOUT;
          
          if (inactive) {
            get().logout();
            return false;
          }
          
          set({ isAuthenticated: true });
          return true;
        }
        
        set({ isAuthenticated: false });
        return false;
      },

      updateActivity: () => {
        set({ lastActivity: Date.now() });
      },

      checkInactivity: () => {
        const { lastActivity, isAuthenticated } = get();
        if (isAuthenticated) {
          const now = Date.now();
          const inactive = now - lastActivity > INACTIVITY_TIMEOUT;
          
          if (inactive) {
            get().logout();
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        lastActivity: state.lastActivity,
      }),
    }
  )
);
