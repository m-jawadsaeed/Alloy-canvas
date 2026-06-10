import api from "../api/axios";

export const login = (
  identifier: string,
  password: string
) => {
  return api.post(
    "/auth/login",
    {
      identifier,
      password,
    }
  );
};

export const register =
  (
    username: string,
    email: string,
    password: string
  ) => {
    return api.post(
      "/auth/register",
      {
        username,
        email,
        password,
      }
    );
  };