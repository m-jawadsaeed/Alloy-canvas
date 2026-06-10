import { Server, Socket } from "socket.io";

export const roomEventsSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "room-joined",
    ({
      roomId,
      username,
    }) => {
      io.to(roomId).emit(
        "room-event",
        `${username} joined`
      );
    }
  );

  socket.on(
    "room-left",
    ({
      roomId,
      username,
    }) => {
      io.to(roomId).emit(
        "room-event",
        `${username} left`
      );
    }
  );
};