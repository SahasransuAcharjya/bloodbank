import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import donorRoutes from "./routes/donors.js";
import hospitalRoutes from "./routes/hospitals.js";
import appointmentRoutes from "./routes/appointments.js";
import adminRoutes from "./routes/admin.js";
import requestRoutes from "./routes/requests.js";
import campRoutes from "./routes/camps.js";
import notificationRoutes from "./routes/notifications.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Basic middleware
app.use(
  cors({
    origin: true,          // later: restrict to your frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "JeevanDhaara backend",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/camps", campRoutes);
app.use("/api/notifications", notificationRoutes);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
