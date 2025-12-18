import dotenv from "dotenv";

dotenv.config();

const requiredVars = ["MONGODB_URI", "JWT_SECRET"];

for (const key of requiredVars) {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key} in .env`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};
