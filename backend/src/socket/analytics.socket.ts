import { Server, Socket } from "socket.io";

const roomStats =
  new Map<
    string,
    {
      joins: number;
      drawings: number;
      messages: number;
    }
  >();

export const analyticsSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "analytics-join",
    (roomId) => {
      const stat =
        roomStats.get(roomId) || {
          joins: 0,
          drawings: 0,
          messages: 0,
        };

      stat.joins++;

      roomStats.set(
        roomId,
        stat
      );
    }
  );

  socket.on(
    "analytics-draw",
    (roomId) => {
      const stat =
        roomStats.get(roomId);

      if (!stat) return;

      stat.drawings++;
    }
  );

  socket.on(
    "analytics-message",
    (roomId) => {
      const stat =
        roomStats.get(roomId);

      if (!stat) return;

      stat.messages++;
    }
  );

  socket.on(
    "get-analytics",
    (roomId) => {
      socket.emit(
        "analytics-data",
        roomStats.get(roomId)
      );
    }
  );
};