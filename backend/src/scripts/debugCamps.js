import mongoose from "mongoose";
import dotenv from "dotenv";
import Camp from "../models/camp.js";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

const debugCamps = async () => {
    await connectDB();
    try {
        const camp = await Camp.findOne({ name: "Swadheen Jeevan" });
        if (camp) {
            console.log("Found Camp:");
            console.log("Name:", camp.name);
            console.log("Date:", camp.date);
            console.log("IsActive:", camp.isActive);
            console.log("Location:", camp.location);
            console.log("StartTime:", camp.startTime);
            console.log("EndTime:", camp.endTime);
        } else {
            console.log("Camp 'Swadheen Jeevan' NOT FOUND");
            // List all names
            const all = await Camp.find({}, "name");
            console.log("All camp names:", all.map(c => c.name));
        }
    } catch (err) {
        console.error("Error fetching camps:", err);
    } finally {
        mongoose.disconnect();
    }
};

debugCamps();
