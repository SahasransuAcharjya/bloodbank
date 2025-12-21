import mongoose from "mongoose";
import User from "../models/user.js";
import { env } from "../config/env.js";

const email = process.argv[2];

if (!email) {
    console.log("Please provide an email address. Usage: node src/scripts/promoteUser.js <email>");
    process.exit(1);
}

async function promoteUser() {
    try {
        await mongoose.connect(env.mongoUri);
        console.log("Connected to MongoDB");

        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User with email ${email} not found.`);
            return;
        }

        user.role = "HOSPITAL";
        await user.save();
        console.log(`Successfully promoted ${user.name} (${user.email}) to HOSPITAL.`);

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

promoteUser();
