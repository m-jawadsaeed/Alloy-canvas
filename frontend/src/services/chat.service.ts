import api from "../api/axios";

export const getMessages =
  (
    roomId: string
  ) => {
    return api.get(
      `/chat/${roomId}`
    );
  };