import { useState } from "react";

import api from "../api/axios";

import { socket } from "../services/socket";

import type { Message } from "../types/message";

interface Props {
  roomId: string;
  messages: Message[];
}

export default function Chat({
  roomId,
  messages,
}: Props) {
  const [content, setContent] =
    useState("");

  const sendMessage =
    async () => {
      if (!content.trim())
        return;

      try {
        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) || "{}"
          );

        const payload = {
          message: content,
          roomId,
          userId: user.id,
        };

        await api.post(
          "/chat",
          payload
        );

        socket.emit(
          "send-message",
          {
            ...payload,
            createdAt:
              new Date().toISOString(),
          }
        );

        setContent("");
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
      <h3>Chat</h3>

      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>
              {msg.user.username}
            </strong>
            : {msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        placeholder="Type message..."
      />

      <button
        onClick={
          sendMessage
        }
      >
        Send
      </button>
    </div>
  );
}