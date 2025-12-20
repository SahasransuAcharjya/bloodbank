import express from "express";
import Camp from "../models/camp.js";
import Notification from "../models/notification.js";
import User from "../models/user.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all upcoming camps
router.get("/", async (req, res) => {
    try {
        const { city } = req.query;
        const query = { isActive: true, date: { $gte: new Date() } };

        if (city) query["location.city"] = new RegExp(city, "i");

        const camps = await Camp.find(query).sort({ date: 1 });
        res.json(camps);
    } catch (err) {
        res.status(500).json({ message: "Error fetching camps", error: err.message });
    }
});

// POST create a camp (Admin or Hospital only)
router.post("/", verifyToken, requireRole("ADMIN", "HOSPITAL"), async (req, res) => {
    try {
        const camp = await Camp.create(req.body);

        // Notify all Donors about the new camp
        const donors = await User.find({ role: "DONOR" });
        const notifications = donors.map(donor => ({
            userId: donor._id,
            type: "CAMP",
            title: "New Blood Camp",
            message: `New camp scheduled at ${camp.location?.address || "your area"} on ${new Date(camp.date).toLocaleDateString()}`,
            referenceId: camp._id,
        }));

        if (notifications.length > 0) {
            await Notification.insertMany(notifications);
        }

        res.status(201).json(camp);
    } catch (err) {
        res.status(500).json({ message: "Error creating camp", error: err.message });
    }
});

// POST register donor for a camp
router.post("/:id/register", verifyToken, async (req, res) => {
    try {
        const camp = await Camp.findById(req.params.id);
        if (!camp) return res.status(404).json({ message: "Camp not found" });

        if (camp.registeredDonors.includes(req.user.id)) {
            return res.status(400).json({ message: "Already registered" });
        }

        camp.registeredDonors.push(req.user.id);
        await camp.save();

        res.json({ message: "Registered successfully", camp });
    } catch (err) {
        res.status(500).json({ message: "Error registering for camp", error: err.message });
    }
});

export default router;
