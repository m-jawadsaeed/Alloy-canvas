import { Server, Socket } from "socket.io";

export const registerCanvasSocket = (
  io: Server,
  socket: Socket
) => {
  io.on(
    "connection",
    (socket: Socket) => {
      console.log(
        "User connected:",
        socket.id
      );

      socket.on(
        "join-room",
        ({
          roomId,
          username,
        }) => {
          socket.join(roomId);

          socket.data.roomId =
            roomId;

          socket.data.username =
            username;

          socket
            .to(roomId)
            .emit(
              "user-joined",
              {
                id: socket.id,
                username,
              }
            );
        }
      );

      socket.on(
        "draw",
        (payload) => {
          socket
            .to(
              payload.roomId
            )
            .emit(
              "draw",
              payload
            );
        }
      );

      socket.on(
        "canvas-clear",
        ({
          roomId,
        }) => {
          socket
            .to(roomId)
            .emit(
              "canvas-clear"
            );
        }
      );

      socket.on(
        "cursor-move",
        (data) => {
          socket
            .to(
              data.roomId
            )
            .emit(
              "cursor-move",
              {
                ...data,
                id:
                  socket.id,
              }
            );
        }
      );

      socket.on(
        "canvas-saved",
        ({
          roomId,
        }) => {
          socket
            .to(roomId)
            .emit(
              "canvas-updated"
            );
        }
      );

      socket.on(
        "disconnect",
        () => {
          const roomId =
            socket.data.roomId;

          if (roomId) {
            socket
              .to(roomId)
              .emit(
                "user-left",
                {
                  id:
                    socket.id,
                  username:
                    socket.data
                      .username,
                }
              );
          }

          console.log(
            "User disconnected:",
            socket.id
          );
        }
      );
    }
  );
};