import type { RefObject } from "react";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function ExportButtons({
  canvasRef,
}: Props) {
  const exportPNG = () => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const link =
      document.createElement("a");

    link.download =
      "canvas.png";

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  return (
    <div>
      <button
        onClick={exportPNG}
      >
        Export PNG
      </button>
    </div>
  );
}