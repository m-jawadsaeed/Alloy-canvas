import { Server, Socket } from "socket.io";

const onlineUsers =
  new Map<string, string>();

export const presenceSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "presence-online",
    ({
      userId,
      username,
    }) => {
      onlineUsers.set(
        socket.id,
        username
      );

      io.emit(
        "online-users",
        Array.from(
          onlineUsers.values()
        )
      );
    }
  );

  socket.on(
    "disconnect",
    () => {
      onlineUsers.delete(
        socket.id
      );

      io.emit(
        "online-users",
        Array.from(
          onlineUsers.values()
        )
      );
    }
  );
};