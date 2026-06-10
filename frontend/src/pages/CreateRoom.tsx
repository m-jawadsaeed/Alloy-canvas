import { useState } from "react";
import api from "../api/axios";

export default function CreateRoom() {
  const [name, setName] =
    useState("");

  const createRoom =
    async () => {
      const res =
        await api.post(
          "/rooms",
          {
            name,
          }
        );

      window.location.href =
        `/room/${res.data.id}`;
    };

  return (
    <div>
      <input
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <button
        onClick={createRoom}
      >
        Create Room
      </button>
    </div>
  );
}