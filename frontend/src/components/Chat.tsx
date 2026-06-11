import { useState } from "react";
import { Send } from "lucide-react";

import type { message } from "../types/message";

interface Props {
  roomId: string;
  messages: message[];
}

export default function Chat({ messages }: Props) {
  const [text, setText] = useState("");

  return (
    <div className="h-full flex flex-col">
      <div className="h-16 border-b border-slate-800 flex items-center px-4">
        <h2 className="font-bold text-white">Room Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-slate-800 rounded-xl p-3">
            <p className="text-blue-400 text-sm font-semibold">
              {"username" in msg ? String(msg.username) : "User"}
            </p>

            <p className="text-white">{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <button className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
