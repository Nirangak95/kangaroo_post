const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const config = require("./config");

// Utility function to get the caller file
function getCallerFile() {
  const stack = new Error().stack || "";
  const stackLines = stack.split("\n");
  const callerLine = stackLines[4] || "";
  const match = callerLine.match(/\((.*):\d+:\d+\)/);
  return match ? match[1] : "unknown";
}

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp, filename, stack }) => {
    if (level === "error" || level === "info") {
      return JSON.stringify({
        timestamp,
        level,
        message,
        file: filename,
        stack,
      });
    }
    return `${timestamp} ${level}: ${message} (at ${filename || "unknown"})`;
  }),
);

// Create the logger
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new DailyRotateFile({
      filename: path.join(config.logsPath, "errors-%DATE%.log"),
      level: "error", // Only log error level messages to errors-%DATE%.log
      datePattern: "YYYY-MM-DD",
      maxFiles: null,
      format: logFormat,
    }),
    new DailyRotateFile({
      filename: path.join(config.logsPath, "output-%DATE%.log"),
      level: "info", // Log info and above (including errors) to output-%DATE%.log
      datePattern: "YYYY-MM-DD",
      maxFiles: null,
      format: logFormat,
    }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
  ],
});

// Wrapper functions to include filename in logs
function logWithFilename(level, message, stack) {
  logger.log(level, message, { filename: getCallerFile(), stack });
}

logger.info = (message) => logWithFilename("info", message);
logger.error = (message, stack) => logWithFilename("error", message, stack);
logger.warn = (message) => logWithFilename("warn", message);
logger.debug = (message) => logWithFilename("debug", message);

module.exports = logger;
