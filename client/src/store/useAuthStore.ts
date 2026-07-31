import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  addresses?: any[];
  wishlist?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setError: (error: string | null) => void;
  setAddresses: (addresses: any[]) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Safe retrieval from localStorage in SSR context
  const getInitialState = () => {
    if (typeof window === 'undefined') return { user: null, token: null };
    try {
      const storedUser = localStorage.getItem('reeksto_user');
      const storedToken = localStorage.getItem('reeksto_token');
      return {
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken || null
      };
    } catch {
      return { user: null, token: null };
    }
  };

  const { user, token } = getInitialState();

  return {
    user,
    token,
    isAuthenticated: !!token,
    loading: false,
    error: null,

    login: (userData, token) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('reeksto_user', JSON.stringify(userData));
        localStorage.setItem('reeksto_token', token);
      }
      set({ user: userData, token, isAuthenticated: true, error: null });
    },

    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('reeksto_user');
        localStorage.removeItem('reeksto_token');
      }
      set({ user: null, token: null, isAuthenticated: false, error: null });
    },

    updateUser: (userData) => {
      set((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, ...userData };
        if (typeof window !== 'undefined') {
          localStorage.setItem('reeksto_user', JSON.stringify(updatedUser));
        }
        return { user: updatedUser };
      });
    },

    setAddresses: (addresses) => {
      set((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, addresses };
        if (typeof window !== 'undefined') {
          localStorage.setItem('reeksto_user', JSON.stringify(updatedUser));
        }
        return { user: updatedUser };
      });
    },

    setError: (error) => set({ error }),
  };
});
