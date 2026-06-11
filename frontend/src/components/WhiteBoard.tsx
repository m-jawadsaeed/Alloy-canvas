import { useState } from "react";
import Toolbar from "./Toolbar";
import Chat from "./Chat";
import UserList from "./UserList";
import LayersPanel from "./LayersPanel";
import type { message } from "../types/message";
import type { User } from "../types/user";    


interface Props {
  roomId: string;
  users: User[];
  messages: message[];
}

export default function WhiteBoard({ roomId, users, messages }: Props) {
  const [tool, setTool] = useState("pen");

  return (
    <div className="h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* TOP BAR */}
      <Toolbar />

      <div className="flex h-[calc(100vh-72px)]">
        {/* LEFT SIDEBAR */}
        <div className="w-20 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 gap-4">
          <button
            onClick={() => setTool("pen")}
            className={`w-12 h-12 rounded-xl ${
              tool === "pen" ? "bg-blue-600" : "bg-slate-800"
            }`}
          >
            ✏️
          </button>

          <button
            onClick={() => setTool("eraser")}
            className={`w-12 h-12 rounded-xl ${
              tool === "eraser" ? "bg-blue-600" : "bg-slate-800"
            }`}
          >
            🩹
          </button>

          <button
            onClick={() => setTool("text")}
            className={`w-12 h-12 rounded-xl ${
              tool === "text" ? "bg-blue-600" : "bg-slate-800"
            }`}
          >
            T
          </button>

          <button
            onClick={() => setTool("rectangle")}
            className={`w-12 h-12 rounded-xl ${
              tool === "rectangle" ? "bg-blue-600" : "bg-slate-800"
            }`}
          >
            ▭
          </button>

          <button
            onClick={() => setTool("circle")}
            className={`w-12 h-12 rounded-xl ${
              tool === "circle" ? "bg-blue-600" : "bg-slate-800"
            }`}
          >
            ◯
          </button>
        </div>

        {/* CENTER CANVAS */}
        <div className="flex-1 relative bg-slate-100">
          {/* GRID */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* CANVAS */}
          <canvas
            width={2000}
            height={1200}
            className="absolute top-0 left-0 cursor-crosshair"
          />

          {/* ROOM BADGE */}
          <div className="absolute top-4 left-4 bg-white shadow rounded-xl px-4 py-2 text-black">
            Room:
            <span className="font-semibold ml-2">{roomId}</span>
          </div>

          {/* ZOOM CONTROLS */}
          <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-xl flex items-center text-black">
            <button className="px-4 py-2">−</button>

            <span className="px-4">100%</span>

            <button className="px-4 py-2">+</button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-[380px] bg-slate-950 border-l border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <h2 className="font-bold text-lg">Collaboration</h2>
          </div>

          <div className="flex-1 overflow-auto">
            <UserList users={users} />

            <LayersPanel />
          </div>

          <div className="h-[320px] border-t border-slate-800">
            <Chat roomId={roomId} messages={messages} />
          </div>
        </div>
      </div>
    </div>
  );
}
