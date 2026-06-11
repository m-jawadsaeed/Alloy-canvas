import { useRef } from "react";

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getContext = () => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    return canvas.getContext("2d");
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    const ctx = getContext();

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return {
    canvasRef,
    getContext,
    clearCanvas,
  };
}
