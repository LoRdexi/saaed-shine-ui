import { create } from "zustand";

interface User {
  name: string;
  email: string;
  isGuest?: boolean;
}

interface AppState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
