import express from "express";
import BloodRequest from "../models/bloodRequest.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all requests (public or authenticated)
// Filters: urgency, bloodType, city
router.get("/", async (req, res) => {
    try {
        const { urgency, bloodType, city } = req.query;
        const query = { status: "OPEN" };

        if (urgency) query.urgency = urgency;
        if (bloodType) query.bloodType = bloodType;
        if (city) query["location.city"] = new RegExp(city, "i");

        const requests = await BloodRequest.find(query)
            .sort({ createdAt: -1 })
            .populate("requesterId", "name email phone");

        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: "Error fetching requests", error: err.message });
    }
});

// POST create a new request (Authenticated users)
router.post("/", verifyToken, async (req, res) => {
    try {
        const {
            patientName,
            hospitalName,
            bloodType,
            unitsRequired,
            urgency,
            location,
            deadline,
            contactPhone,
            description,
        } = req.body;

        const newRequest = await BloodRequest.create({
            requesterId: req.user.id,
            patientName,
            hospitalName,
            bloodType,
            unitsRequired,
            urgency,
            location,
            deadline,
            contactPhone,
            description,
        });

        res.status(201).json(newRequest);
    } catch (err) {
        res.status(500).json({ message: "Error creating request", error: err.message });
    }
});

// GET single request details
router.get("/:id", async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id).populate(
            "requesterId",
            "name email"
        );
        if (!request) return res.status(404).json({ message: "Request not found" });
        res.json(request);
    } catch (err) {
        res.status(500).json({ message: "Error fetching request", error: err.message });
    }
});

// PUT update status (e.g., FULFILLED) - Only requester or Admin
router.put("/:id/status", verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const request = await BloodRequest.findById(req.params.id);

        if (!request) return res.status(404).json({ message: "Request not found" });

        // Check ownership or admin role
        if (
            request.requesterId.toString() !== req.user.id &&
            req.user.role !== "ADMIN"
        ) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        request.status = status;
        await request.save();

        res.json(request);
    } catch (err) {
        res.status(500).json({ message: "Error updating status", error: err.message });
    }
});

export default router;
