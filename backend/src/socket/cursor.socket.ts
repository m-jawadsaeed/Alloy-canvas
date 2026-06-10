import { Server, Socket } from "socket.io";

export const cursorSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "cursor-move",
    ({
      roomId,
      username,
      x,
      y,
    }) => {
      socket
        .to(roomId)
        .emit(
          "cursor-update",
          {
            username,
            x,
            y,
          }
        );
    }
  );
};