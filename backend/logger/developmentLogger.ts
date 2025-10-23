import winston from "winston";

export const developmentLogger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      let log = `${timestamp} [${level}]: ${message}`;
      if (stack) log += `\n${stack}`;
      if (Object.keys(meta).length > 0)
        log += `\n${JSON.stringify(meta, null, 2)}`;
      return log;
    })
  ),
  transports: [
    new winston.transports.Console(
      
    ),

  //   new winston.transports.File({
  //     filename: "logs/development-error.log",
  //     level: "error",
  //     format: winston.format.combine(
  //       winston.format.timestamp(),
  //       winston.format.errors({ stack: true }),
  //       winston.format.json()
  //     ),
  //   }),

  //   new winston.transports.File({
  //     filename: "logs/development-combined.log",
  //     format: winston.format.combine(
  //       winston.format.timestamp(),
  //       winston.format.errors({ stack: true }),
  //       winston.format.json()
  //     ),
  //   }),
  // ],
  // exceptionHandlers: [
  //   new winston.transports.File({
  //     filename: "logs/development-exceptions.log",
  //   }),
  // ],
  // rejectionHandlers: [
  //   new winston.transports.File({
  //     filename: "logs/development-rejections.log",
  //   }),
  ],
});

export default developmentLogger;
