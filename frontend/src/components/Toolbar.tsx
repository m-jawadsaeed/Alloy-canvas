import { Undo2, Redo2, Download, Share2, Save } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white">
          A
        </div>

        <div>
          <h1 className="font-bold text-white">Alloy Canvas</h1>

          <p className="text-xs text-slate-400">Collaborative Whiteboard</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
          <Undo2 size={18} />
        </button>

        <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
          <Redo2 size={18} />
        </button>

        <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
          <Save size={18} />
        </button>

        <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
          <Share2 size={18} />
        </button>

        <button className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
          <Download size={16} />
          Export
        </button>
      </div>
    </div>
  );
}
