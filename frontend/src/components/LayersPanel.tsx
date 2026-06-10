import {
  useCanvasStore,
} from "../store/canvas.store";

export default function LayersPanel() {
  const elements =
    useCanvasStore(
      (state) =>
        state.elements
    );

  return (
    <div>
      <h3>Layers</h3>

      {elements.map(
        (element) => (
          <div key={element.id}>
            {element.type}
          </div>
        )
      )}
    </div>
  );
}