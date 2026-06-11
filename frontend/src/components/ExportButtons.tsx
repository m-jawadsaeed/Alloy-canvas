import { FileImage, FileText, Download } from "lucide-react";

export default function ExportButtons() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <button className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white">
        <FileImage size={18} />
        Export PNG
      </button>

      <button className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white">
        <FileText size={18} />
        Export PDF
      </button>

      <button className="flex items-center gap-3 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
        <Download size={18} />
        Download Canvas
      </button>
    </div>
  );
}
