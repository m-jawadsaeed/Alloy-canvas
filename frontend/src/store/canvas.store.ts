import { create } from "zustand";

import type { CanvasElement } from "../types/canvas";

interface CanvasState {
  elements: CanvasElement[];

  history: CanvasElement[][];

  addElement: (element: CanvasElement) => void;

  setElements: (elements: CanvasElement[]) => void;

  undo: () => void;

  clearCanvas: () => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  elements: [],

  history: [],

  addElement: (element) =>
    set((state) => ({
      history: [...state.history, state.elements],

      elements: [...state.elements, element],
    })),

  setElements: (elements) =>
    set({
      elements,
    }),

  undo: () => {
    const history = get().history;

    if (history.length === 0) return;

    const previous = history[history.length - 1];

    set({
      elements: previous,

      history: history.slice(0, -1),
    });
  },

  clearCanvas: () =>
    set({
      elements: [],
    }),
}));
