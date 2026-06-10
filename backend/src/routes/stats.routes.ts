import { Router } from "express";
import { getStats } from "../controllers/stats.controller";

const router = Router();

router.get(
  "/dashboard",
  getStats
);

export default router;