import { useRef } from "react";

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getContext = () => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    return canvas.getContext("2d");
  };

  return {
    canvasRef,
    getContext,
  };
}
