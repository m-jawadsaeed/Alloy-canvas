import api from "../api/axios";

export const getRooms =
  () => {
    return api.get("/rooms");
  };

export const createRoom =
  (
    name: string
  ) => {
    return api.post(
      "/rooms",
      {
        name,
      }
    );
  };