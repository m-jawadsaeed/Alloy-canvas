import { create } from "zustand";

import type { CanvasElement } from "../types/canvas";

interface CanvasState {
  elements: CanvasElement[];

  addElement: (element: CanvasElement) => void;

  setElements: (elements: CanvasElement[]) => void;

  clearCanvas: () => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  elements: [],

  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),

  setElements: (elements) =>
    set({
      elements,
    }),

  clearCanvas: () =>
    set({
      elements: [],
    }),
}));
