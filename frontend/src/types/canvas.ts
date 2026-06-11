export interface CanvasElement {
  id: string;

  type: "pen" | "rect" | "circle" | "text";

  x: number;
  y: number;

  width?: number;
  height?: number;

  text?: string;

  color: string;
}
