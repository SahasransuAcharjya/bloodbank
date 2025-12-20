import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    getNotifications,
    deleteNotification,
    markAsRead,
} from "../controllers/notificationController.js";

const router = Router();

router.get("/", verifyToken, getNotifications);
router.delete("/:id", verifyToken, deleteNotification);
router.patch("/:id/read", verifyToken, markAsRead);

export default router;
