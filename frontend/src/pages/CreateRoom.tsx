import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateRoom() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const createRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/rooms", { name });

      navigate(`/room/${res.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-white mb-2">Create Room</h1>

        <p className="text-slate-400 mb-8">Start a new collaboration space</p>

        <form onSubmit={createRoom} className="space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Room Name"
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-4 outline-none focus:border-blue-500"
          />

          <button className="w-full py-4 bg-blue-600 rounded-xl hover:bg-blue-700 text-white font-semibold">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}
