export default function Toolbar() {
  return (
    <div className="h-[72px] bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold">
          A
        </div>

        <div>
          <h1 className="font-bold">Alloy Canvas</h1>

          <p className="text-xs text-slate-400">Collaborative Whiteboard</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-slate-800 rounded-lg">Undo</button>

        <button className="px-4 py-2 bg-slate-800 rounded-lg">Redo</button>

        <button className="px-4 py-2 bg-blue-600 rounded-lg">Share</button>
      </div>
    </div>
  );
}
