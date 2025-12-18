import mongoose from "mongoose";
import { env } from "./env.js";

if (!env.mongoUri) {
  throw new Error("MONGODB_URI is not set in environment variables");
}

mongoose.set("strictQuery", true);

mongoose
  .connect(env.mongoUri)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
