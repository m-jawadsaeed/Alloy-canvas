import { Server, Socket } from "socket.io";
import prisma from "../config/db";

export const whiteboardSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "whiteboard-change",
    ({ roomId, elements }) => {
      socket
        .to(roomId)
        .emit(
          "whiteboard-change",
          elements
        );
    }
  );

  socket.on(
    "whiteboard-save",
    async ({
      roomId,
      snapshot,
    }) => {
      await prisma.canvas.upsert({
        where: {
          roomId,
        },
        create: {
          roomId,
          data: snapshot,
        },
        update: {
          data: snapshot,
        },
      });

      io.to(roomId).emit(
        "canvas-saved"
      );
    }
  );
};