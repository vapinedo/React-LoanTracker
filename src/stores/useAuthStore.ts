import { create } from 'zustand';
import { User } from 'firebase/auth';
import useAuthService from '@services/useAuthService';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyToken: (token: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      await useAuthService().signIn(email, password);
      set({ user: useAuthService().user, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: String(error), loading: false });
      }
    }
  },
  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      await useAuthService().signUp(email, password);
      set({ user: useAuthService().user, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: String(error), loading: false });
      }
    }
  },
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await useAuthService().logout();
      set({ user: null, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: String(error), loading: false });
      }
    }
  },
  verifyToken: async (token: string) => {
    try {
      set({ loading: true, error: null });
      await useAuthService().verifyToken(token);
      set({ user: useAuthService().user, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: String(error), loading: false });
      }
    }
  },
}));

export default useAuthStore;
