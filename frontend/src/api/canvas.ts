import api from "./axios";

export const saveCanvas = async (
  roomId: string,
  data: string
) => {
  return api.post(
    `/canvas/${roomId}`,
    {
      data,
    }
  );
};

export const getCanvas = async (
  roomId: string
) => {
  return api.get(
    `/canvas/${roomId}`
  );
};