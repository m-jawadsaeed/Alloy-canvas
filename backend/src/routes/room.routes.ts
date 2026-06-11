import { Router } from "express";

import {
  getRooms,
  getRoomInfo,
  createRoom,
} from "../controllers/room.controller";

const router = Router();

router.get("/", getRooms);

router.post("/", createRoom);

router.get("/:roomId", getRoomInfo);

export default router;
