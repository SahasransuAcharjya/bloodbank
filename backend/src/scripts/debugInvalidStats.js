import mongoose from "mongoose";
import dotenv from "dotenv";
import { getInventoryStats, getExpiringUnits } from "../services/inventoryService.js";

dotenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        const invalidId = "invalid-id";
        console.log(`Testing with Invalid ID: ${invalidId}`);

        console.log("--- Testing getInventoryStats ---");
        try {
            const stats = await getInventoryStats(invalidId);
            console.log("Inventory Stats (Should be empty object):", stats);
        } catch (e) {
            console.error("getInventoryStats CRASHED:", e.message);
        }

        console.log("--- Testing getExpiringUnits ---");
        try {
            const expiring = await getExpiringUnits(invalidId);
            console.log("Expiring Units (Should be empty array):", expiring);
        } catch (e) {
            console.error("getExpiringUnits CRASHED:", e.message);
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
