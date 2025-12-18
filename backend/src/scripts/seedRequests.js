import mongoose from "mongoose";
import BloodRequest from "../models/bloodRequest.js";
import User from "../models/user.js";
import { env } from "../config/env.js";

const seedRequests = async () => {
    try {
        await mongoose.connect(env.mongoUri);
        console.log("Connected to MongoDB");

        // Clear existing requests
        await BloodRequest.deleteMany({});
        console.log("Cleared existing requests");

        // Find a user to assign as requester (or create a dummy ID if none exist, but better to use real one)
        // For simplicity, we'll just use a random ObjectId if no users exist, but ideally we want a real user.
        const user = await User.findOne();
        const requesterId = user ? user._id : new mongoose.Types.ObjectId();

        const requests = [
            {
                requesterId,
                patientName: "Rahul Kumar",
                hospitalName: "Apollo Hospital",
                bloodType: "O+",
                unitsRequired: 2,
                urgency: "EMERGENCY",
                location: {
                    city: "Mumbai",
                    state: "Maharashtra",
                    address: "Apollo Hospital, Navi Mumbai",
                    coordinates: [19.018, 72.84],
                },
                status: "OPEN",
                deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
                contactPhone: "9876543210",
                description: "Urgent requirement for bypass surgery.",
            },
            {
                requesterId,
                patientName: "Sneha Gupta",
                hospitalName: "City Care Clinic",
                bloodType: "A-",
                unitsRequired: 1,
                urgency: "STANDARD",
                location: {
                    city: "Mumbai",
                    state: "Maharashtra",
                    address: "City Care, Bandra",
                    coordinates: [19.05, 72.83],
                },
                status: "OPEN",
                deadline: new Date(Date.now() + 48 * 60 * 60 * 1000),
                contactPhone: "9876543211",
                description: "Required for scheduled procedure.",
            },
            {
                requesterId,
                patientName: "Amit Singh",
                hospitalName: "Fortis Hospital",
                bloodType: "B+",
                unitsRequired: 3,
                urgency: "STANDARD",
                location: {
                    city: "Mumbai",
                    state: "Maharashtra",
                    address: "Fortis, Mulund",
                    coordinates: [19.17, 72.95],
                },
                status: "OPEN",
                deadline: new Date(Date.now() + 72 * 60 * 60 * 1000),
                contactPhone: "9876543212",
                description: "Dengue patient recovery.",
            },
            {
                requesterId,
                patientName: "Priya Sharma",
                hospitalName: "KEM Hospital",
                bloodType: "AB+",
                unitsRequired: 1,
                urgency: "EMERGENCY",
                location: {
                    city: "Mumbai",
                    state: "Maharashtra",
                    address: "KEM, Parel",
                    coordinates: [19.00, 72.84],
                },
                status: "OPEN",
                deadline: new Date(Date.now() + 12 * 60 * 60 * 1000),
                contactPhone: "9876543213",
                description: "Accident case, immediate need.",
            },
            {
                requesterId,
                patientName: "Vikram Malhotra",
                hospitalName: "Lilavati Hospital",
                bloodType: "O-",
                unitsRequired: 2,
                urgency: "STANDARD",
                location: {
                    city: "Mumbai",
                    state: "Maharashtra",
                    address: "Lilavati, Bandra West",
                    coordinates: [19.05, 72.82],
                },
                status: "OPEN",
                deadline: new Date(Date.now() + 36 * 60 * 60 * 1000),
                contactPhone: "9876543214",
                description: "Rare blood type needed for surgery.",
            },
        ];

        await BloodRequest.insertMany(requests);
        console.log("Seeded requests successfully");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding requests:", error);
        process.exit(1);
    }
};

seedRequests();
