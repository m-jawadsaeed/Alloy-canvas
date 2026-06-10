import {
  useEffect,
  useRef,
  useState,
} from "react";

import Toolbar from "./Toolbar";
import CursorLayer from "./CursorLayer";
import TextTool from "./TextTool";
import LayersPanel from "./LayersPanel";
import ExportButtons from "./ExportButtons";

import { socket } from "../services/socket";

import {
  saveCanvas,
  getCanvas,
} from "../api/canvas";

import {
  useCanvasStore,
} from "../store/canvas.store";

interface Props {
  roomId: string;
}

interface Cursor {
  id: string;
  username: string;
  x: number;
  y: number;
}

export default function Whiteboard({
  roomId,
}: Props) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const history =
    useRef<ImageData[]>([]);

  const [drawing, setDrawing] =
    useState(false);

  const [tool, setTool] =
    useState("pencil");

  const [color, setColor] =
    useState("#000000");

  const [lineWidth, setLineWidth] =
    useState(2);

  const [cursors, setCursors] =
    useState<Cursor[]>([]);

  const addElement =
    useCanvasStore(
      (state) =>
        state.addElement
    );

  const loadSavedCanvas =
    async () => {
      try {
        const response =
          await getCanvas(roomId);

        const image =
          response.data?.data;

        if (!image) return;

        const canvas =
          canvasRef.current;

        if (!canvas) return;

        const ctx =
          canvas.getContext("2d");

        if (!ctx) return;

        const img =
          new Image();

        img.onload = () => {
          ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
          );

          ctx.drawImage(
            img,
            0,
            0
          );
        };

        img.src = image;
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadSavedCanvas();

    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    socket.on(
      "draw",
      ({
        x,
        y,
        prevX,
        prevY,
        color,
        lineWidth,
      }) => {
        ctx.strokeStyle =
          color;

        ctx.lineWidth =
          lineWidth;

        ctx.lineCap =
          "round";

        ctx.beginPath();

        ctx.moveTo(
          prevX,
          prevY
        );

        ctx.lineTo(
          x,
          y
        );

        ctx.stroke();
      }
    );

    socket.on(
      "canvas-clear",
      () => {
        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }
    );

    socket.on(
      "cursor-move",
      (cursor: Cursor) => {
        setCursors((prev) => {
          const filtered =
            prev.filter(
              (c) =>
                c.id !==
                cursor.id
            );

          return [
            ...filtered,
            cursor,
          ];
        });
      }
    );

    socket.on(
      "canvas-updated",
      () => {
        loadSavedCanvas();
      }
    );

    return () => {
      socket.off("draw");

      socket.off(
        "canvas-clear"
      );

      socket.off(
        "cursor-move"
      );

      socket.off(
        "canvas-updated"
      );
    };
  }, [roomId]);

  useEffect(() => {
    const interval =
      setInterval(
        async () => {
          const canvas =
            canvasRef.current;

          if (!canvas)
            return;

          try {
            await saveCanvas(
              roomId,
              canvas.toDataURL(
                "image/png"
              )
            );

            socket.emit(
              "canvas-saved",
              {
                roomId,
              }
            );
          } catch (
            error
          ) {
            console.log(
              error
            );
          }
        },
        5000
      );

    return () =>
      clearInterval(
        interval
      );
  }, [roomId]);

  const saveHistory =
    () => {
      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) return;

      history.current.push(
        ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        )
      );
    };

  const undo = () => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    const previous =
      history.current.pop();

    if (!previous)
      return;

    ctx.putImageData(
      previous,
      0,
      0
    );
  };

  const clearCanvas =
    () => {
      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) return;

      saveHistory();

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      socket.emit(
        "canvas-clear",
        {
          roomId,
        }
      );
    };

  const getCoordinates =
    (
      e: React.MouseEvent
    ) => {
      const canvas =
        canvasRef.current;

      if (!canvas)
        return null;

      const rect =
        canvas.getBoundingClientRect();

      return {
        x:
          e.clientX -
          rect.left,
        y:
          e.clientY -
          rect.top,
      };
    };

  const startDrawing =
    (
      e: React.MouseEvent
    ) => {
      const coords =
        getCoordinates(
          e
        );

      if (!coords)
        return;

      const canvas =
        canvasRef.current;

      if (!canvas)
        return;

      canvas.dataset.prevX =
        coords.x.toString();

      canvas.dataset.prevY =
        coords.y.toString();

      saveHistory();

      setDrawing(true);
    };

  const stopDrawing =
    () => {
      setDrawing(false);
    };

  const handleCursorMove =
    (
      e: React.MouseEvent
    ) => {
      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          ) || "{}"
        );

      socket.emit(
        "cursor-move",
        {
          roomId,
          x: e.clientX,
          y: e.clientY,
          username:
            user.username ||
            "Guest",
        }
      );
    };

  const draw =
    (
      e: React.MouseEvent
    ) => {
      if (!drawing)
        return;

      const coords =
        getCoordinates(
          e
        );

      if (!coords)
        return;

      const canvas =
        canvasRef.current;

      if (!canvas)
        return;

      const ctx =
        canvas.getContext("2d");

      if (!ctx)
        return;

      const prevX =
        Number(
          canvas.dataset
            .prevX || 0
        );

      const prevY =
        Number(
          canvas.dataset
            .prevY || 0
        );

      ctx.strokeStyle =
        tool ===
        "eraser"
          ? "#ffffff"
          : color;

      ctx.lineWidth =
        lineWidth;

      ctx.lineCap =
        "round";

      ctx.beginPath();

      ctx.moveTo(
        prevX,
        prevY
      );

      ctx.lineTo(
        coords.x,
        coords.y
      );

      ctx.stroke();

      socket.emit(
        "draw",
        {
          roomId,
          x: coords.x,
          y: coords.y,
          prevX,
          prevY,
          color:
            tool ===
            "eraser"
              ? "#ffffff"
              : color,
          lineWidth,
        }
      );

      canvas.dataset.prevX =
        coords.x.toString();

      canvas.dataset.prevY =
        coords.y.toString();
    };

  return (
    <>
      <Toolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        lineWidth={lineWidth}
        setLineWidth={
          setLineWidth
        }
        clearCanvas={
          clearCanvas
        }
        undo={undo}
      />

      <TextTool
        onAdd={(text) => {
          addElement({
            id:
              crypto.randomUUID(),
            type: "text",
            text,
            x: 100,
            y: 100,
            color,
          });
        }}
      />

      <LayersPanel />

      <ExportButtons
        canvasRef={canvasRef}
      />

      <CursorLayer
        cursors={cursors}
      />

      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        style={{
          border:
            "1px solid black",
        }}
        onMouseDown={
          startDrawing
        }
        onMouseMove={(e) => {
          draw(e);
          handleCursorMove(
            e
          );
        }}
        onMouseUp={
          stopDrawing
        }
        onMouseLeave={
          stopDrawing
        }
      />
    </>
  );
}