import fs from "fs";
import path from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Ensure log directory exists
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// --- Define Transports ---
const errorTransport = new DailyRotateFile({
  filename: path.join(logDir, "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxSize: "20m",
  maxFiles: "30d",
  zippedArchive: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
});

const combinedTransport = new DailyRotateFile({
  filename: path.join(logDir, "combined-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxSize: "50m",
  maxFiles: "14d",
  zippedArchive: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
});

// --- Create Logger ---
export const productionLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: "sme-logistics-api",
    environment: process.env.NODE_ENV || "production",
    version: process.env.APP_VERSION || "1.0.0",
  },
  transports: [
    // Console for containers and cloud logs
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? ` | ${JSON.stringify(meta)}`
            : "";
          return `${timestamp} [${level}]: ${message}${metaStr}`;
        })
      ),
    }),

    errorTransport,
    combinedTransport,
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.join(logDir, "exceptions-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d",
      zippedArchive: true,
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.join(logDir, "rejections-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d",
      zippedArchive: true,
    }),
  ],
  exitOnError: false, // Prevents app from exiting after exceptions
});

// --- Transport Event Listeners (Safe Logging to Console Only) ---
errorTransport.on("rotate", (oldFile, newFile) => {
  console.info(`🌀 Error log rotated: ${oldFile} → ${newFile}`);
});

combinedTransport.on("archive", (zipFilename) => {
  console.info(`📦 Log file archived: ${zipFilename}`);
});

combinedTransport.on("logRemoved", (removedFilename) => {
  console.info(`🗑️ Old log file removed: ${removedFilename}`);
});

// --- Handle internal logger errors ---
productionLogger.on("error", (err) => {
  console.error("Logger internal error:", err);
});

export default productionLogger;
