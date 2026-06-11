import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Whiteboard from "../components/WhiteBoard";
import Chat from "../components/Chat";
import UserList from "../components/UserList";

import api from "../api/axios";
import { socket } from "../services/socket";

import type { message } from "../types/message";
import type { User } from "../types/user";

export default function Room() {
  const { roomId } = useParams<{ roomId: string }>();

  const [messages, setMessages] = useState<message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [showChat, setShowChat] = useState(true);
  const [showUsers, setShowUsers] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chat/messages/${roomId}`);
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    socket.emit("join-room", {
      roomId,
      username: currentUser.username,
      accountId: currentUser.id,
    });

    const handleMessage = (message: message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleUsers = (roomUsers: User[]) => {
      setUsers(roomUsers);
    };

    socket.on("receive-message", handleMessage);
    socket.on("room-users", handleUsers);

    return () => {
      socket.off("receive-message", handleMessage);
      socket.off("room-users", handleUsers);
    };
  }, [roomId]);

  if (!roomId) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center text-white">
        Invalid Room{" "}
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 flex overflow-hidden">
      ```
      {showUsers && (
        <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
            <h2 className="text-white font-bold">Collaborators</h2>

            <span className="text-xs text-emerald-400">
              {users.length} Online
            </span>
          </div>

          <UserList users={users} />
        </aside>
      )}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <div>
            <h1 className="text-white font-bold text-lg">Alloy Canvas</h1>

            <p className="text-slate-400 text-xs">Room: {roomId}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className="px-4 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700"
            >
              Invite
            </button>

            <button
              onClick={() => setShowUsers(!showUsers)}
              className="px-4 py-2 bg-slate-800 rounded-xl text-white"
            >
              Users
            </button>

            <button
              onClick={() => setShowChat(!showChat)}
              className="px-4 py-2 bg-slate-800 rounded-xl text-white"
            >
              Chat
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <Whiteboard roomId={roomId} users={users} messages={messages} />
        </div>
      </main>
      {showChat && (
        <aside className="w-[360px] border-l border-slate-800 bg-slate-900">
          <Chat roomId={roomId} messages={messages} />
        </aside>
      )}
    </div>
  );
}
