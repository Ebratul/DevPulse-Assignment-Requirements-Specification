import type { NextFunction, Request, Response } from "express";
import fs from "fs";
const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = `\nMethod=${req.method} \t Url=${req.url} \t Time=${new Date().toISOString()}\n`;

//   console.log(log);

  fs.appendFile("logger.txt", log, (err) => {
    if (err) {
      console.error("Logging failed:", err);
    }
  });

  next();
};

export default logger;
