import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
export type ColorTheme = 'red' | 'gold';

interface ThemeState {
  mode: ThemeMode;
  colorTheme: ColorTheme;
  setMode: (mode: ThemeMode) => void;
  setColorTheme: (theme: ColorTheme) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      colorTheme: 'red',
      setMode: (mode) => set({ mode }),
      setColorTheme: (colorTheme) => set({ colorTheme }),
      toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Theme colors
export const themes = {
  red: {
    primary: '#dc2626',
    primaryLight: '#ef4444',
    primaryDark: '#b91c1c',
  },
  gold: {
    primary: '#c9a84c',
    primaryLight: '#e8c97a',
    primaryDark: '#a68a3d',
  },
};

export const getThemeColors = (colorTheme: ColorTheme) => themes[colorTheme];
