import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";

import Chat from "../components/Chat";
import UsersList from "../components/UserList";
import Whiteboard from "../components/WhiteBoard";

import { socket } from "../services/socket";

import type { User } from "../types/user";
import type { Message } from "../types/message";

export default function Room() {
  const { roomId } = useParams();

  const [users, setUsers] =
    useState<User[]>([]);

  const [messages, setMessages] =
    useState<Message[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const initializeRoom =
      async () => {
        try {
          const [usersRes, messagesRes] =
            await Promise.all([
              api.get(
                `/users/${roomId}`
              ),
              api.get(
                `/chat/${roomId}`
              ),
            ]);

          setUsers(
            usersRes.data
          );

          setMessages(
            messagesRes.data
          );
        } catch (error) {
          console.error(
            error
          );
        }
      };

    initializeRoom();

    const user = JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );

    socket.connect();

    socket.emit(
      "join-room",
      {
        roomId,
        username:
          user.username,
      }
    );

    const handleMessage = (
      message: Message
    ) => {
      setMessages(
        (prev) => [
          ...prev,
          message,
        ]
      );
    };

    const refreshUsers =
      async () => {
        try {
          const res =
            await api.get(
              `/users/${roomId}`
            );

          setUsers(
            res.data
          );
        } catch (error) {
          console.error(
            error
          );
        }
      };

    socket.on(
      "receive-message",
      handleMessage
    );

    socket.on(
      "user-joined",
      refreshUsers
    );

    socket.on(
      "user-left",
      refreshUsers
    );

    return () => {
      socket.off(
        "receive-message",
        handleMessage
      );

      socket.off(
        "user-joined",
        refreshUsers
      );

      socket.off(
        "user-left",
        refreshUsers
      );

      socket.disconnect();
    };
  }, [roomId]);

  if (!roomId) {
    return (
      <div>
        Invalid Room
      </div>
    );
  }

  return (
    <div>
      <h1>
        Room {roomId}
      </h1>

      <UsersList
        users={users}
      />

      <Whiteboard
        roomId={roomId}
      />

      <Chat
        roomId={roomId}
        messages={messages}
      />
    </div>
  );
}