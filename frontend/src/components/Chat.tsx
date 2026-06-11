import { useState } from "react";
import api from "../api/axios";
import { socket } from "../services/socket";
import type { message } from "../types/message";

interface Props {
  roomId: string;
  messages: message[];
}

export default function Chat({ roomId, messages }: Props) {
  const [content, setContent] = useState("");

  const sendMessage = async () => {
    if (!content.trim()) return;

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const payload = {
        message: content,
        roomId,
        userId: user.id,
      };

      await api.post("/chat", payload);

      socket.emit("send-message", {
        ...payload,
        createdAt: new Date().toISOString(),
      });

      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#313338] text-white">
      {/* Header */}
      <div className="h-16 px-5 flex items-center border-b border-[#232428]">
        <h2 className="font-bold text-lg">💬 Room Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 mt-10">
            No messages yet
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
              {msg.user.username?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{msg.user.username}</span>

                <span className="text-xs text-slate-400">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>

              <p className="text-slate-200 break-words">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#232428]">
        <div className="flex gap-3">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Message #general"
            className="flex-1 bg-[#1e1f22] border border-[#3f4147] rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 px-5 rounded-xl font-medium transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
