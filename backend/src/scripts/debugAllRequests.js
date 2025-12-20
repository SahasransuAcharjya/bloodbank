import mongoose from "mongoose";
import dotenv from "dotenv";
import BloodRequest from "../models/bloodRequest.js";

dotenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        // Simulate GET /api/requests?status=ALL
        // The logic in route is: if (status !== "ALL") query.status = status; else query = {};
        // So passing status="ALL" results in empty query (find all).

        console.log("\n--- Simulating GET /api/requests?status=ALL ---");
        const allRequests = await BloodRequest.find({});
        console.log(`Total Requests Returned: ${allRequests.length}`);

        const statusCounts = {};
        allRequests.forEach(r => {
            statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
        });
        console.log("Counts by Status:", statusCounts);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
