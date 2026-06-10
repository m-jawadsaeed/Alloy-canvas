import { create } from "zustand";

export interface CanvasElement {
  id: string;
  type: string;
  text?: string;
  x: number;
  y: number;
  color?: string;
}

interface CanvasState {
  elements: CanvasElement[];

  addElement: (
    element: CanvasElement
  ) => void;

  removeElement: (
    id: string
  ) => void;
}

export const useCanvasStore =
  create<CanvasState>(
    (set) => ({
      elements: [],

      addElement: (
        element
      ) =>
        set((state) => ({
          elements: [
            ...state.elements,
            element,
          ],
        })),

      removeElement: (
        id
      ) =>
        set((state) => ({
          elements:
            state.elements.filter(
              (e) =>
                e.id !== id
            ),
        })),
    })
  );