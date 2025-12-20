import mongoose from "mongoose";
import dotenv from "dotenv";
import { getInventoryStats, getExpiringUnits } from "../services/inventoryService.js";
import { listRequests } from "../services/requestService.js";
import User from "../models/user.js";

dotenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        const hospital = await User.findOne({ role: "HOSPITAL" });
        if (!hospital) {
            console.log("No hospital found");
            return;
        }

        console.log("Testing with Hospital ID:", hospital._id.toString());

        console.log("--- Testing getInventoryStats ---");
        const stats = await getInventoryStats(hospital._id.toString());
        console.log("Inventory Stats:", stats);

        console.log("--- Testing getExpiringUnits ---");
        const expiring = await getExpiringUnits(hospital._id.toString());
        console.log("Expiring Units:", expiring);

        console.log("--- Testing listRequests ---");
        const requests = await listRequests({ hospitalId: hospital._id.toString(), status: "OPEN" });
        console.log("Pending Requests Count:", requests.length);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
