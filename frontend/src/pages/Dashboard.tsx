import { useEffect, useState } from "react";
import api from "../api/axios";

interface Room {
  id: string;
  name: string;
  slug: string;
}

export default function Dashboard() {
  const [rooms, setRooms] =
    useState<Room[]>([]);

  useEffect(() => {
    const loadRooms =
      async () => {
        try {
          const res =
            await api.get(
              "/rooms"
            );

          setRooms(
            res.data
          );
        } catch (error) {
          console.error(
            error
          );
        }
      };

    loadRooms();
  }, []);

  return (
    <div>
      <h1>Alloy Canvas</h1>

      <h2>Rooms</h2>

      {rooms.map(
        (room) => (
          <div
            key={room.id}
          >
            {room.name}
          </div>
        )
      )}
    </div>
  );
}