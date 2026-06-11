import type { RefObject } from "react";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function ExportButtons({ canvasRef }: Props) {
  const exportPNG = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = url;
    link.download = "alloy-canvas.png";

    link.click();
  };

  return (
    <div className="fixed bottom-6 right-80 flex gap-3 z-40">
      <button
        onClick={exportPNG}
        className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-white font-medium"
      >
        Export PNG
      </button>
    </div>
  );
}
