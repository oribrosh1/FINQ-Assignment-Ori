// logger.js (updated)
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, colorize } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL! || "debug",
  format: combine(
    label({ label: "my-app" }),
    timestamp(),
    colorize(),
    customFormat
  ),
  transports: [
    // In production environment we may also write into a file or collect via a fluentd extra container that will
    // watch the stdout from the main pod and will write into - for instance, ELK.
    new transports.Console(),
  ],
});

export { logger };
