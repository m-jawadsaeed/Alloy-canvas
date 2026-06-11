import { Layers3, Square, Circle, Type, Pencil } from "lucide-react";

export default function LayersPanel() {
  const layers = [
    {
      id: 1,
      name: "Drawing Layer",
      icon: Pencil,
    },
    {
      id: 2,
      name: "Rectangle",
      icon: Square,
    },
    {
      id: 3,
      name: "Circle",
      icon: Circle,
    },
    {
      id: 4,
      name: "Text",
      icon: Type,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white">
          <Layers3 size={18} />

          <h3 className="font-semibold">Layers</h3>
        </div>

        <p className="text-xs text-slate-400 mt-1">Manage whiteboard objects</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {layers.map((layer) => {
          const Icon = layer.icon;

          return (
            <div
              key={layer.id}
              className="mb-2 flex items-center gap-3 bg-slate-800 hover:bg-slate-700 rounded-xl p-3 cursor-pointer transition"
            >
              <Icon size={16} className="text-blue-400" />

              <span className="text-sm text-white">{layer.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
