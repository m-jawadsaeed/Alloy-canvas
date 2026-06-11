import { useCanvasStore } from "../store/canvas.store";

export default function LayersPanel() {
  const elements = useCanvasStore((state) => state.elements);

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-64px)] w-72 bg-slate-950 border-l border-slate-800 overflow-y-auto">
      <div className="p-4 border-b border-slate-800">
        <h2 className="font-semibold text-white">Layers</h2>
      </div>

      <div className="p-2">
        {elements.length === 0 && (
          <p className="text-slate-500 text-sm p-3">No layers yet</p>
        )}

        {elements.map((element) => (
          <div
            key={element.id}
            className="bg-slate-900 border border-slate-800 rounded-lg p-3 mb-2 hover:bg-slate-800 transition"
          >
            <p className="text-white text-sm">{element.type}</p>

            <p className="text-xs text-slate-400">{element.id.slice(0, 8)}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
