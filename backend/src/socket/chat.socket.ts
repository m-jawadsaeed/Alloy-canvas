import { Server, Socket } from "socket.io";
import prisma from "../config/db";

export const chatSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "send-message",
    async ({
      roomId,
      userId,
      message,
    }) => {
      const saved =
        await prisma.message.create({
          data: {
            roomId,
            userId,
            content: message,
          },
          include: {
            user: true,
          },
        });

      io.to(roomId).emit(
        "receive-message",
        {
          id: saved.id,
          content:
            saved.content,
          username:
            saved.user
              .username,
          createdAt:
            saved.createdAt,
        }
      );
    }
  );
};