import mongoose from "mongoose";
import User from "../models/user.js";
import { env } from "../config/env.js";

async function debugUsers() {
    try {
        await mongoose.connect(env.mongoUri);
        console.log("Connected to MongoDB");

        const hospitals = await User.find({ role: "HOSPITAL" });
        console.log("Hospital Users:", hospitals.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role })));

        const allUsers = await User.find({});
        console.log("All Users:");
        allUsers.forEach(u => {
            console.log(`- Name: ${u.name}, Email: ${u.email}, Role: ${u.role}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

debugUsers();
