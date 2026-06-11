import { useEffect, useRef, useState } from "react";

import {
  Pencil,
  Eraser,
  Trash2,
  Minus,
  Plus,
  Square,
  Circle,
  Type,
} from "lucide-react";

import Toolbar from "./Toolbar";
import LayersPanel from "./LayersPanel";

import api from "../api/axios";
import { socket } from "../services/socket";

import type { message } from "../types/message";
import type { User } from "../types/user";

interface Props {
  roomId: string;
  users: User[];
  messages: message[];

  showUsers: boolean;
  showChat: boolean;

  toggleUsers: () => void;
  toggleChat: () => void;
}

export default function WhiteBoard({ roomId, users, messages}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [redoHistory, setRedoHistory] = useState<string[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [tool, setTool] = useState("pen");

  const [color, setColor] = useState("#2563eb");

  const [lineWidth, setLineWidth] = useState(3);

  const drawImage = (data: string) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0);
    };

    img.src = data;
  };

  const undoCanvas = () => {
    if (history.length < 2) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const previous = history[history.length - 2];

    setRedoHistory((prev) => [history[history.length - 1], ...prev]);

    setHistory((prev) => prev.slice(0, -1));

    drawImage(previous);
  };
  const redoCanvas = () => {
    if (redoHistory.length === 0) return;

    const snapshot = redoHistory[0];

    setHistory((prev) => [...prev, snapshot]);

    setRedoHistory((prev) => prev.slice(1));

    drawImage(snapshot);
  };
  const exportCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");

    link.download = `alloy-canvas-${roomId}.png`;

    link.href = canvas.toDataURL("image/png");

    link.click();
  };
  const loadCanvas = async () => {
    try {
      const res = await api.get(`/canvas/${roomId}`);

      if (res.data && res.data.data) {
        drawImage(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveCanvas = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const snapshot = canvas.toDataURL();

    setHistory((prev) => [...prev, snapshot]);
    setRedoHistory([]);

    try {
      await api.post(`/canvas/${roomId}`, {
        data: snapshot,
      });

      socket.emit("whiteboard-change", {
        roomId,
        imageData: snapshot,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCanvas();
  }, [roomId]);

  useEffect(() => {
    socket.connect();

    socket.on("whiteboard-change", (payload) => {
      if (payload?.imageData) {
        drawImage(payload.imageData);
      }
    });

    return () => {
      socket.off("whiteboard-change");
    };
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (tool === "rect" || tool === "circle") {
      setStartPoint({ x, y });
      return;
    }

    setDrawing(true);

    ctx.beginPath();

    ctx.moveTo(x, y);

    ctx.lineWidth = lineWidth;

    ctx.strokeStyle = tool === "eraser" ? "#f1f5f9" : color;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctx.stroke();
  };

  const stopDraw = async (e?: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    if (startPoint && e && tool === "rect") {
      ctx.strokeStyle = color;

      ctx.lineWidth = lineWidth;

      ctx.strokeRect(
        startPoint.x,
        startPoint.y,
        e.nativeEvent.offsetX - startPoint.x,
        e.nativeEvent.offsetY - startPoint.y,
      );

      setStartPoint(null);

      await saveCanvas();

      return;
    }

    if (startPoint && e && tool === "circle") {
      const radius = Math.sqrt(
        Math.pow(e.nativeEvent.offsetX - startPoint.x, 2) +
          Math.pow(e.nativeEvent.offsetY - startPoint.y, 2),
      );

      ctx.beginPath();

      ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2);

      ctx.strokeStyle = color;

      ctx.lineWidth = lineWidth;

      ctx.stroke();

      setStartPoint(null);

      await saveCanvas();

      return;
    }

    if (!drawing) return;

    setDrawing(false);

    await saveCanvas();
  };

  const clearCanvas = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    await saveCanvas();
  };

  return (
    <div className="h-full flex flex-col bg-slate-950">
      <Toolbar
        onUndo={undoCanvas}
        onRedo={redoCanvas}
        onExport={exportCanvas}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT TOOLBAR */}

        <div className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 gap-3">
          <button
            onClick={() => setTool("pen")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              tool === "pen"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => setTool("eraser")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              tool === "eraser"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            <Eraser size={18} />
          </button>

          <button
            onClick={() => setTool("rect")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              tool === "rect"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            <Square size={18} />
          </button>

          <button
            onClick={() => setTool("circle")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              tool === "circle"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            <Circle size={18} />
          </button>

          <button
            onClick={() => setTool("text")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              tool === "text"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            <Type size={18} />
          </button>

          <div className="h-px w-10 bg-slate-700 my-1" />

          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 cursor-pointer"
          />

          <button
            onClick={() => setLineWidth((prev) => Math.max(1, prev - 1))}
            className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center"
          >
            <Minus size={14} />
          </button>

          <span className="text-white text-sm">{lineWidth}</span>

          <button
            onClick={() => setLineWidth((prev) => prev + 1)}
            className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center"
          >
            <Plus size={14} />
          </button>

          <button
            onClick={clearCanvas}
            className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* CANVAS */}

        <div className="flex-1 relative overflow-auto bg-slate-100">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
              backgroundSize: "25px 25px",
            }}
          />

          <canvas
            ref={canvasRef}
            width={2500}
            height={1500}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={(e) => stopDraw(e)}
            onMouseLeave={stopDraw}
            className="absolute top-0 left-0 cursor-crosshair"
          />

          <div className="absolute top-4 left-4 bg-white rounded-xl shadow px-4 py-3">
            <div className="font-bold">Alloy Canvas</div>

            <div className="text-xs text-slate-500">Room: {roomId}</div>

            <div className="text-xs text-blue-600 capitalize">Tool: {tool}</div>
          </div>

          <div className="absolute bottom-4 left-4 flex gap-3">
            <div className="bg-white rounded-xl px-4 py-2 shadow">
              Users: {users.length}
            </div>

            <div className="bg-white rounded-xl px-4 py-2 shadow">
              Messages: {messages.length}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="w-80 bg-slate-900 border-l border-slate-800">
          <LayersPanel />
        </div>
      </div>
    </div>
  );
}
