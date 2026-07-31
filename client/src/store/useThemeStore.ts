import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const stored = localStorage.getItem('reeksto_theme');
      if (stored === 'light' || stored === 'dark') return stored;
      
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  };

  return {
    theme: getInitialTheme(),
    toggleTheme: () => set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('reeksto_theme', newTheme);
        document.documentElement.className = newTheme;
      }
      return { theme: newTheme };
    }),
    setTheme: (theme) => set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('reeksto_theme', theme);
        document.documentElement.className = theme;
      }
      return { theme };
    })
  };
});
