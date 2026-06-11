import { Undo2, Download, Trash2 } from "lucide-react";

import { useCanvasStore } from "../store/canvas.store";

export default function Toolbar() {
  const undo = useCanvasStore((state) => state.undo);

  const clearCanvas = useCanvasStore((state) => state.clearCanvas);

  const exportPNG = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) return;

    const link = document.createElement("a");

    link.download = "canvas.png";

    link.href = (canvas as HTMLCanvasElement).toDataURL();

    link.click();
  };

  return (
    <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <div>
        <h1 className="font-bold text-white">Alloy Canvas</h1>
      </div>

      <div className="flex gap-2">
        <button
          onClick={undo}
          className="p-2 rounded-lg bg-slate-800 text-white"
        >
          <Undo2 size={18} />
        </button>

        <button
          onClick={clearCanvas}
          className="p-2 rounded-lg bg-red-600 text-white"
        >
          <Trash2 size={18} />
        </button>

        <button
          onClick={exportPNG}
          className="p-2 rounded-lg bg-emerald-600 text-white"
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}
