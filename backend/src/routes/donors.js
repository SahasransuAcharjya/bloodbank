import { Router } from "express";
import {
  getMe,
  getDonationHistory,
  updateProfile,
  listDonors,
} from "../controllers/donorController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

// Public search (optional filters via query: ?bloodType=O%2B&city=Mumbai)
router.get("/", listDonors);

// Authenticated donor endpoints
router.get(
  "/me",
  verifyToken,
  requireRole("DONOR"),
  getMe
);

router.get(
  "/history",
  verifyToken,
  requireRole("DONOR"),
  getDonationHistory
);

router.put(
  "/me",
  verifyToken,
  requireRole("DONOR"),
  updateProfile
);

export default router;
