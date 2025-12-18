// Simple console-based logger; can be swapped with winston/pino later.

const levels = ["debug", "info", "warn", "error"];

function log(level, message, meta = {}) {
  if (!levels.includes(level)) level = "info";

  const payload = {
    level,
    message,
    ...meta,
    timestamp: new Date().toISOString(),
  };

  // Pretty-print in dev, JSON in prod if you prefer
  if (process.env.NODE_ENV === "production") {
    console.log(JSON.stringify(payload));
  } else {
    console.log(
      `[${payload.timestamp}] [${level.toUpperCase()}] ${message}`,
      Object.keys(meta).length ? meta : ""
    );
  }
}

export const logger = {
  debug: (msg, meta) => log("debug", msg, meta),
  info: (msg, meta) => log("info", msg, meta),
  warn: (msg, meta) => log("warn", msg, meta),
  error: (msg, meta) => log("error", msg, meta),
};
