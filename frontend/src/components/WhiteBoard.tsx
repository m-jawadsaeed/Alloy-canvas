import { useState } from "react";

import Toolbar from "./Toolbar";
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
    <div className="h-full flex flex-col bg-slate-950">
      <Toolbar />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT TOOLBAR */}

        <div className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 gap-3">
          <button
            onClick={() => setTool("pen")}
            className={`w-12 h-12 rounded-xl text-white transition ${
              tool === "pen" ? "bg-blue-600" : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            ✏
          </button>

          <button
            onClick={() => setTool("eraser")}
            className={`w-12 h-12 rounded-xl text-white transition ${
              tool === "eraser"
                ? "bg-blue-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            ⌫
          </button>

          <button
            onClick={() => setTool("text")}
            className={`w-12 h-12 rounded-xl text-white transition ${
              tool === "text"
                ? "bg-blue-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            T
          </button>

          <button
            onClick={() => setTool("rect")}
            className={`w-12 h-12 rounded-xl text-white transition ${
              tool === "rect"
                ? "bg-blue-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            ▭
          </button>

          <button
            onClick={() => setTool("circle")}
            className={`w-12 h-12 rounded-xl text-white transition ${
              tool === "circle"
                ? "bg-blue-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            ○
          </button>
        </div>

        {/* CANVAS AREA */}

        <div className="flex-1 relative overflow-auto bg-slate-100">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
              backgroundSize: "25px 25px",
            }}
          />

          <canvas
            width={2500}
            height={1500}
            className="absolute top-0 left-0"
          />

          {/* ROOM INFO */}

          <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg border px-4 py-3">
            <div className="font-bold text-slate-900">Alloy Canvas</div>

            <div className="text-xs text-slate-500">Room ID</div>

            <div className="text-xs font-mono text-blue-600">{roomId}</div>
          </div>

          {/* TOOL INFO */}

          <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg border px-4 py-3">
            <div className="text-xs text-slate-500">Active Tool</div>

            <div className="font-semibold text-slate-900 capitalize">
              {tool}
            </div>
          </div>

          {/* STATS */}

          <div className="absolute bottom-4 left-4 flex gap-3">
            <div className="bg-white border rounded-xl shadow px-4 py-2">
              <div className="text-xs text-slate-500">Users</div>

              <div className="font-bold text-slate-900">{users.length}</div>
            </div>

            <div className="bg-white border rounded-xl shadow px-4 py-2">
              <div className="text-xs text-slate-500">Messages</div>

              <div className="font-bold text-slate-900">{messages.length}</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-bold text-white">Layers</h3>

            <p className="text-xs text-slate-400">Manage canvas objects</p>
          </div>

          <LayersPanel />
        </div>
      </div>
    </div>
  );
}
