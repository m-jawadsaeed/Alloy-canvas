import { Router } from "express";

import {
  getRooms,
  getRoomInfo,
} from "../controllers/room.controller";

const router = Router();

router.get("/", getRooms);

router.get(
  "/:roomId",
  getRoomInfo
);

export default router;