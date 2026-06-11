import { Router } from "express";

import {
  getRooms,
  getRoomInfo,
  createRoom,
} from "../controllers/room.controller";

const router = Router();

router.get("/", getRooms);

router.get("/:roomId", getRoomInfo);

router.post("/", createRoom);

export default router;
