import { Router } from "express";

import {
  getCanvas,
  saveCanvas,
} from "../controllers/canvas.controller";

const router = Router();

router.get(
  "/:roomId",
  getCanvas
);

router.post(
  "/:roomId",
  saveCanvas
);

export default router;