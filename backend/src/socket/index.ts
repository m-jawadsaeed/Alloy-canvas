import { Server } from "socket.io";

import { roomSocket } from "./room.socket";
import { chatSocket } from "./chat.socket";
import { registerCanvasSocket } from "./canvas.socket";
import { cursorSocket } from "./cursor.socket";
import { disconnectSocket } from "./disconnect.socket";

import { whiteboardSocket } from "./whiteboard.socket";
import { presenceSocket } from "./presence.socket";
import { roomEventsSocket } from "./room-event.socket";
import { typingSocket } from "./typing.socket";
import { reconnectSocket } from "./reconnect.socket";
import { analyticsSocket } from "./analytics.socket";

export const initializeSocket = (
  io: Server
) => {
  io.on("connection", (socket) => {
    roomSocket(io, socket);
    chatSocket(io, socket);
    registerCanvasSocket(io, socket);
    cursorSocket(io, socket);
    disconnectSocket(io, socket);

    whiteboardSocket(io, socket);
    presenceSocket(io, socket);
    roomEventsSocket(io, socket);
    typingSocket(io, socket);
    reconnectSocket(io, socket);
    analyticsSocket(io, socket);
  });
};