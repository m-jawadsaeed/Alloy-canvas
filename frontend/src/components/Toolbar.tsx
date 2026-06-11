import { Undo2, Redo2, Download } from "lucide-react";

interface Props {
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
}

export default function Toolbar({ onUndo, onRedo, onExport }: Props) {
  return (
    <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <div>
        <h1 className="font-bold text-white">Alloy Canvas</h1>

        <p className="text-xs text-slate-400">Collaborative Workspace</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onUndo}
          className="p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
        >
          <Undo2 size={18} />
        </button>

        <button
          onClick={onRedo}
          className="p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
        >
          <Redo2 size={18} />
        </button>

        <button
          onClick={onExport}
          className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}
