import { Server, Socket } from "socket.io";
import { userRooms } from "./userRooms";

export const disconnectSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "disconnect",
    () => {
      const user =
        userRooms.get(
          socket.id
        );

      if (!user) return;

      io.to(
        user.roomId
      ).emit(
        "user-left",
        user.username
      );

      userRooms.delete(
        socket.id
      );
    }
  );
};