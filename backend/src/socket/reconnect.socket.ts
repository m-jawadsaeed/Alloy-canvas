import { Server, Socket } from "socket.io";
import prisma from "../config/db";

export const reconnectSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "reconnect-room",
    async ({
      roomId,
      username,
    }) => {
      const canvas =
        await prisma.canvas.findUnique({
          where: {
            roomId,
          },
        });

      const messages =
        await prisma.message.findMany({
          where: {
            roomId,
          },
          orderBy: {
            createdAt: "asc",
          },
        });

      socket.emit(
        "reconnect-data",
        {
          canvas:
            canvas?.data ||
            [],
          messages,
          username,
        }
      );
    }
  );
};