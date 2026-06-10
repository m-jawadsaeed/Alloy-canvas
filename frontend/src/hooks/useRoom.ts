import {
  useEffect,
  useState,
} from "react";

import {
  getRooms,
} from "../services/room.service";
export interface Room {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
export const useRoom =
  () => {
    const [rooms, setRooms] =
      useState<Room[]>([]);

    useEffect(() => {
      getRooms().then(
        (res) =>
          setRooms(
            res.data
          )
      );
    }, []);

    return {
      rooms,
    };
  };