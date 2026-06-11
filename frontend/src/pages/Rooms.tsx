import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WhiteBoard from "../components/WhiteBoard";
import Chat from "../components/Chat";
import UserList from "../components/UserList";

import api from "../api/axios";
import { socket } from "../services/socket";

import type { message } from "../types/message";
import type { User } from "../types/user";

export default function Room() {
  const { roomId } = useParams<{
    roomId: string;
  }>();

  const [messages, setMessages] = useState<message[]>([]);

  const [users, setUsers] = useState<User[]>([]);

  const [showChat] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chat/messages/${roomId}`);

        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    socket.connect();

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    socket.emit("join-room", {
      roomId,
      username: currentUser.username,
      accountId: currentUser.id,
    });

    socket.on("receive-message", (message: message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("room-users", (roomUsers: User[]) => {
      setUsers(roomUsers);
    });

    return () => {
      socket.off("receive-message");

      socket.off("room-users");
    };
  }, [roomId]);

  if (!roomId) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
        Invalid Room
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-slate-950 overflow-hidden">
      <aside className="w-72 border-r border-slate-800 bg-slate-900">
        <UserList users={users} />
      </aside>

      <main className="flex-1 overflow-hidden">
        <WhiteBoard roomId={roomId} users={users} messages={messages} />
      </main>

      {showChat && (
        <aside className="w-[380px] border-l border-slate-800 bg-slate-900">
          <Chat roomId={roomId} messages={messages} />
        </aside>
      )}
    </div>
  );
}
