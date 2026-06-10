import { Server, Socket } from "socket.io";

export const roomSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "join-room",
    ({
      roomId,
      username,
    }) => {
      socket.join(roomId);

      socket
        .to(roomId)
        .emit(
          "user-joined",
          {
            username,
          }
        );
    }
  );
};