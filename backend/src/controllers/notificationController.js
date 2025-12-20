import Notification from "../models/notification.js";

// Get notifications for the current user
export async function getNotifications(req, res) {
    try {
        const notifications = await Notification.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to last 50
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Error fetching notifications", error: err.message });
    }
}

// Mark a notification as read (optional, or handled by delete)
export async function markAsRead(req, res) {
    try {
        const { id } = req.params;
        await Notification.findByIdAndUpdate(id, { isRead: true });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Error updating notification", error: err.message });
    }
}

// Delete a notification
export async function deleteNotification(req, res) {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        if (notification.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Notification.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Error deleting notification", error: err.message });
    }
}
