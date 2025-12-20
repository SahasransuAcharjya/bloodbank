import mongoose from "mongoose";
import dotenv from "dotenv";
import BloodRequest from "../models/bloodRequest.js";

dotenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        const openEmergency = await BloodRequest.find({ status: "OPEN", urgency: "EMERGENCY" });
        console.log(`\n--- OPEN EMERGENCY Requests: ${openEmergency.length} ---`);
        openEmergency.forEach(r => {
            console.log(`ID: ${r._id}, Type: ${r.bloodType}, Created: ${r.createdAt}`);
        });

        if (openEmergency.length === 0) {
            console.log("\nNo OPEN EMERGENCY requests found. Checking ALL EMERGENCY requests...");
            const allEmergency = await BloodRequest.find({ urgency: "EMERGENCY" });
            allEmergency.forEach(r => {
                console.log(`ID: ${r._id}, Status: ${r.status}, Type: ${r.bloodType}`);
            });
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
