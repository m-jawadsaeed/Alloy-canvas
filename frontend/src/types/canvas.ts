export interface Point {
  x: number;
  y: number;
}

export interface CanvasElement {
  id: string;

  type: "pen" | "rectangle" | "circle" | "text";

  points?: Point[];

  x?: number;
  y?: number;

  width?: number;
  height?: number;

  text?: string;

  color: string;

  strokeWidth: number;
}
