import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

// Public
router.post("/register", register);  // donor / hospital / admin (by role)
router.post("/login", login);

export default router;
