import { Router } from "express";
import { getMessages } from "../controllers/chat.controller";

const router = Router();

router.get(
  "/messages/:roomId",
  getMessages
);

export default router;