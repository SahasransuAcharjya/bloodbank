import { Router } from "express";
import {
  getStats,
  getInventory,
  updateInventory,
} from "../controllers/adminController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

// All admin-only
router.use(verifyToken, requireRole("ADMIN"));

router.get("/stats", getStats);
router.get("/inventory", getInventory);
router.put("/inventory", updateInventory);

export default router;
