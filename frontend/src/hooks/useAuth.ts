import {
  useAuthStore,
} from "../store/auth.store";

export const useAuth =
  () => {
    const user =
      useAuthStore(
        (state) =>
          state.user
      );

    return {
      user,
    };
  };