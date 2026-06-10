import { Router } from "express";
import { getRoomUsers } from "../controllers/user.controller";

const router = Router();

router.get(
  "/:roomId",
  getRoomUsers
);

export default router;