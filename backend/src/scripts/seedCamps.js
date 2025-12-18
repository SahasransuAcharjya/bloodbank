import mongoose from "mongoose";
import Camp from "../models/camp.js";
import { env } from "../config/env.js";

const seedCamps = async () => {
    try {
        await mongoose.connect(env.mongoUri);
        console.log("Connected to MongoDB");

        // Clear existing camps
        await Camp.deleteMany({});
        console.log("Cleared existing camps");

        const nextSaturday = new Date();
        nextSaturday.setDate(nextSaturday.getDate() + ((6 - nextSaturday.getDay() + 7) % 7));
        nextSaturday.setHours(9, 0, 0, 0);

        const camps = [
            {
                organizerName: "Red Cross Society",
                name: "City Center Blood Drive",
                date: nextSaturday,
                startTime: "09:00 AM",
                endTime: "05:00 PM",
                location: {
                    city: "Mumbai",
                    state: "Maharashtra",
                    address: "Community Hall, Dadar West",
                    coordinates: [72.8407, 19.0180],
                },
                targetUnits: 100,
                description: "Join us for our monthly blood donation drive. Every drop counts!",
                contactPhone: "9876543210",
                isActive: true,
            },
            {
                organizerName: "Rotary Club",
                name: "Suburban Life Saver Camp",
                date: new Date(nextSaturday.getTime() + 7 * 24 * 60 * 60 * 1000), // Week after
                startTime: "10:00 AM",
                endTime: "04:00 PM",
                location: {
                    city: "Mumbai",
                    state: "Maharashtra",
                    address: "Rotary Park, Bandra",
                    coordinates: [72.83, 19.05],
                },
                targetUnits: 150,
                description: "Annual blood donation camp. Refreshments provided.",
                contactPhone: "9876543211",
                isActive: true,
            },
        ];

        await Camp.insertMany(camps);
        console.log("Seeded camps successfully");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding camps:", error);
        process.exit(1);
    }
};

seedCamps();
