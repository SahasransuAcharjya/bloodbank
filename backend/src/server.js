import "./config/env.js"; // Load env vars first
import http from "http";
import app from "./app.js";
import "./config/db.js"; // initializes MongoDB connection

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ JeevanDhaara API running at http://localhost:${PORT}`);
});
