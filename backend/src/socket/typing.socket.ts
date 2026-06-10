import { Server, Socket } from "socket.io";

export const typingSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "typing-start",
    ({
      roomId,
      username,
    }) => {
      socket
        .to(roomId)
        .emit(
          "typing-start",
          username
        );
    }
  );

  socket.on(
    "typing-stop",
    ({
      roomId,
      username,
    }) => {
      socket
        .to(roomId)
        .emit(
          "typing-stop",
          username
        );
    }
  );
};