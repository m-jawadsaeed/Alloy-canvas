export interface Shape {
  id: string;

  type:
    | "rectangle"
    | "circle"
    | "line";

  x: number;
  y: number;

  width: number;
  height: number;

  color: string;
}