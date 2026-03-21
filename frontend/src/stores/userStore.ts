import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  favorites: string[]; // Car IDs
  createdAt: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  addFavorite: (carId: string) => void;
  removeFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
      
      addFavorite: (carId) => set((state) => {
        if (!state.user) return state;
        const favorites = [...state.user.favorites, carId];
        return {
          user: { ...state.user, favorites },
        };
      }),
      
      removeFavorite: (carId) => set((state) => {
        if (!state.user) return state;
        const favorites = state.user.favorites.filter(id => id !== carId);
        return {
          user: { ...state.user, favorites },
        };
      }),
      
      isFavorite: (carId) => {
        const state = get();
        return state.user?.favorites.includes(carId) || false;
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
