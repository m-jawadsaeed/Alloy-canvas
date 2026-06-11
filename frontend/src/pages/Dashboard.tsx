import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

interface Room {
  id: string;
  name: string;
  slug: string;
}

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const res = await api.get("/rooms");

        setRooms(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadRooms();
  }, []);

  return (
    <div className="space-y-8">
      {/* HERO */}

      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
        <h1 className="text-5xl font-bold">Welcome Back</h1>

        <p className="mt-3 text-blue-100">
          Create, collaborate and design in real-time.
        </p>

        <Link
          to="/create-room"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold"
        >
          Create Room
        </Link>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">Total Rooms</p>

          <h2 className="text-4xl font-bold mt-2">{rooms.length}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">Collaborators</p>

          <h2 className="text-4xl font-bold mt-2">24</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">Active Sessions</p>

          <h2 className="text-4xl font-bold mt-2">12</h2>
        </div>
      </div>

      {/* ROOMS */}

      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Your Rooms</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Link
              key={room.id}
              to={`/room/${room.id}`}
              className="group bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500 transition"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{room.name}</h3>

                  <p className="text-slate-400 text-sm">{room.slug}</p>
                </div>
              </div>

              <div className="mt-5 text-sm text-slate-400">
                Open collaborative room
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
