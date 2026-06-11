import { Router } from "express";

import {
  checkUsername,
  suggestUsername,
  register,
  login,
} from "../controllers/auth.controller";

const router = Router();

router.get("/check-username/:username", checkUsername);

router.get("/suggest-username/:name", suggestUsername);

router.post("/register", register);

router.post("/login", login);

export default router;
