import { Router } from "express";
import {
  createRequest,
  listRequests,
  updateRequestStatus,
} from "../controllers/hospitalController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

// Hospital creates blood request
router.post(
  "/requests",
  verifyToken,
  requireRole("HOSPITAL"),
  createRequest
);

// Hospital views own requests, admin can see all
router.get(
  "/requests",
  verifyToken,
  requireRole("HOSPITAL", "ADMIN"),
  listRequests
);

// Update status of a specific request (e.g. MATCHED, FULFILLED)
router.patch(
  "/requests/:id/status",
  verifyToken,
  requireRole("HOSPITAL", "ADMIN"),
  updateRequestStatus
);

export default router;
