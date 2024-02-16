import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import fs from "fs";
import path from "path";

const env = process.env.NODE_ENV || "development";
const logDir = path.join(__dirname, "..", "log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: "YYYY-MM-DD",
});

const logger = createLogger({
  level: env === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    dailyRotateFileTransport,
  ],
});

export { logger };
