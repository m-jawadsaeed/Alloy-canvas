import { create } from "zustand";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthStore {
  user: User | null;

  login: (user: User) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: JSON.parse(
      localStorage.getItem("user") ||
        "null"
    ),

    login: (user) => {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      set({ user });
    },

    logout: () => {
      localStorage.removeItem(
        "user"
      );

      set({
        user: null,
      });
    },
  }));