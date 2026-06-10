import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./app";
import { initializeSocket } from "./socket";

dotenv.config();

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initializeSocket(io);

httpServer.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});