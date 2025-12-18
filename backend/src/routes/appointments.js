import { Router } from "express";
import {
  createAppointment,
  listMyAppointments,
  listCenterAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

// Donor books appointment
router.post(
  "/",
  verifyToken,
  requireRole("DONOR"),
  createAppointment
);

// Donor views own appointments
router.get(
  "/me",
  verifyToken,
  requireRole("DONOR"),
  listMyAppointments
);

// Hospital/admin views appointments for a center (?centerId=...)
router.get(
  "/center",
  verifyToken,
  requireRole("HOSPITAL", "ADMIN"),
  listCenterAppointments
);

// Update appointment status (CHECKED_IN, COMPLETED, CANCELLED)
router.patch(
  "/:id/status",
  verifyToken,
  requireRole("HOSPITAL", "ADMIN"),
  updateAppointmentStatus
);

export default router;
