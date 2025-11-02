// utils/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserSession {
  id: string;
  surname: string;
  lastName: string;
  fullName: string; // for convenience
  phone: string;
  email?: string | null;
  role: "STUDENT" | "ADMIN";
  agreedToPolicy?: boolean;
}

interface AuthState {
  user: UserSession | null;
  token: string | null;
  setUser: (user: UserSession, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "rps-auth-storage", // persisted in localStorage
    }
  )
);
